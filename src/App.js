import "./App.css";
import { useState } from "react";
import { locationiqKey, weatherKey } from "./keys";

function App() {
  const [cityName, setCityName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const lonlat = await forwardGeocoding(cityName);

    const weatherReport = await getWeather(lonlat[0], lonlat[1]);
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
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherKey}`)
        .then(res => res.json())
        .then(res => resolve(res));
    });
  }

  function handleChange(e) {
    setCityName(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="city-name" value={cityName} onChange={handleChange} />
        <input type="submit" value="OK" />
      </form>
    </div>
  );
}

export default App;
