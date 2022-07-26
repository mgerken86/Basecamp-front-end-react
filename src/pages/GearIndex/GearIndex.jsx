import './GearIndexPage.css'
import { useState, useEffect } from 'react';
import axios from 'axios'



const starterData = {
    name: "",
    desc: "",
    price: 0,
    qty: 0
  };


export default function GearIndexPage(){

    const [gear, setGear] = useState([])
    const [formData, setFormData] = useState(starterData)
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
  
      const changeData = (e) => {
        const newData = {
          ...formData,
          [e.target.name]: e.target.value,
        };
        setFormData(newData);
      }
  
      const handleSubmit = () => {
        // e.preventDefault();
  
        axios
            .post("http://localhost:8000/rentals/", {
                name: formData.name,
                desc: formData.desc,
                price: formData.price,
                qty: formData.qty,
            })
            .then((res) => {
                
            })
            .catch((err) => {});

        setFormData(starterData)
    };


    return (
        <main>
            <h1>Gear Index Page</h1>
        </main>
    )
}