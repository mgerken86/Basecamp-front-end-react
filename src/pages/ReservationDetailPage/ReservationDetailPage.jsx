import './ReservationDetailPage.css'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ReservationDetailPage(){
    const { state } = useLocation();
    const { reservation } = state
    const [reservationItem, setReservationItem] = useState(reservation.reservation)
    // const [reservationItem, setReservationItem] = useState()
    
    // let {reservation_id} = useParams()

    // console.log(reservation_id)
    const deleteReservation = (id) => {
        axios.delete(`http://localhost:8000/reservations/${id}`)
        .then(res => {
          console.log(res)
        })
        .catch(err => { })
      }

    //   const getReservation = (id) => {
    //     axios.get(`http://localhost:8000/rentals/${id}`)
    //       .then(res => {
    //         let data = res.data;
    //         console.log(data)
    //         setReservationItem(data);
    //       })
    //       .catch(err => { })
    //   }

    
    //   getReservation(reservation_id)



    return (
        <main>
            <h1>Reservation Detail Page</h1>
            
            <p>{reservationItem.start_date}</p>
            <p>{reservationItem.end_date}</p>
            {reservationItem.gear_item.map((gear,index) => {
                return <p>{gear.name}</p>
            })}
            <button onClick={()=> deleteReservation(reservationItem.id)}>Delete</button>
        </main>
    )
}