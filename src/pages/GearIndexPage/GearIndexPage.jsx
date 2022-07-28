import './GearIndexPage.css'
import NewGearForm from '../../components/NewGearForm/NewGearForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";






export default function GearIndexPage(){
  const [gear, setGear] = useState([])
  const navigate = useNavigate()
  let data
  
  
  const getGear = () => {
    axios.get('http://localhost:8000/rentals/')
      .then(res => {
        data = res.data;
        console.log(data)
        setGear(data);
      })
      .catch(err => { })
  }


  useEffect(() => {
    getGear()
  }, [])

    return (
        <main>
            <h1>Gear Index Page</h1>
            <div className='container-left'>
            {gear.map((gear, index) => { return <div key={index}>
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