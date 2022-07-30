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
    const [events, setEvents] = useState([])


    const getReservations = () => {
        axios.get('https://a-lodge-basecamp.herokuapp.com/reservations/')
            .then(res => {
                let data = res.data;
                console.log(data)
                setReservations(data);
            })
            .catch(err => { })
    }

    const getDateMarkers = () => {
        reservations.map(reservation => {
            console.log(reservation)
            setEvents([...events, {
                start: moment(reservation.start_date).toDate(),
                end: moment(reservation.end_date).toDate(),
                title: reservation.gear_item[0].name
            }])
        })
    }
    useEffect(() => {
        getReservations()
    }, [])

    useEffect(() => {

        getDateMarkers()

    }, [reservations])


    return (
        <main>
            <h1>Reservations</h1>

            <div id='calendarCont'>
                <button
                    id='calendarBtn'
                    onClick={() => setShowForm(!showForm)}>
                    New Reservation
                </button>
                {showForm &&
                    <div>
                        <NewReservationForm />
                    </div>}
                <Calendar
                    localizer={localizer}
                    events={reservations.map(reservation => {
                        return {
                            start: moment(reservation.start_date).toDate(),
                            end: moment(reservation.end_date).toDate(),
                            title: `${reservation.gear_item[0].name} (Qty: ${reservation.gear_item[0].qty})`
                        }
                    })}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                />
            </div>
            <div className='container-left'>

                {/* {reservations.map((reservation, index) => {
                    return <div key={index}>
                        <p>Start Date: {reservation.start_date}</p>
                        <p>End Date: {reservation.end_date}</p>
                        {reservation.gear_item.map((gear, index) => {
                            return <div key={index}>
                                <h3>Gear Item:</h3>
                                <p>{gear.name}</p>
                                <p>${gear.price}</p>
                                <p>Quantity: {reservation.qty}</p>
                            </div>
                        })}
                    </div>
                })} */}
            </div>
        </main>
    )
}