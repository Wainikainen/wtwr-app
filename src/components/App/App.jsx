import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import CurrentTempScaleContext from "../../contexts/CurrentTempScaleContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
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
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { validateToken, login, signUp } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [tempScale, setTempScale] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

  function handleLoginModal() {
    setActiveModal("login-modal");
  }

  function handleSignUpModal() {
    setActiveModal("register-modal");
  }

  function handleRegister(formValues, callback) {
    signUp(formValues)
      .then(() => {
        return login({
          email: formValues.email,
          password: formValues.password,
        }).then((data) => {
          localStorage.setItem("jwt", data.token);
          return validateToken(data.token).then((newUser) => {
            callback(newUser);
          });
        });
      })
      .catch(console.error);
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleEditProfileModal() {
    setActiveModal("edit-profile-modal");
  }

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    const isLiked = likes.some((id) => id === currentUser._id);

    if (!isLiked) {
      addCardLike(_id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch(console.log);
    } else {
      removeCardLike(_id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch(console.log);
    }
  };

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
      const openedModal = document.querySelector(".modal_is-opened");
      if (!openedModal) return;

      const container = openedModal.querySelector("div"); // the inner modal container
      if (container && !container.contains(e.target)) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeModal]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      validateToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentTempScaleContext.Provider value={{ tempScale, handleScaleChange }}>
      <CurrentUserContext.Provider
        value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
      >
        <div className="app">
          <Header
            weatherData={weatherData}
            handleAddGarmentModal={handleAddGarmentModal}
            handleLoginModal={handleLoginModal}
            handleSignUpModal={handleSignUpModal}
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
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile
                    clothingItems={clothingItems}
                    handleEditProfileModal={handleEditProfileModal}
                    handleOpenItemModal={handleOpenItemModal}
                    handleAddGarmentModal={handleAddGarmentModal}
                    handleDeleteModal={handleDeleteModal}
                    handleSignOut={handleSignOut}
                    handleCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
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
          <LoginModal
            isOpen={activeModal === "login-modal"}
            onClose={handleCloseModal}
            handleLoginModal={handleLoginModal}
            handleSignUpModal={handleSignUpModal}
          />
          <RegisterModal
            isOpen={activeModal === "register-modal"}
            onClose={handleCloseModal}
            handleRegister={handleRegister}
            handleLoginModal={handleLoginModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile-modal"}
            onClose={handleCloseModal}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTempScaleContext.Provider>
  );
}

export default App;
