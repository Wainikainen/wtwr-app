import React from "react";
import "./DeleteModal.css";

const DeleteModal = ({ isOpen, onClose, handleDelete }) => {
  return (
    <div
      className={`deleteModal ${isOpen ? "modal_is-opened" : ""}`}
      id="delete-modal"
    >
      <div className="deleteModal__container">
        <button
          type="button"
          className="deleteModal__close"
          onClick={onClose}
        ></button>
        <h3 className="deleteModal__title">
          Are you sure you want to delete this image?
        </h3>
        <div className="deleteModal__form" id="delete-form">
          <button
            className="deleteModal__save"
            type="submit"
            onClick={handleDelete}
          >
            Yes, delete item!
          </button>
          <button
            className="deleteModal__cancel"
            type="button"
            id="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
