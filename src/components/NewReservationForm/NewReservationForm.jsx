import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios'


const getGear = (setState) => {
    axios.get('http://localhost:8000/rentals/')
      .then(res => {
        let data = res.data;
        // console.log(data)
        setState(data)
      })
      .catch(err => { })
  }


export default function NewReservationForm({  }) {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({})
    const [gear, setGear] = useState([])

    // console.log(user)

    useEffect(()=> {
        getGear(setGear)
    }, [])
  
    // console.log(gear)
      const changeData = (e) => {
        const newData = {
          ...formData,
          [e.target.name]: e.target.value,
        };
        setFormData(newData);
      }
  
      const handleSubmit = () => {
        axios
            .post("http://localhost:8000/reservations/", {
                start_date: formData.start_date,
                end_date: formData.end_date,
                //change this to dynamically choose the id of the gear items
                gear_item_ids: [formData.gear_item_ids],
                // gear_item: formData.gear_item,
                qty: formData.qty,
                user: user.user_id
            })
            .then((res) => {
                
            })
            .catch((err) => {});
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
                        value={formData.desc}
                        onChange={changeData}
                        required
                    />
                </div>
                {/* If there's gear, map through the gear items and make radio inputs for each */}
                {gear !== null && 
                <div>
                    {gear.map((item, index) => {
                        return <>
                        <input
                        className="SearchInput"
                        id={item.name}
                        type="radio"
                        name="gear_item_ids"
                        value={item.id}
                        onChange={changeData}
                        required
                    />
                    <label for={item.name}>{item.name}</label>
                    </>
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

                    onClick={async () => {
                        await handleSubmit()
                    }}>
                    New Reservation
                </button>
            </div>
        </main>
    )
}