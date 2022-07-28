import { useState, useEffect } from 'react';
import axios from 'axios'


// const starterData = {
//     start_date: "",
//     end_date: "",
//     gear_item: '',
//     qty: 0,
//   };


export default function NewReservationForm({  }) {
    const [formData, setFormData] = useState({})
  
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
                gear_item_ids: [26],
                // gear_item: formData.gear_item,
                qty: formData.qty,
                user: 1
            })
            .then((res) => {
                
            })
            .catch((err) => {});

        // setFormData(starterData)
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
                <div>
                    <label>Gear</label>
                    <input
                        className="SearchInput"
                        type="number"
                        name="gear_item"
                        value={formData.gear_item}
                        onChange={changeData}
                        required
                    />
                </div>
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