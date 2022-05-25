import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({capital}) => {

    const API_KEY = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({});

    useEffect(() => {
        const url_site = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`;
        axios
          .get(url_site)
          .then(response => {
            setWeather(response.data)
          })
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (Object.keys(weather).length !== 0) {
        const iconURL = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>temperature {weather.main.temp} Celcius</p>
                <img src={iconURL} alt="weather icon"/>
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
    } else {
        return (
            <p>Weather is loading...</p>
        )
    }
}

export default Weather