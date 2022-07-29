import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import EditReservationForm from "../../components/EditReservationForm/EditReservationForm";


export default function ProtectedPage() {
  const [userReservations, setUserReservations] = useState()
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const [showEdit, setShowEdit] = useState(false)

  console.log(user)


  const getReservations = () => {
    axios.get(`https://a-lodge-basecamp.herokuapp.com/myaccount/${user.user_id}`)
      .then(res => {
        let data = res.data;
        // console.log(data)
        setUserReservations(data);
      })
      .catch(err => { })
  }

  const deleteReservation = (id) => {
    axios.delete(`https://a-lodge-basecamp.herokuapp.com/reservations/${id}`)
      .then(res => {
        // console.log(res)
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
            {showEdit && <EditReservationForm thisReservation={reservation}/>}
            <p>Start Date: {reservation.start_date}</p>
            <p>End Date: {reservation.end_date}</p>
            <hr />
            {reservation.gear_item.map((gear, index) => {
              return <div key={index}>
                <h3>Gear Item:</h3>
                <p>{gear.name}- ${gear.price}</p>
                {/* <p>${gear.price}</p> */}
                <p>Quantity: {reservation.qty}</p>
                <p>Total Price: ${reservation.qty * gear.price}</p>
              </div>
            })}
            <button
              onClick={() => setShowEdit(!showEdit)}>
              {/* navigate(`/reservations/${reservation.id}`,
                  {
                    state: {
                      reservation: { reservation },
                    },
                  })
              }
              }}> */}
              Edit Reservation
            </button>
            <button onClick={async () => {
              await deleteReservation(reservation.id)
              navigate(0)
            }}>Delete</button>
          </div>
        })}
      </div>
    </main>
  );
}
