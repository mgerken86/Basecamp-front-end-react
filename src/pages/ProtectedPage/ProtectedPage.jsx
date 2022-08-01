import './ProtectedPage.css'
import OrderCard from '../../components/OrderCard/OrderCard';
import { useEffect, useState } from "react";
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import * as axiosRequests from '../../utils/axiosRequests'
import { motion } from 'framer-motion'


export default function ProtectedPage() {
  const [userReservations, setUserReservations] = useState()
  const { user } = useContext(AuthContext);
  

  // console.log(user)

  useEffect(() => {
    axiosRequests.getUserReservations(setUserReservations, user.user_id)
  }, []);

  return (
    <motion.main
    id="accountPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='headerCont'>
                        <div></div>
                        <h1>ORDER HISTORY</h1>
                        <div></div>
                    </div>
                    <h1 id='usernameH1'>Here's everything you've rented, {user.username}</h1>
      <div className="gear-cont">
        {userReservations?.map((reservation, index) => {
          return <OrderCard reservation={reservation} key={index}/>
        })}
      </div>
    </motion.main>
  );
}
