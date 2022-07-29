import './HomePage.css'
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const boulder = {
    lat: 40.0149856,
    lng: -105.2705456
}
const lyons = {
    lat: 40.2247075,
    lng: -105.271378
}
const golden = {
    lat: 39.755543,
    lng: -105.2210997
}
const estesPark = {
    lat: 40.3772059,
    lng: -105.5216651
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
            {user && <>
            <h1>Home Page</h1>
            <h2>Hello, {user.username}</h2>
            </>}
            <button onClick={() => {
                fetchTrails(boulder.lat, boulder.lng, setTrailsData)
            }}>
                Boulder
            </button>
            <button onClick={() => {
                fetchTrails(lyons.lat, lyons.lng, setTrailsData)
            }}>
                Lyons
            </button>
            <button onClick={() => {
                fetchTrails(golden.lat, golden.lng, setTrailsData)
            }}>
                Golden
            </button>
            <button onClick={() => {
                fetchTrails(estesPark.lat, estesPark.lng, setTrailsData)
            }}>
                Estes Park
            </button>
            {trailsData.length === 5 &&
                <div id='trailsContainer'>
                    <h1>Bike Trails in {trailsData[0].city}</h1>
                    {trailsData.map((trail, index) => {
                        return <div key={index} className="trailDiv">
                            <p>{trail.name}</p>

                            {trail.thumbnail
                                ?
                                <img src={trail.thumbnail} alt="{trail.name}" />
                                :
                                <h5>Sorry, no photo for this trail</h5>
                            }

                            <p>Miles: {trail.length}</p>
                            <p>Difficulty: {trail.difficulty}</p>
                            <p>{trail.description}</p>
                        </div>
                    })}
                </div>}
        </main>
    )
}