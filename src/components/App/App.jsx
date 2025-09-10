import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CurrentTempScaleContext from "../../contexts/CurrentTempScaleContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import { getWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import FormModal from "../FormModal/FormModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteModal from "../OpenConfirmationModal/DeleteModal";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";

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

  function handleDeleteModal(card) {
    setActiveModal("delete-modal");
    setSelectedCard(card);
  }

  function handleDelete() {
    deleteClothingItem(selectedCard._id).then(() => {
      const updatedClothingItems = clothingItems.filter(
        (item) => item._id !== selectedCard._id
      );
      setClothingItems(updatedClothingItems);
      handleCloseModal();
    });
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

  function handleClothingItems(newItem) {
    addClothingItem(newItem).then((addedItem) => {
      setClothingItems((prevItems) => [addedItem, ...prevItems]);
      handleCloseModal();
    });
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getClothingItems().then((data) => setClothingItems(data));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const modalClass =
        activeModal === "item-modal"
          ? "item__modal"
          : activeModal === "add-garment-modal"
          ? "form__modal"
          : "deleteModal";
      const modal = document.querySelector(
        `.${
          activeModal === "item-modal"
            ? "item__modal-container"
            : activeModal === "add-garment-modal"
            ? "form__modal-container" //for some reason i cant figure out why //
            : "deleteModal__container" //form modal is not closing on click outside //
        }`
      );
      if (
        modal &&
        e.target.closest(`.${modalClass}`) &&
        !modal.contains(e.target)
      )
        handleCloseModal();
    };
    if (activeModal) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeModal]);

  return (
    <CurrentTempScaleContext.Provider value={{ tempScale, handleScaleChange }}>
      <div className="app">
        <Header
          weatherData={weatherData}
          handleAddGarmentModal={handleAddGarmentModal}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                handleDeleteModal={handleDeleteModal}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                handleAddGarmentModal={handleAddGarmentModal}
                handleDeleteModal={handleDeleteModal}
              />
            }
          ></Route>
        </Routes>
        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          onClose={handleCloseModal}
          handleDeleteModal={handleDeleteModal}
        />
        <FormModal
          isOpen={activeModal === "add-garment-modal"}
          onClose={handleCloseModal}
          handleSubmit={handleClothingItems}
        />
        <DeleteModal
          card={selectedCard}
          isOpen={activeModal === "delete-modal"}
          onClose={handleCloseModal}
          handleDelete={handleDelete}
        />
      </div>
    </CurrentTempScaleContext.Provider>
  );
}

export default App;
