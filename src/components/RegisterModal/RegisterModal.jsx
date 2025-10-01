import React, { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Modal from "../Modal/Modal";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, handleRegister, handleLoginModal }) {
  const { resetForm, values, handleChange, isValid, formRef } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRegister(values, (user) => {
      setCurrentUser(user);
      setIsLoggedIn(true);
      handleClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Sign Up">
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="register__modal-inputs"
      >
        <label htmlFor="email" className="register__modal-label">
          Email
        </label>
        <input
          type="email"
          className="register__modal-input"
          placeholder="Email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="register__modal-label">
          Password
        </label>
        <input
          type="password"
          className="register__modal-input"
          placeholder="Password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="name" className="register__modal-label">
          Name
        </label>
        <input
          type="text"
          className="register__modal-input"
          placeholder="Name"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="avatar" className="register__modal-label">
          Avatar
        </label>
        <input
          type="text"
          className="register__modal-input"
          placeholder="Avatar"
          id="avatar"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          required
        />
        <div className="register__modal-btns">
          <button
            disabled={!isValid}
            type="submit"
            className="register__modal-signUp"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginModal}
            type="button"
            className="register__modal-logIn"
          >
            Log In
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default RegisterModal;