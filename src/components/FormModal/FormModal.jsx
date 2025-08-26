import "./FormModal.css";

function FormModal({ children, isOpen, onClose, handleSubmit }) {
  return (
    <div className={`form__modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="form__modal-container">
        <h2 className="form__modal-title">New Garment</h2>
        <button
          type="button"
          className="form__modal-close"
          onClick={onClose}
        ></button>
        <form onSubmit={handleSubmit} className="form__modal-inputs">
          {children}
          <label htmlFor="username" className="form__modal-label">
            Name
          </label>
          <input
            type="text"
            className="form__modal-input"
            placeholder="Name"
            id="username"
          />
          <label htmlFor="image" className="form__modal-label">
            Image
          </label>
          <input
            type="text"
            className="form__modal-input"
            placeholder="Image URL"
            id="image"
          />

          <fieldset className="form__modal-fieldset">
            <legend className="form__modal-legend">
              Select the weather type:
            </legend>

            <div className="form__modal-selections">
              <input
                className="form__modal-selection"
                type="radio"
                id="hot"
                name="weatherType"
                value="hot"
                defaultChecked
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
                name="weatherType"
                value="warm"
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
                name="weatherType"
                value="cold"
              />
              <label className="form__modal-choice" htmlFor="cold">
                Cold
              </label>
            </div>
          </fieldset>
        </form>
        <button type="submit" className="form__modal-submit">
          Add garment
        </button>
      </div>
    </div>
  );
}

export default FormModal;
