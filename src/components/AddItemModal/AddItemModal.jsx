import { useState } from "react";
import "./AddItemModal.css";
import { useForm } from "../../hooks/useForm";
import { validationImageUrl } from "../../utils/validation";

const AddItemModal = ({ isOpen, handleSubmit, onClose }) => {
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
    <div className={`addItemModal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="addItemModal-container">
        <h2 className="addItemModal-title">New Garment</h2>
        <button
          type="button"
          className="addItemModal-close"
          onClick={onClose}
        ></button>
        <form onSubmit={handleFormSubmit} className="addItemModal-inputs">
          <label htmlFor="username" className="addItemModal-label">
            Name
          </label>
          <input
            type="text"
            className="addItemModal-input"
            placeholder="Name"
            id="username"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          <label htmlFor="image" className="addItemModal-label">
            Image
          </label>
          <input
            type="text"
            className="addItemModal-input"
            placeholder="Image URL"
            id="image"
            name="image"
            value={image}
            onChange={handleImageChange}
          />
          {imageError && <p className="addItemModal-error">{imageError}</p>}
          <fieldset className="addItemModal-fieldset">
            <legend className="addItemModal-legend">
              Select the weather type:
            </legend>

            <div className="addItemModal-selections">
              <input
                className="addItemModal-selection"
                type="radio"
                id="hot"
                name="weather"
                value="hot"
                checked={values.weather === "hot"}
                onChange={handleChange}
              />
              <label className="addItemModal-choice" htmlFor="hot">
                Hot
              </label>
            </div>

            <div className="addItemModal-selections">
              <input
                className="addItemModal-selection"
                type="radio"
                id="warm"
                name="weather"
                value="warm"
                onChange={handleChange}
                checked={values.weather === "warm"}
              />
              <label className="addItemModal-choice" htmlFor="warm">
                Warm
              </label>
            </div>

            <div className="addItemModal-selections">
              <input
                className="addItemModal-selection"
                type="radio"
                id="cold"
                name="weather"
                value="cold"
                onChange={handleChange}
                checked={values.weather === "cold"}
              />
              <label className="addItemModal-choice" htmlFor="cold">
                Cold
              </label>
            </div>
          </fieldset>
          <button type="submit" className="addItemModal-submit">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
