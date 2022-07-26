import axios from "axios";

const developmentURL = "http://localhost:8000/"
const baseURL = 'https://a-lodge-basecamp.herokuapp.com'

const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY
const trailsAPIKey = process.env.REACT_APP_TRAILS_API_KEY
const travelAPIKey = process.env.REACT_APP_TRAVEL_API_KEY




// used to retrieve all gear_items
export const getGear = (setState) => {
    axios.get(`${baseURL}/rentals/`)
        .then(res => {
            let data = res.data;
            setState(data);
        })
        .catch(err => { })
}


// create new gear item
export const postGear = (setState, formData, starterData) => {
    axios
        .post(`${baseURL}/rentals/`, {
            name: formData.name,
            desc: formData.desc,
            price: formData.price,
            qty: formData.qty,
            image_url: formData.image_url,
        })
        .then((res) => {
        })
        .catch((err) => {
            console.log(err)
        });
    setState(starterData)
};


// edit gear item
export const editGear = (id, formData) => {
    axios
        .put(`${baseURL}/rentals/${id}`, {
            name: formData.name,
            desc: formData.desc,
            price: formData.price,
            qty: formData.qty,
            image_url: formData.image_url
        })
        .then((res) => {
        })
        .catch((err) => { });
};



// gets all reservations
export const getReservations = (setState) => {
    axios.get(`${baseURL}/reservations/`)
        .then(res => {
            let data = res.data;
            setState(data);
        })
        .catch(err => {
            console.log(err)
        })
}


// used to get all logged in user reservations
export const getUserReservations = (setState, id) => {
    axios.get(`${baseURL}/myaccount/${id}`)
        .then(res => {
            let data = res.data;
            setState(data);
        })
        .catch(err => {
            console.log(err)
        })
}


//used to delete one reservation
export const deleteReservation = (id) => {
    axios.delete(`${baseURL}/reservations/${id}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => { })
}


//edit a reservation
export const editReservation = (id, data, user) => {
    axios.put(`${baseURL}/reservations/${id}`, {
        start_date: data.start_date,
        end_date: data.end_date,
        //change this to dynamically choose the id of the gear items
        gear_item_ids: [data.gear_item_ids],
        qty: data.qty,
        user: user.user_id
    })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => console.log(err));
}


// gets all Posts
export const getPosts = (setState, topic) => {
    axios.get(`${baseURL}/posts/`)
        .then(res => {
            let data = res.data;
            if (topic === 'all') {
                setState(data);
            } else {
                let filteredPosts = data.filter(post => post.this_topic === topic)
                setState(filteredPosts)
            }
        })
        .catch(err => { })
}


//edit a post
export const editPost = (id, data, navigate) => {
    axios.put(`${baseURL}/posts/${id}`, {
        topic: data.topic,
        user: data.user,
        title: data.title,
        body: data.body,
    })
        .then((res) => {
            navigate(0)
        })
        .catch((err) => console.log(err));
}


//used to delete one post
export const deletePost = (id) => {
    axios.delete(`${baseURL}/posts/${id}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => { })
}


// gets single Post Comments
export const getPostComments = (setState, postId) => {
    axios.get(`${baseURL}/comments/`)
        .then(res => {
            const newData = [...res.data].filter(object => object.this_post === postId)
            setState(newData);
        })
        .catch(err => { })
}

//edit a comment
export const editComment = (id, data, navigate) => {
    axios.put(`${baseURL}/comments/${id}`, {
        user: data.user,
        body: data.body,
        post: data.post,

    })
        .then((res) => {
            console.log(res)
            navigate(0)
        })
        .catch((err) => console.log(err));
}

// delete one comment
export const deleteComment = (id, navigate) => {
    axios.delete(`${baseURL}/comments/${id}`)
        .then(res => {
            console.log(res)
            navigate(0)

        })
        .catch(err => { })
}


// gets all Topics
export const getTopics = (setState) => {
    axios.get(`${baseURL}/topics/`)
        .then(res => {
            let data = res.data;
            setState(data);
        })
        .catch(err => { })
}



//used for weather data on gear index
export const getWeather = (setState) => {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: { q: 'Boulder', days: '3' },
        headers: {
            'X-RapidAPI-Key': weatherAPIKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        setState(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

// get trails on home page
export const fetchTrails = (lat, lng, setState) => {
    const options = {
        method: 'GET',
        url: 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/',
        params: { lat: `${lat}`, lon: `${lng}`, per_page: '5' },
        headers: {
            'X-RapidAPI-Key': trailsAPIKey,
            'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        setState(response.data.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export const fetchRestaurants = (lat, lng, setState) => {

    const options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
        params: {
            latitude: lat,
            longitude: lng,
            limit: '10',
            currency: 'USD',
            distance: '2',
            open_now: 'false',
            lunit: 'km',
            lang: 'en_US'
        },
        headers: {
            'X-RapidAPI-Key': travelAPIKey,
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        // put data in array and filter out the ads that don't have names
        let reservationsArr = response.data.data
        reservationsArr = reservationsArr.filter(restaurant => restaurant.name !== undefined)
        setState(reservationsArr)
    }).catch(function (error) {
        console.error(error);
    });
}

export const fetchAttractions = (lat, lng, setState) => {
    const options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng',
        params: {
            longitude: lat,
            latitude: lng,
            lunit: 'km',
            currency: 'USD',
            lang: 'en_US'
        },
        headers: {
            'X-RapidAPI-Key': travelAPIKey,
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data.data);
        setState(response.data.data);
    }).catch(function (error) {
        console.error(error);
    });
}