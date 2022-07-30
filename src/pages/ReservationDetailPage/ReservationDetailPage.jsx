import './ReservationDetailPage.css'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import * as axiosRequests from '../../utils/axiosRequests'

export default function ReservationDetailPage(){
    const { state } = useLocation();
    const { reservation } = state
    const [reservationItem, setReservationItem] = useState(reservation.reservation)

    const deleteReservation = (id) => {
        axios.delete(`https://a-lodge-basecamp.herokuapp.com/reservations/${id}`)
        .then(res => {
          console.log(res)
        })
        .catch(err => { })
      }




    return (
        <main>
            <h1>Reservation Detail Page</h1>
            
            <p>{reservationItem.start_date}</p>
            <p>{reservationItem.end_date}</p>
            {reservationItem.gear_item.map((gear,index) => {
                return <p>{gear.name}</p>
            })}
            <button onClick={()=> axiosRequests.deleteReservation(reservationItem.id)}>Delete</button>
        </main>
    )
}