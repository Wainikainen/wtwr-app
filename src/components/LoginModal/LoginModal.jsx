import "./LoginModal.css";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { login, validateToken } from "../../utils/auth";

function LoginModal({ isOpen, onClose, handleRegister }) {
  const { resetForm, values, handleChange, isValid, formRef } = useForm({
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
    login(values)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          validateToken(data.token).then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            resetForm();
            handleClose();
          });
        }
      })
      .catch(console.error);
  };

  return (
    <div className={`login__modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="login__modal-container">
        <h2 className="login__modal-title">Log In</h2>
        <button
          type="button"
          className="login__modal-close"
          onClick={handleClose}
        ></button>
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className="login__modal-inputs"
        >
          <label htmlFor="username" className="login__modal-label">
            Email
          </label>
          <input
            type="email"
            className="login__modal-input"
            placeholder="Email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="image" className="login__modal-label">
            Password
          </label>
          <input
            type="password"
            className="login__modal-input"
            placeholder="Password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
          />
          <div className="login__modal-btns">
            <button
              disabled={!isValid}
              type="submit"
              className="login__modal-logIn"
            >
              Log in
            </button>
            <button
              onClick={handleRegister}
              type="button"
              className="login__modal-signUp"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
