import "./LoginModal.css";
import { useState, useContext } from "react";
import { validationImageUrl } from "../../utils/validation";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { login } from "../../utils/auth";

function LoginModal({ isOpen, onClose, handleSubmit }) {
  const {  resetForm, values, handleChange } = useForm({
        email: "",
        password: "",
  });

  const { setCurrentUser } = useContext(CurrentUserContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login(values).then(( data ) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setCurrentUser( data.user );  
         resetForm();
         onClose();
      }
    })
    .catch(console.error);
  };

  return (
    <div className={`form__modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="form__modal-container">
        <h2 className="form__modal-title">Log In</h2>
        <button
          type="button"
          className="form__modal-close"
          onClick={onClose}
        ></button>
        <form onSubmit={handleFormSubmit} className="form__modal-inputs">
          <label htmlFor="username" className="form__modal-label">
            Email
          </label>
          <input
            type="email"
            className="form__modal-input"
            placeholder="Email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <label htmlFor="image" className="form__modal-label">
            Password
          </label>
          <input
            type="password"
            className="form__modal-input"
            placeholder="Password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {imageError && <p className="form__modal-error">{imageError}</p>}
          <button type="submit" className="form__modal-submit">
            Login
          </button>
           <button type="button" className="form__modal-submit-signUp">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
