import "./App.css";
import { useState } from "react";
import { locationiqKey, weatherKey } from "./keys";
import FormContainer from "./components/FormContainer";
import WeatherData from "./components/WeatherData";

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherObject, setWeatherObject] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();

    const lonlat = await forwardGeocoding(cityName);

    const weatherReport = await getWeather(lonlat[0], lonlat[1]);
    setWeatherObject(weatherReport);
    console.log(weatherReport);
  }

  function forwardGeocoding(cityName) {
    return new Promise(resolve => {
      fetch(`https://eu1.locationiq.com/v1/search.php?key=${locationiqKey}&city=${cityName}&format=json`)
        .then(res => res.json())
        .then(res => {
          const lonlat = [res[0].lon, res[0].lat];
          resolve(lonlat);
        });
    });
  }

  function getWeather(lon, lat) {
    return new Promise(resolve => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`)
        .then(res => res.json())
        .then(res => resolve(res));
    });
  }
  function handleChange(e) {
    setCityName(e.target.value);
  }

  return (
    <div className="container">
      <FormContainer onSubmit={handleSubmit} title={"Weather App"}>
        <input
          type="text"
          name="city-name"
          value={cityName}
          onChange={handleChange}
          placeholder="city name"
          autoComplete="off"
        />
        <input type="submit" value="OK" />
        {weatherObject !== 0 && <WeatherData weatherObject={weatherObject} />}
      </FormContainer>
    </div>
  );
}

export default App;
