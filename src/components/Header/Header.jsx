import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddGarmentModal,
  weatherData,
  handleLoginModal,
  handleSignUpModal,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [imageError, setImageError] = useState(false);
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    setImageError(false);
  }, [currentUser]);

  return (
    <header className="header">
      <Link to={"/"}>
        <img src={logo} alt="WTWR LOGO" className="header__logo" />
      </Link>
      <p className="header__location">
        <time dateTime={now} className="header__dateTime">
          {dateStr}
        </time>
        , {weatherData.city}
      </p>
      <ToggleSwitch />
      {currentUser?.name ? (
        <>
          <button onClick={handleAddGarmentModal} className="header__add-btn">
            + Add Clothes
          </button>
          <Link className="header__link-profile" to={"/profile"}>
            <p className="header__user">{currentUser?.name}</p>
            {imageError ? (
              <div className="header__link-error">
                <p className="header__link-error-name">t</p>
              </div>
            ) : (
              <img
              onError={() => {
                setImageError(true)
              }}
                src={currentUser?.avatar}
                alt="USER IMAGE"
                className="header__user-img"
              />
            )}
          </Link>
        </>
      ) : (
        <>
          <button onClick={handleSignUpModal} className="header__signUp">
            Sign Up
          </button>
          <button onClick={handleLoginModal} className="header__logIn">
            Log In
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
