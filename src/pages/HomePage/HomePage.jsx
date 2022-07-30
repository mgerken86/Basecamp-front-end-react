import './HomePage.css'
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import * as axiosRequests from '../../utils/axiosRequests'
import MovingText from 'react-moving-text'
import { motion } from 'framer-motion'

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

const animationsForChaining = ["slideInFromLeft", "slideOutToRight", "slideInFromRight", "slideOutToLeft", "flipFromTop", "flipToBottom", "popIn", "jelly", "zoomOut"]
// each word gets 2, because each gets 2 animations
const animatedTextArr = ['RENTALS', 'RENTALS', 'EVENTS', 'EVENTS', 'COMMUNITY', 'COMMUNITY', 'BASECAMP', 'BASECAMP', 'BASECAMP']


export default function HomePage() {
    const [trailsData, setTrailsData] = useState([])
    const { user } = useContext(AuthContext);
    const [showHome, setShowHome] = useState(false)
    const [animationIndex, setAnimationIndex] = useState(0)
    const [animationType, setAnimationType] = useState(animationsForChaining[0])
    const [animatedText, setAnimatedText] = useState(animatedTextArr[0])


    // black out the home page w/ animation text for 9 secs
    useEffect(() => {
        setTimeout(() => {
            setShowHome(true)
        }, 18000);
    }, [])



    const handleChainAnimation = async () => {
        await setAnimatedText(animatedTextArr[animationIndex + 1])
        await setAnimationType(animationsForChaining[animationIndex + 1])
        setAnimationIndex(animationIndex + 1)
    }


    return (
        <motion.main
            id='homePage'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div id='vertDiv'></div>
            {!showHome ?
                <div
                    onClick={() => setShowHome(true)}
                    id='animationCont'>
                    <h1>
                        <MovingText
                            onAnimationEnd={handleChainAnimation}
                            type={animationType}
                            // type="fadeInFromLeft"
                            duration="2000ms"
                            delay="0s"
                            direction="normal"
                            timing="ease"
                            iteration={1}
                            fillMode="none">
                            {animatedText}
                        </MovingText>
                    </h1>
                    <p>(Click anywhere to continue)</p>

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
        </motion.main>
    )
}