import './GearDetailPage.css'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';



export default function GearDetailPage(){
    const { state } = useLocation();
    const { gear } = state
    const [gearItem, setGearItem] = useState(gear.gear)

    const deleteGear = (id) => {
        axios.delete(`http://localhost:8000/rentals/${id}`)
        .then(res => {
          console.log(res)
        })
        .catch(err => { })
      }

    console.log(gearItem)

    return (
        <main>
            <h1>Gear Detail Page</h1>
            <h3>{gearItem.name}</h3>
            <p>{gearItem.desc}</p>
            <p>${gearItem.price}</p>
            <p>Quantity: {gearItem.qty}</p>
            <button onClick={()=> deleteGear(gear.id)}>Delete</button>
        </main>
    )
}