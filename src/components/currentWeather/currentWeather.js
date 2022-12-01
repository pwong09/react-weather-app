import "./currentWeather.css";

const CurrentWeather = () => {
  return (
    <div className="weather">
        <div className="top">
          <p className="city">City Name</p>
          <p className="weather-description">Weather Description</p>
        </div>
        <img alt="weather" className="weather-icon" src="" />
    </div>
  );
}

export default CurrentWeather;