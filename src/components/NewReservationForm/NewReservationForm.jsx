import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { getGear } from '../../utils/axiosRequests'
import moment from 'moment';


export default function NewReservationForm({ user, gear, dateRanges }) {
    const [formData, setFormData] = useState({
        start_date: moment(),
        end_date: moment().add(1, 'days'),
        gear_item_ids: null,
        qty: 0,
    })
    const [gearItems, setGearItems] = useState([])
    const navigate = useNavigate()
    const [searchDates, setSearchDates] = useState([])

    // console.log(gear)
    // console.log(dateRanges)

    const handleSearch = (start, end) => {
        let dates = []
        for (let current = moment(start); current <= moment(end); current.add(1, 'd')) {
            dates.push({
                day: current.format("YYYY-MM-DD"),
                //create new objects for each day's gear to keep from mutating the original gear object
                gear: gear.map(item => Object.assign({}, item))
            })
        }
        dates.forEach(day => {
            let reservations = dateRanges.filter(date => date.date == day.day)
            if (!reservations.length) return day
            day.gear.map((item, i) => {
                reservations.forEach(reservation => {
                    if (item.id === reservation.gearItem) {
                        item.qty -= reservation.qty
                        return item
                    }
                })
            })
        })
        let gearMap = dates.map(day => day.gear)
        let gearFlatten = gearMap.reduce((prev, curr) => prev.concat(curr), [])
        console.log(gearFlatten)
        // let gearReduce = gearFlatten.reduce((prev, curr) => {
        //     // console.log(prev.id, curr.id)
        //     if(prev.id == curr.id){
        //         return prev.qty < curr.qty ? prev : curr
        //     }
        // })

        // for (let i = 0; i < gearFlatten.length; i++) {
        //     for (let j = i++; j < gearFlatten.length; j++) {
        //         if (gearFlatten[i].id === gearFlatten[j].id) {
        //             if (gearFlatten[i].qty > gearFlatten[j].qty) {
        //                 gearFlatten[i].qty = gearFlatten[j].qty
        //             }
        //             gearFlatten.splice(j, 1)
        //         }
        //     }
        // }
        // for (let i = 0; i < gearFlatten.length; i++) {
        //     for (let j = gearFlatten.length -1; j > i; j--) {
        //         if (gearFlatten[i].id === gearFlatten[j].id) {
        //             if (gearFlatten[i].qty > gearFlatten[j].qty) {
        //                 gearFlatten[i].qty = gearFlatten[j].qty
        //             }
        //             gearFlatten.pop()
        //             j = gearFlatten.length -1
        //         }
        //     }
        // }

        let result = gearFlatten.reduce((acc, curr) => {
            console.log(acc)
            const index = acc.findIndex(item => item.id === curr.id)
            console.log(index)
            if (index < 0){
                acc.push(curr)
            } else {
                    let qty = acc[index].qty 
                    if (qty < curr.qty){
                        qty = curr.qty
                    }
            }
            return acc
        }, [])


        console.log(result)
        console.log(gearMap)
        setGearItems(gearMap)
        // console.log(gearMap)
    }



    const changeData = (e) => {
        const newData = {
            ...formData,
            [e.target.name]: e.target.value,
        };
        setFormData(newData);
    }

    const handleSubmit = () => {
        console.log(formData)
        axios
            .post("https://a-lodge-basecamp.herokuapp.com/reservations/", {
                start_date: formData.start_date,
                end_date: formData.end_date,
                //change this to dynamically choose the id of the gear items
                gear_item_ids: [formData.gear_item_ids],
                qty: formData.qty,
                user: user.user_id
            })
            .then((res) => {
                console.log(res)
                navigate(0)
            })
            .catch((err) => { });
    };

    return (
        <main>
            <div className="listSearch">
                <div>
                    <label>Start Date</label>
                    <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={changeData}
                        required
                    />
                </div>
                <div>
                    <label>End Date</label>
                    <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={changeData}
                        required
                    />
                </div>
                <button onClick={() => handleSearch(formData.start_date, formData.end_date)}>Search for Gear on These Dates</button>
                {/* If there's gear, map through the gear items and make radio inputs for each */}
                {gear !== null &&
                    <div>
                        {gear.map((item, index) => {
                            return <div key={index}>
                                <input
                                    className="SearchInput"
                                    id={item.name}
                                    type="radio"
                                    name="gear_item_ids"
                                    value={item.id}
                                    onChange={changeData}
                                    required
                                />
                                <label htmlFor={item.name}>{item.name}</label>
                            </div>
                        })}


                    </div>}
                <div>
                    <label>Quantity</label>
                    <input
                        className="SearchInput"
                        type="number"
                        name="qty"
                        value={formData.qty}
                        onChange={changeData}
                        required
                    />
                </div>
                {/* onClick function sets the state of the rooms to the new input arguments */}
                <button
                    className="searchBtn"

                    onClick={() => {
                        handleSubmit()
                    }}>
                    New Reservation
                </button>
            </div>
        </main>
    )
}