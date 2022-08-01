import './GearDetailPage.css'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import EditGearForm from '../../components/EditGearForm/EditGearForm';



export default function GearDetailPage({ gearItem, user, setShowDetailPage }){
    // const { state } = useLocation();
    // const { gear, user } = state
    // const { user } = state
    // const [gearItem, setGearItem] = useState(gear.gear)
    // const [gearItem, setGearItem] = useState(gear)
    const [showEdit, setShowEdit] = useState(false)

    console.log(user)

    const deleteGear = (id) => {
        axios.delete(`https://a-lodge-basecamp.herokuapp.com/rentals/${id}`)
        .then(res => {
          console.log(res)
        })
        .catch(err => { })
      }

    console.log(gearItem)

    return (
        <main id='detailPage'>
            <h1>{gearItem.name}</h1>
            <button onClick={()=> setShowDetailPage(false)}></button>
            <h3></h3>
            <p>{gearItem.desc}</p>
            <p>${gearItem.price}</p>
            <p>Quantity: {gearItem.qty}</p>
            {user.user_id ===1 && <>
                <button onClick={()=> deleteGear(gearItem.id)}>Delete</button>
            <button onClick={()=> setShowEdit(!showEdit)}>Edit</button>
            {showEdit && <EditGearForm gear={gearItem}/>}
            </>}
            
        </main>
    )
}