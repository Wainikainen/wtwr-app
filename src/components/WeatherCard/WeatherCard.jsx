import bannerImg from "../../images/weatherCard.svg";
import "./WeatherCard.css";

function WeatherCard() {
  return (
    <div className="weather__card">
      <img
        src={bannerImg}
        className="weather__banner-img"
        alt="Weather Banner"
      />
      <p className="weather__card-txt">70°</p>
    </div>
  );
}

export default WeatherCard;
