import "./FormModal.css";
import { useState } from "react";
import { validationImageUrl } from "../../utils/validation";
import { useForm } from "../../hooks/useForm";

function FormModal({ isOpen, onClose, handleSubmit }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    weather: "hot",
  });
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");

  const handleImageChange = (e) => {
    const value = e.target.value;
    setImage(value);
    setImageError(validationImageUrl(value));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (imageError) return;
    handleSubmit({
      name: values.name,
      imageUrl: image,
      weather: values.weather,
    });
    resetForm();
    setImage("");
    setImageError("");
  };

  return (
    <div className={`form__modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="form__modal-container">
        <h2 className="form__modal-title">New Garment</h2>
        <button
          type="button"
          className="form__modal-close"
          onClick={onClose}
        ></button>
        <form onSubmit={handleFormSubmit} className="form__modal-inputs">
          <label htmlFor="username" className="form__modal-label">
            Name
          </label>
          <input
            type="text"
            className="form__modal-input"
            placeholder="Name"
            id="username"
            value={values.name}
            name="name"
            onChange={handleChange}
          />
          <label htmlFor="image" className="form__modal-label">
            Image
          </label>
          <input
            type="text"
            className="form__modal-input"
            placeholder="Image URL"
            id="image"
            name="image"
            value={image}
            onChange={handleImageChange}
          />
          {imageError && <p className="form__modal-error">{imageError}</p>}
          <fieldset className="form__modal-fieldset">
            <legend className="form__modal-legend">
              Select the weather type:
            </legend>

            <div className="form__modal-selections">
              <input
                className="form__modal-selection"
                type="radio"
                id="hot"
                name="weather"
                value="hot"
                checked={values.weather === "hot"}
                onChange={handleChange}
              />
              <label className="form__modal-choice" htmlFor="hot">
                Hot
              </label>
            </div>

            <div className="form__modal-selections">
              <input
                className="form__modal-selection"
                type="radio"
                id="warm"
                name="weather"
                value="warm"
                onChange={handleChange}
                checked={values.weather == "warm"}
              />
              <label className="form__modal-choice" htmlFor="warm">
                Warm
              </label>
            </div>

            <div className="form__modal-selections">
              <input
                className="form__modal-selection"
                type="radio"
                id="cold"
                name="weather"
                value="cold"
                onChange={handleChange}
                checked={values.weather === "cold"}
              />
              <label className="form__modal-choice" htmlFor="cold">
                Cold
              </label>
            </div>
          </fieldset>
          <button type="submit" className="form__modal-submit">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormModal;
