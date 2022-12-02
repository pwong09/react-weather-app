import "./App.css";
import CurrentWeather from "./components/currentWeather/currentWeather";
import Search from "./components/search/search";
import { OPENWEATHER_API_URL } from "./api.js";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${OPENWEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`
    );
    const fiveDayForecastFetch = fetch(
      `${OPENWEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, fiveDayForecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastReponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastReponse });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
    </div>
  );
}

export default App;
