import React from "react";
import "./WeatherData.css";

const WeatherData = ({ weatherObject }) => {
  const { main, name, weather, sys } = weatherObject;
  const iconUrl = "http://openweathermap.org/img/w/" + weather[0].icon + ".png";

  return (
    <div className="weather-container">
      <h3 className="weather-container__title">
        {name} ({sys.country}) - {weather[0].description}
      </h3>
      <div className="weather-container__row">
        <img src={iconUrl} alt="weather icon" />
        <h1>{main.temp} °C</h1>
      </div>
    </div>
  );
};

export default WeatherData;
