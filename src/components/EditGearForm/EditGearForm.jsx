import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { editGear } from '../../utils/axiosRequests';





export default function EditGearForm({ gear }) {
    const navigate = useNavigate()
    const [gearItem, setGearItem] = useState(gear)
    const [formData, setFormData] = useState({
        name: gear.name,
        desc: gear.desc,
        price: gear.price,
        qty: gear.qty,
        image_url: gear.image_url
    })


    const changeData = (e) => {
        const newData = {
            ...formData,
            [e.target.name]: e.target.value,
        };
        setFormData(newData);
    }


    

    return (
        <main>
            <div id="loginCont">
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
                        await editGear(gearItem.id, formData)
                        navigate(0)
                    }}>
                    Edit Gear
                </button>
            </div>
        </main>
    )
}