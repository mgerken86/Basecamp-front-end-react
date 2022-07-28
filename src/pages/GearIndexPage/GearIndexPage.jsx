import './GearIndexPage.css'
import NewGearForm from '../../components/NewGearForm/NewGearForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";


  //get all gear_items from back end
  const getGear = (setState) => {
    axios.get('http://localhost:8000/rentals/')
      .then(res => {
        let data = res.data;
        console.log(data)
        setState(data);
      })
      .catch(err => { })
  }
    // call weather api for 3-day forecast
    const getWeather = (setState) => {
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: {q: 'Boulder', days: '3'},
        headers: {
          'X-RapidAPI-Key': 'b706fa8596msha33725def79a97cp1b9fc1jsn8dfd397c7442',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
        setState(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    }



export default function GearIndexPage(){
  const [gear, setGear] = useState([])
  const [forecast, setForecast] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    (async() => {
      await getGear(setGear)
      await getWeather(setForecast)
    })()
    
  }, [])

    return (
        <main>
            <h1>Gear Index Page</h1>
            {forecast.current && <>
            <h2 onClick={()=> getWeather(setForecast)}>Before renting, know the weather conditions!...</h2>
             
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
            
            <div className='container-left'>
            {gear.length != 0 && gear.map((gear, index) => { return <div key={index}>
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