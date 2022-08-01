import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios'
import * as axiosRequests from '../../utils/axiosRequests'
import { Navigate, useNavigate } from 'react-router-dom';




export default function EditReservationForm({ thisReservation }) {
    const { user } = useContext(AuthContext);
    const [gear, setGear] = useState([])
    const [reservation, setReservation] = useState(thisReservation)
    console.log(reservation)
    const [formData, setFormData] = useState({
        start_date: reservation.start_date,
        end_date: reservation.end_date,
        // gear_item: gear.price,
        qty: reservation.qty
    })
    const navigate = useNavigate()


    useEffect(() => {
        // fetch all gear items available to be able to edit reservation gear items to something else
        axiosRequests.getGear(setGear)
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
        axiosRequests.editReservation(reservation.id, formData, user)
        navigate(0)
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
                                <label for={item.name}>{item.name}</label>
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

                    onClick={async () => {
                        await handleSubmit()
                    }}>
                    Edit Reservation
                </button>
            </div>
        </main>
    )
}