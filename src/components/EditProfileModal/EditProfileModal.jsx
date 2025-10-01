import React, { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { editProfile } from "../../utils/api";
import { useForm } from "../../hooks/useForm";
import Modal from "../Modal/Modal";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { isValid, formRef, setValues, values, handleChange } = useForm({
    name: "",
    avatar: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    editProfile(values)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        onClose();
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (currentUser && isOpen) {
      setValues({
        name: currentUser.name,
        avatar: "",
      });
    }
  }, [currentUser, isOpen, setValues]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="editProfile__modal-inputs"
      >
        <label htmlFor="name" className="editProfile__modal-label">
          Name
        </label>
        <input
          type="text"
          className="editProfile__modal-input"
          placeholder="name"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="avatar" className="editProfile__modal-label">
          Avatar
        </label>
        <input
          type="text"
          className="editProfile__modal-input"
          placeholder="Avatar"
          id="avatar"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          required
        />
        <button
          disabled={!isValid}
          type="submit"
          className="editProfile__modal-save"
        >
          Save Changes!!
        </button>
      </form>
    </Modal>
  );
}

export default EditProfileModal;