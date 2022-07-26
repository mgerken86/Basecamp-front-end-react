import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react';

function App() {
  const [gear, setGear] = useState([])
  let data
  const callGet = () => {
    axios.get('http://localhost:8000/test/')
        .then(res => {
            data = res.data;
            console.log(data)
            setGear(data);
        })
        .catch(err => {})
  }
  
useEffect(()=> {
  callGet()
}, [])


  return (
    <div className="App">

    </div>
  );
}

export default App;
