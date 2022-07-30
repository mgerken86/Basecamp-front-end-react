import './HomePage.css'
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import * as axiosRequests from '../../utils/axiosRequests'
import MovingText from 'react-moving-text'

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


export default function HomePage() {
    const [trailsData, setTrailsData] = useState([])
    const { user } = useContext(AuthContext);
    const [showHome, setShowHome] = useState(false)
    


    useEffect(() => {
        setTimeout(() => {
            setShowHome(true)
        }, 9000);
    }, [])


    return (
        <main id='homePage'>
            <div id='vertDiv'></div>
            {!showHome ?
                <div id='animationCont'>
                    <h1>
                    <MovingText
                        // type="slideInFromLeft"
                        type="fadeInFromLeft"
                        duration="2000ms"
                        delay="0s"
                        direction="normal"
                        timing="ease"
                        iteration={1}
                        fillMode="none">
                        Rentals
                    </MovingText>
                    </h1>
                    <h1>
                    <MovingText
                        // type="slideInFromRight"
                        type="fadeInFromRight"
                        duration="2000ms"
                        delay="2s"
                        direction="normal"
                        timing="ease"
                        iteration={1}
                        fillMode="none">
                        Community
                    </MovingText>
                    </h1>
                </div> : <>
                    {user && <>
                        <h1>Home Page</h1>
                        <h2>Hello, {user.username}</h2>
                    </>}
                    <button onClick={() => {
                        axiosRequests.fetchTrails(boulder.lat, boulder.lng, setTrailsData)
                    }}>
                        Boulder
                    </button>
                    <button onClick={() => {
                        axiosRequests.fetchTrails(lyons.lat, lyons.lng, setTrailsData)
                    }}>
                        Lyons
                    </button>
                    <button onClick={() => {
                        axiosRequests.fetchTrails(golden.lat, golden.lng, setTrailsData)
                    }}>
                        Golden
                    </button>
                    <button onClick={() => {
                        axiosRequests.fetchTrails(estesPark.lat, estesPark.lng, setTrailsData)
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
                </>}
        </main>
    )
}