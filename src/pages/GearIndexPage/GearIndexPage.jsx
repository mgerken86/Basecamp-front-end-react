import './GearIndexPage.css'
import NewGearForm from '../../components/NewGearForm/NewGearForm';
import { useState, useEffect } from 'react';
import * as axiosRequests from '../../utils/axiosRequests'
import { useNavigate } from "react-router-dom";



export default function GearIndexPage(){
  const [gear, setGear] = useState([])
  const [forecast, setForecast] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    (async() => {
      await axiosRequests.getGear(setGear)
      await axiosRequests.getWeather(setForecast)
    })()
    
  }, [])

  useEffect(() => {
    console.log(gear)
  }, [gear])

    return (
        <main>
          {/* <div id='vertDiv'></div> */}
          <div className='titleCont'>
            <img 
            id='gearImg'
            src="https://cdn.hiconsumption.com/wp-content/uploads/2018/09/Best-Used-Gear-Stores-Online-0-Hero-1087x725.jpg" 
            alt="gear" />

          
          <div className='titleDiv'>
          <h1 id='gearH1'>GEAR</h1>
            <h2>CHECK OUT OUR AVAILABLE RENTALS</h2>
            </div>
          </div>
            
            {forecast.current && <>
            <h2>Before renting, know the weather conditions!...</h2>
             
            <p>Currently: {forecast.current.condition.text} and {forecast.current.temp_f}</p>
            <img src={forecast.current.condition.icon} alt="" />
            <h3>Next three days...</h3>
            <div className='weatherCont'>
              {forecast.forecast.forecastday.map((day, index) => {
                return <div key={index}>
                  <h5>{day.date}</h5>
                  <img src={day.day.condition.icon} alt="" />
                  <p>{day.day.condition.text}</p>
                  <p>{day.day.daily_chance_of_rain}% chance of rain</p>
                  <p>High of {day.day.maxtemp_f}°</p>
                  <p>Low of {day.day.mintemp_f}°</p>
                  </div>
              })}
              </div>
              </>}
            
            <div className='container-left gear-cont'>
            {gear.length != 0 && gear.map((gear, index) => { return <div className='gear-item-cont' key={index}>
            <img src={gear.image_url} alt="" />
            <h2>{gear.name}</h2>
            <p>${gear.price}</p>
            <button 
            onClick={()=> {
              navigate(`/rentals/${gear.id}`,
              {
                state: {
                  gear: { gear },
                },
              })
              }}>
            More Info
            </button>
            <hr />
            <br />
            </div>
            })}
            <NewGearForm setGear={setGear}/>
            </div>
        </main>
    )
}