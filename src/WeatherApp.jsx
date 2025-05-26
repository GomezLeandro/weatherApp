import { useState } from "react";
import "./WeatherApp.css";

export const WeatherApp = () => {
  const URL_BASE = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_API_KEY
  const difKelvin = 273.15; // para lograr obtener grados Celsious debemos restar este número a los grados kelvin

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null)

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData= async() => {
    try {
       const response = await fetch(`${URL_BASE}?q=${city}&appid=${API_KEY}&lang=es`)
       const data = await response.json()
       setWeatherData(data)
       console.log(data)
    } catch (error) {
        console.log(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData()
    //aca voy a enviar el fetch
    
  };

  return (
    <>
      <div className="container">
        <h1>Aplicación de Clima</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingresá una ciudad"
            value={city}
            onChange={handleCityChange}
          />
          <button type="submit">Buscar</button>
        </form>
        {weatherData && (

        <div>
            <h2> {weatherData.name},{weatherData.sys.country} </h2>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}  alt={weatherData.weather[0].description}/>
            <p> La temperatura actual es: {Math.floor(weatherData.main.temp - difKelvin)}°C </p>
            <p> La sensación termica actual es: {Math.floor(weatherData.main.feels_like - difKelvin)}°C </p>
            <p>La condición metereológica actual es: {weatherData.weather[0].description}</p>
        </div>

        )}
      </div>
    </>
  );
};
