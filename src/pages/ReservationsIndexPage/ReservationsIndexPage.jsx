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
    const [gear, setGear] = useState([])
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const [dateRanges, setDateRanges] = useState([])


    const getDateRange = () => {
        console.log(reservations)
        let dates = []
        reservations.map(reservation => {
            let startDate = moment(reservation.start_date)
            let endDate = moment(reservation.end_date)
            for (let current = startDate; current <= endDate; current.add(1, 'd')) {
                dates.push({
                    date: current.format("YYYY-MM-DD"),
                    gearItem: reservation.gear_item[0].id,
                    qty: reservation.qty
                })
            }
        })
        setDateRanges(dates)
    }


    useEffect(() => {
        getReservations(setReservations)
        getGear(setGear)
    }, [])


    useEffect(() => {
        getDateRange()
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
                    Search for Availability
                </button>

                {showForm &&
                    <div>
                        <NewReservationForm user={user} dateRanges={dateRanges} gear={gear} />
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
        </motion.main>
    )
}