import './GearIndexPage.css'
import NewGearForm from '../../components/NewGearForm/NewGearForm';
import { useState, useEffect } from 'react';
import axios from 'axios';




export default function GearIndexPage(){
  const [gear, setGear] = useState([])
  let data
  
  
  const getGear = () => {
    axios.get('http://localhost:8000/rentals/')
      .then(res => {
        data = res.data;
        // console.log(data)
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
            {gear.map(gear => <p>{gear.name}</p>)}
            <NewGearForm setGear={setGear}/>
        </main>
    )
}