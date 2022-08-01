import './ReservationsIndexPage.css'
import NewReservationForm from '../../components/NewReservationForm/NewReservationForm';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getReservations } from '../../utils/axiosRequests';
import { motion } from 'framer-motion'

const localizer = momentLocalizer(moment)


export default function ReservationsIndexPage() {
    const [reservations, setReservations] = useState([])
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const [events, setEvents] = useState([])


    const getDateMarkers = () => {
        reservations.map(reservation => {
            // console.log(reservation)
            setEvents([...events, {
                start: moment(reservation.start_date).toDate(),
                end: moment(reservation.end_date).toDate(),
                title: reservation.gear_item[0].name
            }])
        })
    }
    useEffect(() => {
        getReservations(setReservations)
    }, [])

    useEffect(() => {

        getDateMarkers()

    }, [reservations])


    return (
        <motion.main
            id='reservationsPage'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='headerCont'>
                <div></div>
                <h1>RESERVATIONS</h1>
                <div></div>
            </div>

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
                            title: `${reservation.gear_item[0].name} (Qty: ${reservation.qty})`
                        }
                    })}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 800 }}
                />
            </div>
            <div className='allReservations'>
                {reservations.map((reservation, index) => {
                    return <div key={index} className='rezCont'>
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
                })}
            </div>
        </motion.main>
    )
}