import React, {  useState } from 'react';
import axios from 'axios';

const CityWeather = () => {


  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [apiKey] = useState('526ca69bea295dfcee51dedbc265b38f');

 
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`
        );
        setWeatherData(response.data);
        setNotFound(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setNotFound(true);
        setWeatherData(null);
      }
    };
  
    


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div>
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      {notFound && <p>City not found. Please enter a valid city name.</p>}

      {weatherData && (
        <div className="weather">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
};

export default CityWeather;
