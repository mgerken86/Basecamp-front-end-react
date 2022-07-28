import './HomePage.css'
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const boulder = {
    lat: 40.0149856,
    lng: -105.2705456
}
const lyons = {
    lat: -40.2247075,
    lng: -105.271378
}
const golden = {
    lat: -39.755543,
    lng: -105.2210997
}



const fetchTrails = (lat, lng, setState) => {
    const options = {
        method: 'GET',
        url: 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/',
        params: { lat: `${lat}`, lon: `${lng}`, per_page: '5' },
        headers: {
            'X-RapidAPI-Key': 'b706fa8596msha33725def79a97cp1b9fc1jsn8dfd397c7442',
            'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data.data);
        setState(response.data.data);
    }).catch(function (error) {
        console.error(error);
    });
}



export default function HomePage() {
    const [trailsData, setTrailsData] = useState([])
    const { user } = useContext(AuthContext);
    return (
        <main>
            <h1>Home Page</h1>
            <h2>Hello, {user.username}</h2>

            <button onClick={() => {
                fetchTrails(boulder.lat, boulder.lng, setTrailsData)
            }}>Boulder</button>
            <button>Lyons</button>
            <button>Golden</button>
            {trailsData.map((trail, index) => {
                return <div key={index}>
                    <p>{trail.name}</p>

                    {trail.thumbnail
                        ?
                        <img src={trail.thumbnail} alt="{trail.name}" />
                        :
                        <h5>Sorry, no photo for this trail</h5>
                    }

                    <p>Miles: {trail.length}</p>
                    <p>Difficulty: {trail.difficulty}</p>
                    <p>trail.description</p>
                </div>
            })
            }
        </main>
    )
}