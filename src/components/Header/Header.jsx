import logo from "../../images/logo.svg";
import userLogo from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({ handleAddGarmentModal, weatherData }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="WTWR LOGO" className="header__logo" />
      <p className="header__location">
        <time dateTime={now} className="header__dateTime">
          {dateStr}
        </time>
        , {weatherData.city}
      </p>
      <ToggleSwitch />
      <button onClick={handleAddGarmentModal} className="header__add-btn">
        + Add Clothes
      </button>
      <p className="header__user">Terrance</p>
      <img src={userLogo} alt="USER IMAGE" className="header__user-img" />
    </header>
  );
}

export default Header;
