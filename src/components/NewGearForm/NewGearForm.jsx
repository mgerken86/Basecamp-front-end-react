import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { postGear } from '../../utils/axiosRequests';


const starterData = {
    name: "",
    desc: "",
    price: 0,
    qty: 0,
    image_url: ''
  };


export default function NewGearForm({ setGear }) {
    const [formData, setFormData] = useState(starterData)
    const navigate = useNavigate()
  
      const changeData = (e) => {
        const newData = {
          ...formData,
          [e.target.name]: e.target.value,
        };
        setFormData(newData);
      }
  

    return (
        <main>
            <div className="listSearch">
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={changeData}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        name="desc"
                        value={formData.desc}
                        onChange={changeData}
                        required
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        className="SearchInput"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={changeData}
                        required
                    />
                </div>
                <div>
                    <label>Quantity</label>
                    <input
                        className="SearchInput"
                        type="number"
                        name="qty"
                        value={formData.qty}
                        onChange={changeData}
                        required
                    />
                </div>
                <div>
                    <label>Image Url</label>
                    <input 
                        type="text"
                        name="image_url"
                        value={formData.image_url}
                        onChange={changeData}/>
                </div>
                {/* onClick function sets the state of the rooms to the new input arguments */}
                <button
                    className="searchBtn"

                    onClick={async () => {
                        await postGear(setFormData, formData, starterData)
                        navigate(0)
                    }}>
                    Add Gear
                </button>
            </div>
        </main>
    )
}