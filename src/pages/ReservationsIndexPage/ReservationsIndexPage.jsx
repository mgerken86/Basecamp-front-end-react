import './ReservationsIndexPage.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function ReservationsIndexPage(){
    const [reservations, setReservations] = useState([])
  let data
  
  
  const getReservations = () => {
    axios.get('http://localhost:8000/reservations/')
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
        </main>
    )
}