import './ReservationsIndexPage.css'
import NewReservationForm from '../../components/NewReservationForm/NewReservationForm';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)


export default function ReservationsIndexPage() {
    const [reservations, setReservations] = useState([])
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)


    const getReservations = () => {
        axios.get('https://a-lodge-basecamp.herokuapp.com/reservations/')
            .then(res => {
                let data = res.data;
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
            <div id='calendarCont'>
                <Calendar
                    localizer={localizer}
                    //   events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
            <div className='container-left'>
                <button onClick={() => setShowForm(!showForm)}>New Reservation</button>
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