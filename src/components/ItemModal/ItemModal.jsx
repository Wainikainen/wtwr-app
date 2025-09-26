import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ card, isOpen, onClose, handleDeleteModal }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isTheOwner = card.owner === currentUser?._id;

  return (
    <div className={`item__modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="item__modal-container">
        <button
          type="button"
          className="item__modal-close"
          onClick={onClose}
        ></button>
        <img src={card.imageUrl} alt={card.name} className="item__modal-img" />
        <div className="item__modal-footer">
          <h2 className="item__modal-title">{card.name}</h2>
          <p className="item__modal-text">Weather: {card.weather}</p>
          {isTheOwner && (
            <button
              className="item__modal-delete"
              type="button"
              onClick={() => handleDeleteModal(card)}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
