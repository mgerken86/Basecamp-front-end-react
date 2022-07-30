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