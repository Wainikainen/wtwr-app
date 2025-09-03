import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import FormModal from "../FormModal/FormModal";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import { getWeatherData } from "../../utils/weatherApi";
import "./App.css";
import CurrentTempScaleContext from "../../contexts/CurrentTempScaleContext";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [tempScale, setTempScale] = useState("F");

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleScaleChange() {
    if (tempScale === "F") {
      setTempScale("C");
    } else {
      setTempScale("F");
    }
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <CurrentTempScaleContext.Provider value={{ tempScale, handleScaleChange }}>
      <div className="app">
        <Header
          weatherData={weatherData}
          handleAddGarmentModal={handleAddGarmentModal}
        />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          handleOpenItemModal={handleOpenItemModal}
        />
        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          onClose={handleCloseModal}
        />
        <FormModal
          isOpen={activeModal === "add-garment-modal"}
          onClose={handleCloseModal}
        ></FormModal>
      </div>
    </CurrentTempScaleContext.Provider>
  );
}

export default App;
