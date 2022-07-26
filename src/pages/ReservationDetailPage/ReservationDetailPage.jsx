import './ReservationDetailPage.css'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function ReservationDetailPage(){
    const { state } = useLocation();
    const { reservation } = state
    const [reservationItem, setReservationItem] = useState(reservation.reservation)
    const [showForm, setShowForm] = useState(false)

    const deleteReservation = (id) => {
        axios.delete(`http://localhost:8000/reservations/${id}`)
        .then(res => {
          console.log(res)
        })
        .catch(err => { })
      }

      console.log(reservationItem)

    return (
        <main>
            <h1>Reservation Detail Page</h1>
            <button onClick={setShowForm(!showForm)}>New Reservation</button>
            {showForm && 
            <div>
            </div>}
            <p>{reservationItem.start_date}</p>
            <p>{reservationItem.end_date}</p>
            <button onClick={()=> deleteReservation(reservationItem.id)}>Delete</button>
        </main>
    )
}