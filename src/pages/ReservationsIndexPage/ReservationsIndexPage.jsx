import './ReservationsIndexPage.css'
import NewReservationForm from '../../components/NewReservationForm/NewReservationForm';
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Moment from 'moment'
import { extendMoment } from 'moment-range';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getReservations, getGear } from '../../utils/axiosRequests';
import { motion } from 'framer-motion'

const moment = extendMoment(Moment);
const localizer = momentLocalizer(Moment)


export default function ReservationsIndexPage() {
    const { user } = useContext(AuthContext);
    const [reservations, setReservations] = useState([])
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const [dateRanges, setDateRanges] = useState([])


    const getDateRange = () => {
        reservations.map(reservation => {
            console.log(reservation)
            let dates = []
            let startDate = moment(reservation.start_date)
            let endDate = moment(reservation.end_date)
            for (let current = startDate; current <= endDate; current.add(1, 'd')) {
                dates.push(current.format("YYYY-MM-DD"))
            }
            // console.log(dates)
            setDateRanges(dates)
        })
    }
    useEffect(() => {
        getReservations(setReservations)
    }, [])

    useEffect(() => {
        getDateRange()
    }, [reservations])

    useEffect(() => {
        // console.log(dateRanges)
    }, [dateRanges])


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
                {user ? <button
                    id='calendarBtn'
                    onClick={() => setShowForm(!showForm)}>
                    New Reservation
                </button> :
                <h1>You must be logged in to make a reservation</h1>}
                
                {showForm &&
                    <div>
                        <NewReservationForm user={user}/>
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
            {/* <div className='allReservations'>
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
            </div> */}
        </motion.main>
    )
}