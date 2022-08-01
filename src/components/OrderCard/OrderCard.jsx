import './OrderCard.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import EditReservationForm from "../../components/EditReservationForm/EditReservationForm";
import * as axiosRequests from '../../utils/axiosRequests'


export default function OrderCard({ reservation }) {
    const [showEdit, setShowEdit] = useState(false)
    const navigate = useNavigate()


    return (
        <div className='ordersCont'>
            {!showEdit ? <>
            <h2>Start Date: {reservation.start_date}</h2>
            <h2>End Date: {reservation.end_date}</h2>
            <hr />
            {reservation.gear_item.map((gear, index) => {
              return <div 
              key={index}>
                <h3>Gear Item: {gear.name}- ${gear.price}</h3>
                <p>Quantity: {reservation.qty}</p>
                <h3>Total Price: ${reservation.qty * gear.price}</h3>
              </div>
            })}
            <button
              onClick={() => setShowEdit(!showEdit)}>
              Edit Reservation
            </button>
            <button onClick={async () => {
              await axiosRequests.deleteReservation(reservation.id)
              navigate(0)
            }}>Delete</button></> : 
             <EditReservationForm thisReservation={reservation} />}
          </div>
    )
}