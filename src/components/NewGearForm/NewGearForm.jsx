import { useState, useEffect } from 'react';
import axios from 'axios'


const starterData = {
    name: "",
    desc: "",
    price: 0,
    qty: 0
  };


export default function NewGearForm({ setGear }) {
    const [formData, setFormData] = useState(starterData)
  
      const changeData = (e) => {
        const newData = {
          ...formData,
          [e.target.name]: e.target.value,
        };
        setFormData(newData);
      }
  
      const handleSubmit = () => {
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
                {/* onClick function sets the state of the rooms to the new input arguments */}
                <button
                    className="searchBtn"

                    onClick={async () => {
                        await handleSubmit()
                    }}>
                    Add Gear
                </button>
            </div>
        </main>
    )
}