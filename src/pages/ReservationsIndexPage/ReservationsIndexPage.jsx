import './ReservationsIndexPage.css'
import NewReservationForm from '../../components/NewReservationForm/NewReservationForm';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";


export default function ReservationsIndexPage() {
    const [reservations, setReservations] = useState([])
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)

    let data


    const getReservations = () => {
        axios.get('https://a-lodge-basecamp.herokuapp.com/reservations/')
            .then(res => {
                data = res.data;
                console.log(data)
                setReservations(data);
            })
            .catch(err => { })
    }


    useEffect(() => {
        getReservations()
    }, [])



    return (
        <main>
            <h1>Reservations Index Page</h1>
            <div className='container-left'>
            <button onClick={()=>setShowForm(!showForm)}>New Reservation</button>
            {showForm && 
            <div>
                <NewReservationForm />
            </div>}
            {reservations.map((reservation, index) => {
                return <div key={index}>
                    <p>Start Date: {reservation.start_date}</p>
                    <p>End Date: {reservation.end_date}</p>
                    {reservation.gear_item.map((gear, index) => {
                        return <div key={index}>
                            <h3>Gear Item:</h3>
                            <p>{gear.name}</p>
                            {/* <p>${gear.price}</p> */}
                            <p>Quantity: {reservation.qty}</p>
                        </div>
                    })}
                </div>
            })}
            </div>
        </main>
    )
}