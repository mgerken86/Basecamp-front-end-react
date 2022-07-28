import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";


export default function ProtectedPage() {
  const [userReservations, setUserReservations] = useState()
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  console.log(user)
  const getReservations = () => {
    axios.get(`http://localhost:8000/myaccount/${user.user_id}`)
      .then(res => {
        let data = res.data;
        console.log(data)
        setUserReservations(data);
      })
      .catch(err => { })
  }

  useEffect(() => {
    getReservations()
  }, []);

  return (
    <main>
      <h1>My Account</h1>
      <div className="container-left">
        {userReservations?.map((reservation, index) => {
          return <div key={index}>
            <p>Start Date: {reservation.start_date}</p>
            <p>End Date: {reservation.end_date}</p>
            <hr />
            {reservation.gear_item.map((gear, index) => {
              return <div key={index}>
                <h3>Gear Item:</h3>
                <p>{gear.name}- ${gear.price}</p>
                {/* <p>${gear.price}</p> */}
                <p>Quantity: {reservation.qty}</p>
              </div>
            })}
            <button
              onClick={() => {
                navigate(`/reservations/${reservation.id}`,
                  {
                    state: {
                      reservation: { reservation },
                    },
                  })
              }}>
              More Info
            </button>
          </div>
        })}
      </div>
    </main>
  );
}
