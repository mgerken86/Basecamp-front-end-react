import './HomePage.css'
import AnimationHomePage from '../../components/AnimationHomePage/AnimationHomePage';
import { useContext, useState, useEffect, useRef } from 'react';
import AuthContext from '../../context/AuthContext';
import * as axiosRequests from '../../utils/axiosRequests'
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



export default function HomePage() {
    const [trailsData, setTrailsData] = useState([])
    const [restaurantsData, setRestaurantsData] = useState([])
    const [attractionsData, setAttractionsData] = useState([])
    const [showTrails, setShowTrails] = useState(false)
    const [showRestaurants, setShowRestaurants] = useState(false)
    const [showTrailsBtns, setShowTrailsBtns] = useState(false)
    const [showRestaurantsBtns, setShowRestaurantsBtns] = useState(false)
    const { user } = useContext(AuthContext);
    const [showHome, setShowHome] = useState(false)

    const [trailIndex, setTrailIndex] = useState(0)
    const [restaurantsIndex, setRestaurantsIndex] = useState(0)

    const timeout = useRef(null)
    const restaurantTimeout = useRef(null)

    let trail = trailsData[trailIndex]
    let restaurant = restaurantsData[restaurantsIndex]


    // black out the home page w/ animation text for 9 secs
    useEffect(() => {
        setTimeout(() => {
            setShowHome(true)
        }, 14500);
    }, [])


    const resetTimeout = () => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    }

    const resetRestaurantTimeout = () => {
        if (restaurantTimeout.current) {
            clearTimeout(restaurantTimeout.current);
        }
    }
    //continously clear and re-set timeout to change trailsIndex
    useEffect(() => {
        resetTimeout();
        timeout.current = setTimeout(
            () =>
                setTrailIndex((prevIndex) =>
                    prevIndex === trailsData.length - 1 ? 0 : prevIndex + 1
                ), 4000)
        return () => {
            resetTimeout()
        };
    }, [trailIndex])


    useEffect(() => {
        resetRestaurantTimeout();
        restaurantTimeout.current = setTimeout(
            () =>
                setRestaurantsIndex((prevIndex) =>
                    prevIndex === restaurantsData.length - 1 ? 0 : prevIndex + 1
                ), 4000)

        return () => {
            resetRestaurantTimeout()
        };
    }, [restaurantsIndex])






    return (
        <motion.main
            id='homePage'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* <div id='vertDiv'></div> */}
            {!showHome ? <AnimationHomePage setShowHome={setShowHome} />
                : <>
                    {user && <div className='headerCont'>
                        <div></div>
                        <h1>BASECAMP</h1>
                        <div></div>
                    </div>}
                    <h1 id='usernameH1'>Welcome Home, {user.username}</h1>
                    <div id='btnToggles'>
                        <button onClick={() => {
                            setShowTrailsBtns(!showTrailsBtns)
                            setShowRestaurantsBtns(false)
                            }}>
                                Explore Trails
                                </button>
                        <button onClick={() => {
                            setShowRestaurantsBtns(!showRestaurantsBtns)
                            setShowTrailsBtns(false)
                            }}>
                                Explore Restaurants
                                </button>
                    </div>
                    {/* Trails buttons */}
                    {showTrailsBtns &&
                        <div className='btnsContainer'>
                            <button onClick={() => {
                                axiosRequests.fetchTrails(boulder.lat, boulder.lng, setTrailsData)
                                setTrailIndex(0)
                                setShowTrails(true)
                            }}>
                                Boulder Trails
                            </button>
                            <button onClick={() => {
                                axiosRequests.fetchTrails(lyons.lat, lyons.lng, setTrailsData)
                                setTrailIndex(0)
                                setShowTrails(true)
                            }}>
                                Lyons Trails
                            </button>
                            <button onClick={() => {
                                axiosRequests.fetchTrails(golden.lat, golden.lng, setTrailsData)
                                setTrailIndex(0)
                                setShowTrails(true)
                            }}>
                                Golden Trails
                            </button>
                            <button onClick={() => {
                                axiosRequests.fetchTrails(estesPark.lat, estesPark.lng, setTrailsData)
                                setTrailIndex(0)
                                setShowTrails(true)
                            }}>
                                Estes Park Trails
                            </button>
                        </div>

                    }


                    {/* Restaurants buttons */}
                    {showRestaurantsBtns &&
                        <div className='btnsContainer'>
                            <button onClick={() => {
                                axiosRequests.fetchRestaurants(boulder.lat, boulder.lng, setRestaurantsData)
                                setRestaurantsIndex(0)
                                setShowRestaurants(true)
                            }}>
                                Boulder Restaurants
                            </button>
                            <button onClick={() => {
                                axiosRequests.fetchRestaurants(lyons.lat, lyons.lng, setRestaurantsData)
                                setRestaurantsIndex(0)
                                setShowRestaurants(true)
                            }}>
                                Lyons Restaurants
                            </button>
                            <button onClick={() => {
                                axiosRequests.fetchRestaurants(golden.lat, golden.lng, setRestaurantsData)
                                setRestaurantsIndex(0)
                                setShowRestaurants(true)
                            }}>
                                Golden Restaurants
                            </button>
                            <button onClick={() => {
                                axiosRequests.fetchRestaurants(estesPark.lat, estesPark.lng, setRestaurantsData)
                                setRestaurantsIndex(0)
                                setShowRestaurants(true)
                            }}>
                                Estes Park Restaurants
                            </button>
                        </div>
                    }
                    {/* {showRestaurantsBtns &&
                        <div className='btnsContainer'>
                            <button onClick={() => {
                                axiosRequests.fetchAttractions(boulder.lat, boulder.lng, setAttractionsData)
                                setRestaurantsIndex(0)
                                setShowRestaurants(true)
                            }}>
                                Boulder Attractions
                            </button>
                            <button onClick={() => {
                                axiosRequests.fetchAttractions(lyons.lat, lyons.lng, setAttractionsData)
                                setRestaurantsIndex(0)
                                setShowRestaurants(true)
                            }}>
                                Lyons Attractions
                            </button>
                            <button onClick={() => {
                                axiosRequests.fetchAttractions(golden.lat, golden.lng, setAttractionsData)
                                setRestaurantsIndex(0)
                                setShowRestaurants(true)
                            }}>
                                Golden Attractions
                            </button>
                            <button onClick={() => {
                                axiosRequests.fetchAttractions(estesPark.lat, estesPark.lng, setRestaurantsData)
                                setRestaurantsIndex(0)
                                setShowRestaurants(true)
                            }}>
                                Estes Park Attractions
                            </button>
                        </div>
                    } */}


                    {showTrails && trailsData.length === 5 && <div className='trailsDiv'>
                        <div id='trailTitle'>
                            <h1 id="trailH1">Trails in {trail.city}</h1>
                            <button
                                id='trailBtn'
                                onClick={() => setShowTrails(false)}
                            >Hide</button>
                        </div>

                        <div className='titleCont'>
                            {trail.thumbnail
                                ?
                                <img className='gearImg' src={trail.thumbnail} alt="{trail.name}" />
                                :
                                <h2>Sorry, no photo for this trail</h2>
                            }
                            <div className='titleDiv'>
                                <h1>{trail.name}</h1>
                                <p>Miles: {trail.length}</p>
                                <p>Difficulty: {trail.difficulty}</p>
                                <p>{trail.description}</p>
                            </div>
                        </div>
                    </div>}

                    {showRestaurants && restaurantsData.length && <div className='trailsDiv'>
                        <div id='trailTitle'>
                            <h1 id="trailH1">Restaurants in {restaurant.address_obj.city}</h1>
                            <button
                                id='trailBtn'
                                onClick={() => setShowRestaurants(false)}
                            >Hide</button>
                        </div>

                        <div className='titleCont'>
                            {restaurant.photo
                                ?
                                <img className='gearImg' src={restaurant.photo.images.medium.url} alt="{trail.name}" />
                                :
                                <h2>Sorry, no photo for this restaurant</h2>
                            }
                            <div className='titleDiv'>
                                {restaurant.name
                                    ?
                                    <h1>{restaurant.name}</h1>
                                    :
                                    <h2>Sorry, there is no name for this restaurant</h2>
                                }

                                <p>{restaurant.price}</p>
                                <p>Rating: {restaurant.rating}</p>
                                <p>{restaurant.description}</p>
                            </div>
                        </div>
                    </div>}

                </>}
        </motion.main>
    )
}