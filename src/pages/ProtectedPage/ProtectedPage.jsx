import { useEffect, useState } from "react";
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import EditReservationForm from "../../components/EditReservationForm/EditReservationForm";
import * as axiosRequests from '../../utils/axiosRequests'
import { motion } from 'framer-motion'


export default function ProtectedPage() {
  const [userReservations, setUserReservations] = useState()
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const [showEdit, setShowEdit] = useState(false)

  // console.log(user)

  useEffect(() => {
    axiosRequests.getUserReservations(setUserReservations, user.user_id)
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>My Account</h1>
      <div className="container-left">
        {userReservations?.map((reservation, index) => {
          return <div key={index}>
            {showEdit && <EditReservationForm thisReservation={reservation} />}
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
              await axiosRequests.deleteReservation(reservation.id)
              navigate(0)
            }}>Delete</button>
          </div>
        })}
      </div>
    </motion.main>
  );
}
