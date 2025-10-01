import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTempScaleContext from "../../contexts/CurrentTempScaleContext";

function Main({ clothingItems, handleOpenItemModal, weatherData, onCardLike }) {
  const { tempScale } = useContext(CurrentTempScaleContext);
  const filterCards = clothingItems.filter((item) =>
    item.weather.includes(weatherData.tempCondition)
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is {weatherData.temp[tempScale]}° {tempScale}/ You may want to
        wear:
      </p>
      <ul className="main__card-list">
        {filterCards.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
