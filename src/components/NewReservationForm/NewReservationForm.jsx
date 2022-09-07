import './NewReservationForm.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { getGear } from '../../utils/axiosRequests'
import moment from 'moment';


export default function NewReservationForm({ user, gear, dateRanges }) {
    const [gearItems, setGearItems] = useState([])
    const navigate = useNavigate()
    const [gearByDates, setGearByDates] = useState([])
    const [formData, setFormData] = useState({
        start_date: moment(),
        end_date: moment().add(1, 'days'),
        gear_item_ids: null,
        qty: 0,
    })

    // console.log(gear)
    // console.log(dateRanges)

    const handleSearch = async (start, end) => {
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
            day.gear.map((item) => {
                reservations.forEach(reservation => {
                    if (item.id === reservation.gearItem) {
                        item.qty -= reservation.qty
                        return item
                    }
                })
            })
        })
        let gearMap = dates.map(day => day.gear)
        //combine the gearMap arrays into one array
        let gearFlatten = gearMap.reduce((prev, curr) => prev.concat(curr), [])
        //reduce into just an array of each gear item with the lowest qty during all of the dates
        let result = gearFlatten.reduce((acc, curr) => {
            const index = acc.findIndex(item => item.id === curr.id)
            if (index < 0) {
                acc.push(curr)
            } else {
                let qty = acc[index].qty
                if (qty < curr.qty) {
                    qty = curr.qty
                }
            }
            return acc
        }, [])

        setGearItems(result)
        setGearByDates(gearMap)
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
            <div className="listSearch" id="borderCont">
                <div className='inputCont'>
                    <label><span id='boldSpan'>Start Date</span></label>
                    <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={changeData}
                        required
                    />
                </div>
                <div className='inputCont'>
                    <label><span id='boldSpan'>End Date</span></label>
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
                {gearItems.length > 0 &&
                    <div className='listSearch'>
                        <div className="gearInputCont">
                        {gearItems.map((item, index) => {
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
                                <label htmlFor={item.name}>
                                    <span id='boldSpan'>{item.name}</span> (Quantity in stock: {item.qty})
                                </label>
                            </div>
                        })}
                        </div>
                        {formData.gear_item_ids && <>
                            <div className='inputCont'>
                                <label><span id='boldSpan'>Quantity</span></label>
                                <input
                                    className="SearchInput"
                                    type="range"
                                    min="1"
                                    max={`${(gearItems.find(item => item.id == formData.gear_item_ids).qty)}`}
                                    name="qty"
                                    value={formData.qty}
                                    onChange={changeData}
                                    required
                                />
                                <output><span id='boldSpan'>{formData.qty}</span></output>
                            </div>
                            {/* onClick function sets the state of the rooms to the new input arguments */}
                            <button
                                onClick={() => {
                                    handleSubmit()
                                }}>
                                Reserve {(gearItems.find(item => item.id == formData.gear_item_ids).name)}
                            </button>
                        </>}

                    </div>}
            </div>
        </main>
    )
}