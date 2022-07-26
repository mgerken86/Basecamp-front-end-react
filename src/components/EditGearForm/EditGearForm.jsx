import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';





export default function EditGearForm({ gear }) {
    const navigate = useNavigate()
    const [gearItem, setGearItem] = useState(gear)
    const [formData, setFormData] = useState({
        name: gear.name,
        desc: gear.desc,
        price: gear.price,
        qty: gear.qty
      })
  


      const changeData = (e) => {
        const newData = {
          ...formData,
          [e.target.name]: e.target.value,
        };
        setFormData(newData);
      }
  
      const handleSubmit = () => {
        axios
            .put(`http://localhost:8000/rentals/${gear.id}`, {
                name: formData.name,
                desc: formData.desc,
                price: formData.price,
                qty: formData.qty,
            })
            .then((res) => {
                let data = res.data;
                console.log(data)
            })
            .catch((err) => {});
            navigate('/rentals')
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
                    Edit Gear
                </button>
            </div>
        </main>
    )
}