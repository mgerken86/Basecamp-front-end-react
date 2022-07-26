import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react';

const starterData = {
  name: "",
  desc: "",
  price: 0,
  qty: 0
};

export default function App() {
  const [gear, setGear] = useState([])
  const [formData, setFormData] = useState(starterData)
  let data


  
    const callGet = () => {
      axios.get('http://localhost:8000/rentals/')
        .then(res => {
          data = res.data;
          console.log(data)
          setGear(data);
        })
        .catch(err => { })
    }

    // const callPut = () => {

    //   axios.post('http://localhost:8000/rentals/')
    //   .then(res => {
    //     data = res.data;
    //     console.log(data)
    //     setGear(data);
    //   })
    //   .catch(err => { })
    // }

    useEffect(() => {
      callGet()
    }, [])

    // const handleInput = (e) => {
    //   this.setState({
    //     [e.target.name]: e.target.value,
    //   });
    // };
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
  };




    return (
      <div className="App">
        {gear.map(gear => <p>{gear.name}</p>)}

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
            
            onClick={async() => {
              await handleSubmit()
              callGet()
            }
            }
          >
            Modify Your Search
          </button>
        </div>
      </div>
    );
  }


