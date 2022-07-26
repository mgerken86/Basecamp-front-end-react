import './GearIndexPage.css'
import NewGearForm from '../../components/NewGearForm/NewGearForm';
import { useState, useEffect } from 'react';
import * as axiosRequests from '../../utils/axiosRequests'
import { motion } from 'framer-motion'
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import GearIndexCard from '../../components/GearIndexCard/GearIndexCard';



export default function GearIndexPage() {
  const [gear, setGear] = useState([])
  const [forecast, setForecast] = useState([])
  const [showForecast, setShowForecast] = useState(false)
  const { user } = useContext(AuthContext);

  // console.log(user)

  useEffect(() => {
    (async () => {
      await axiosRequests.getGear(setGear)
      await axiosRequests.getWeather(setForecast)
    })()

  }, [])

  // useEffect(() => {
  //   console.log(gear)
  // }, [gear])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* <div id='vertDiv'></div> */}
      <div className='titleCont'>
        <img
          className='gearImg'
          src="https://cdn.hiconsumption.com/wp-content/uploads/2018/09/Best-Used-Gear-Stores-Online-0-Hero-1087x725.jpg"
          alt="gear" />


        <div
          className='titleDiv'
          onClick={() => setShowForecast(!showForecast)}>
          {showForecast ?
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='weatherCont'>
              {forecast.forecast.forecastday.map((day, index) => {
                return <div key={index} className="weatherInfo">
                  <h5>{day.date}</h5>
                  <img src={day.day.condition.icon} alt="" />
                  <hr />
                  {/* <p>{day.day.condition.text}</p> */}
                  <p>High: {day.day.maxtemp_f}°</p>
                  <p>Low: {day.day.mintemp_f}°</p>
                  {/* <hr /> */}
                  <p>{day.day.daily_chance_of_rain}% chance of rain</p>
                </div>
              })}
            </motion.div> : <>
              <h1 className='gearH1'>RENTALS</h1>
              <h2>Browse our gear (and the weather forecast) before making a reservation!</h2>

              {forecast.current &&
                <div id='weatherDiv'>
                  {/* <h2>Before renting, know the weather conditions!...</h2> */}
                  <img src={forecast.current.condition.icon} alt="" />
                  <p>Currently: {forecast.current.condition.text} and {forecast.current.temp_f}°</p>
                </div>}
              {/* <h2>CHECK OUT OUR AVAILABLE RENTALS</h2> */}
              <p>Whether you're looking to rest in or rock out, our rentals will give you the freedom to customize your adventure.</p>
            </>}
        </div>
      </div>

      <div className='gear-cont'>
        {/* {gear.length != 0 && gear.map((gear, index) => { */}
        {gear?.map((gear, index) => {
          return <div className='gear-item-cont' key={index}>
            <GearIndexCard
              gear={gear}
              user={user}
              key={index} />
          </div>
        })}
        {/* only the admin can see the new gear form */}
        {user && user.user_id === 1 ? <NewGearForm setGear={setGear} /> : null}

      </div>
    </motion.main>
  )
}