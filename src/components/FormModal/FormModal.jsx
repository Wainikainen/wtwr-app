import { useState } from "react";
import Modal from "../Modal/Modal";
import { useForm } from "../../hooks/useForm";
import { validationImageUrl } from "../../utils/validation";

function AddItemModal({ isOpen, onClose, handleSubmit }) {
  const { values, handleChange, resetForm, isValid, formRef } = useForm({
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
    <Modal isOpen={isOpen} onClose={onClose} title="New Garment">
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="modal-inputs"
      >
        <label htmlFor="username" className="modal-label">
          Name
        </label>
        <input
          type="text"
          className="modal-input"
          placeholder="Name"
          id="username"
          value={values.name}
          name="name"
          onChange={handleChange}
          required
        />
        <label htmlFor="image" className="modal-label">
          Image
        </label>
        <input
          type="text"
          className="modal-input"
          placeholder="Image URL"
          id="image"
          name="image"
          value={image}
          onChange={handleImageChange}
          required
        />
        {imageError && <p className="modal-error">{imageError}</p>}
        <fieldset className="modal-fieldset">
          <legend className="modal-legend">
            Select the weather type:
          </legend>
          <div className="modal-selections">
            <input
              className="modal-selection"
              type="radio"
              id="hot"
              name="weather"
              value="hot"
              checked={values.weather === "hot"}
              onChange={handleChange}
              required
            />
            <label className="modal-choice" htmlFor="hot">
              Hot
            </label>
          </div>
          <div className="modal-selections">
            <input
              className="modal-selection"
              type="radio"
              id="warm"
              name="weather"
              value="warm"
              onChange={handleChange}
              checked={values.weather === "warm"}
              required
            />
            <label className="modal-choice" htmlFor="warm">
              Warm
            </label>
          </div>
          <div className="modal-selections">
            <input
              className="modal-selection"
              type="radio"
              id="cold"
              name="weather"
              value="cold"
              onChange={handleChange}
              checked={values.weather === "cold"}
              required
            />
            <label className="modal-choice" htmlFor="cold">
              Cold
            </label>
          </div>
        </fieldset>
        <button
          disabled={!isValid || imageError}
          type="submit"
          className="modal-submit"
        >
          Add garment
        </button>
      </form>
    </Modal>
  );
}

export default AddItemModal;
