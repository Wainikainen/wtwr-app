import "./ToggleSwitch.css";
import CurrentTempScaleContext from "../../contexts/CurrentTempScaleContext";
import { useContext } from "react";

function ToggleSwitch() {
  const contextValue = useContext(CurrentTempScaleContext);
  return (
    <label htmlFor="toggle-switch" className="toggle__switch">
      <input
        id="toggle-switch"
        type="checkbox"
        className="toggle__checkbox"
        onChange={contextValue.handleScaleChange}
      />
      <span className="toggle__switch-circle"></span>
      <span className="toggle__switch-value toggle__switch-value-left">F</span>
      <span className="toggle__switch-value toggle__switch-value-right">C</span>
    </label>
  );
}

export default ToggleSwitch;
