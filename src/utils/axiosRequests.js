import axios from "axios";

const baseURL = 'https://a-lodge-basecamp.herokuapp.com'

// used to retrieve all gear_items
export const getGear = (setState) => {
    axios.get(`${baseURL}/rentals/`)
        .then(res => {
            let data = res.data;
            console.log(data)
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
        .catch((err) => { });

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
            let data = res.data;
            console.log(data)
        })
        .catch((err) => { });
};



//used for weather data on gear index
export const getWeather = (setState) => {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: { q: 'Boulder', days: '3' },
        headers: {
            'X-RapidAPI-Key': 'b706fa8596msha33725def79a97cp1b9fc1jsn8dfd397c7442',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        // console.log(response.data);
        setState(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


// gets all reservations
export const getReservations = (setState) => {
    axios.get(`${baseURL}/reservations/`)
        .then(res => {
            let data = res.data;
            console.log(data)
            setState(data);
        })
        .catch(err => { })
}


// used to get all logged in user reservations
export const getUserReservations = (setState, id) => {
    axios.get(`${baseURL}/myaccount/${id}`)
        .then(res => {
            let data = res.data;
            // console.log(data)
            setState(data);
        })
        .catch(err => { })
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
    // gear_item: formData.gear_item,
    qty: data.qty,
    user: user.user_id
})
    .then((res) => {
        console.log(res)
    })
    .catch((err) => console.log(err));
}



// get trails on home page
export const fetchTrails = (lat, lng, setState) => {
    const options = {
        method: 'GET',
        url: 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/',
        params: { lat: `${lat}`, lon: `${lng}`, per_page: '5' },
        headers: {
            'X-RapidAPI-Key': 'b706fa8596msha33725def79a97cp1b9fc1jsn8dfd397c7442',
            // 'X-RapidAPI-Key': 'b00ef5d09cmsh0fcc399427b9deap187b8djsn0c860bac4d4d',
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
            // 'X-RapidAPI-Key': 'b706fa8596msha33725def79a97cp1b9fc1jsn8dfd397c7442',
            'X-RapidAPI-Key': 'b00ef5d09cmsh0fcc399427b9deap187b8djsn0c860bac4d4d',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        // console.log(response.data.data);
        // put data in array and filter out the ads that don't have names
        let reservationsArr = response.data.data

        reservationsArr = reservationsArr.filter(restaurant => restaurant.name !== undefined)
        console.log(reservationsArr)
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
            'X-RapidAPI-Key': 'b00ef5d09cmsh0fcc399427b9deap187b8djsn0c860bac4d4d',
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