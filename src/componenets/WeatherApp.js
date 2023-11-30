import React, { useState } from 'react';
import axios from 'axios';
import air from '../Asset/009-wind-removebg-preview.png';
import mist from '../Asset/007-mist-removebg-preview.png';
import go from '../Asset/010-loupe-removebg-preview.png';
import humi from '../Asset/008-humidity-removebg-preview.png';
import cloud from '../Asset/002-cloud-removebg-preview.png';
import driz from '../Asset/003-cloud-1-removebg-preview.png';
import thunder from '../Asset/005-thunderstorm-removebg-preview.png';
import snow from '../Asset/006-snow-removebg-preview.png';
import self from '../Asset/011-pin-removebg-preview.png';
import rain from '../Asset/004-rainy-removebg-preview.png';
import clear from '../Asset/001-clear-sky-removebg-preview.png';
import banjo from "../Asset/Banjo_Player___Jose_Pontes-removebg-preview.png"

function WeatherApp() {
  const [icon, setIcon] = useState(banjo);
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [feels, setFeels] = useState(null);
  const [location, setLocation] = useState('');
  const [humidity, setHumidity] = useState('');
  const [wind, setWind] = useState('');
  const [main,setMain] = useState('')

  async function search() {
    const apiKey = 'cdf9e7666a24d12decac9d27c47a4f1c';
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      const { main, wind, name, weather } = response.data;

      setTemperature(main.temp + "°c");
      setFeels ("Feels like " +main.feels_like +"°c");
      setLocation(name);
      setHumidity(main.humidity +'%');
      setWind(wind.speed +" Kmph");
      setMain(weather[0].main);
      
      if (weather[0].icon === "01d" || weather[0].icon === "01n") {
        setIcon(clear);
      } else if (
        weather[0].icon === "02d" ||
        weather[0].icon === "02n" ||
        weather[0].icon === "03d" ||
        weather[0].icon === "03n" ||
        weather[0].icon === "04d" ||
        weather[0].icon === "04n"
      ) {
        setIcon(cloud);
      } else if (weather[0].icon === "09d" || weather[0].icon === "09n") {
        setIcon(driz);
      } else if (weather[0].icon === "10d" || weather[0].icon === "10n") {
        setIcon(rain);
      } else if (weather[0].icon === "11d" || weather[0].icon === "11n") {
        setIcon(thunder);
      } else if (weather[0].icon === "13d" || weather[0].icon === "13n") {
        setIcon(snow);
      } else if (weather[0].icon === "50d" || weather[0].icon === "50n") {
        setIcon(mist);
      } else {
        setIcon(clear);
      }

      

      console.log(response);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert("City not found")
    }

    setCity('')
  }

  async function selfSearch() {
    function gotLoc(position) {
      const { latitude, longitude } = position.coords;
      searchByCoords(latitude, longitude);
    }

    function accessDeny(error) {
      console.error('Error getting location:', error);
    }

    navigator.geolocation.getCurrentPosition(gotLoc, accessDeny);
  }

  async function searchByCoords(latitude, longitude) {
    const apiKey = 'cdf9e7666a24d12decac9d27c47a4f1c';
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );

      const { main, wind, name, weather } = response.data;

      setTemperature(main.temp + "°c");
      setFeels ("Feels like " +main.feels_like +"°c");
      setLocation(name);
      setHumidity(main.humidity +'%');
      setWind( wind.speed +" Kmph");
      setMain(weather[0].main);
      
      if (weather[0].icon === "01d" || weather[0].icon === "01n") {
        setIcon(clear);
      } else if (
        weather[0].icon === "02d" ||
        weather[0].icon === "02n" ||
        weather[0].icon === "03d" ||
        weather[0].icon === "03n" ||
        weather[0].icon === "04d" ||
        weather[0].icon === "04n"
      ) {
        setIcon(cloud);
      } else if (weather[0].icon === "09d" || weather[0].icon === "09n") {
        setIcon(driz);
      } else if (weather[0].icon === "10d" || weather[0].icon === "10n") {
        setIcon(rain);
      } else if (weather[0].icon === "11d" || weather[0].icon === "11n") {
        setIcon(thunder);
      } else if (weather[0].icon === "13d" || weather[0].icon === "13n") {
        setIcon(snow);
      } else if (weather[0].icon === "50d" || weather[0].icon === "50n") {
        setIcon(mist);
      } else {
        setIcon(clear);
      }



      console.log(response);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <>
      <div className='container'>
        <h1>WeatherApp</h1>

        <div id='input-div'>
          <input value={city} onChange={(e) => setCity(e.target.value)}  onKeyPress={handleKeyPress} type='text' />
          <div onClick={search} id='search-img-div'>
            <img className='up-icons' src={go} alt='search' />
          </div>
          <div onClick={selfSearch} id='self-loc-div'>
            <img className='up-icons' src={self} alt='self-location' />
          </div>
        </div>

        <div id='mid-div'>
          <img src={icon} alt='weather-icon' />
          <h4>{main}</h4>
          <h2 id='temperature'>{temperature}</h2>
          <p> {feels} </p>
          <p id='loc'>{location}</p>
        </div>

        <div id='other-info'>
          <div id='humi-div'>
            <img className='down-icons' src={humi} alt='humidity' />
            <span className='digi' >{humidity}</span>
            <p>Humidity</p>
          </div>

          <div id='wind-div'>
            <div>
            <img className='down-icons' src={air} alt='wind' />
            <span className='digi' >{wind}</span>
            </div>
            <p>Wind</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherApp;
