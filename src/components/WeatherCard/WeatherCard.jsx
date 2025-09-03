import cloudyDay from "../../images/cloudy-day.svg";
import cloudyNight from "../../images/cloudy-night.svg";
import fogDay from "../../images/fog-day.svg";
import fogNight from "../../images/fog-night.svg";
import rainDay from "../../images/rain-day.svg";
import rainNight from "../../images/rain-night.svg";
import snowDay from "../../images/snow-day.svg";
import snowNight from "../../images/snow-night.svg";
import stormDay from "../../images/storm-day.svg";
import stormNight from "../../images/storm-night.svg";
import sunnyDay from "../../images/sunny-day.svg";
import sunnyNight from "../../images/sunny-night.svg";
import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTempScaleContext from "../../contexts/CurrentTempScaleContext";

function WeatherCard({ weatherData }) {
  const { tempScale } = useContext(CurrentTempScaleContext);
  const now = Date.now() / 1000;
  const isDay = now >= weatherData.sunrise && now <= weatherData.sunset;

  let weatherImage;
  switch (weatherData.weatherType) {
    case "Clear":
      weatherImage = isDay ? sunnyDay : sunnyNight;
      break;
    case "Clouds":
      weatherImage = isDay ? cloudyDay : cloudyNight;
      break;
    case "Snow":
      weatherImage = isDay ? snowDay : snowNight;
      break;
    case "Rain":
    case "Drizzle":
      weatherImage = isDay ? rainDay : rainNight;
      break;
    case "Fog":
    case "Mist":
      weatherImage = isDay ? fogDay : fogNight;
      break;
    case "Thunderstorm":
      weatherImage = isDay ? stormDay : stormNight;
      break;
    default:
      weatherImage = isDay ? cloudyDay : cloudyNight;
  }

  return (
    <div className="weather__card">
      <img
        src={weatherImage}
        className="weather__banner-img"
        alt="Weather Banner"
      />
      <p className="weather__card-txt">
        {weatherData.temp[tempScale]}&deg; {tempScale}
      </p>
    </div>
  );
}

export default WeatherCard;
