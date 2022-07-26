import './GearDetailPage.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import EditGearForm from '../../components/EditGearForm/EditGearForm';
import { motion } from 'framer-motion'



export default function GearDetailPage({ gearItem, user, setShowDetailPage }) {
    const [showEdit, setShowEdit] = useState(false)
    const navigate = useNavigate()

    // console.log(user)

    const deleteGear = (id) => {
        axios.delete(`https://a-lodge-basecamp.herokuapp.com/rentals/${id}`)
            .then(res => {
                console.log(res)
                navigate(0)
            })
            .catch(err => { })
    }

    // console.log(gearItem)

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id='detailPage'>
            <h1>{gearItem.name}</h1>
            <h2>${gearItem.price}</h2>
            <button 
            onClick={() => setShowDetailPage(false)}
            className="gearBtn">X</button>
            <img src={gearItem.image_url} alt="" />
            <p>Quantity: {gearItem.qty}</p>
            <p>{gearItem.desc}</p>
            {user && user.user_id === 1 && <div id="gearEditBtns">
                <button
                    onClick={() => deleteGear(gearItem.id)}>
                    Delete
                </button>
                <button
                    onClick={() => setShowEdit(!showEdit)}>
                    Edit
                </button>
                {showEdit && <EditGearForm gear={gearItem} />}
            </div>}

        </motion.main>
    )
}