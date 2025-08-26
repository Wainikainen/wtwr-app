import "./ItemModal.css";
import exitIcon from "../../images/delete.svg";

function ItemModal({ card, isOpen, onClose }) {
  return (
    <div className={`item__modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="item__modal-container">
        <button
          type="button"
          className="item__modal-close"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="item__modal-img" />
        <div className="item__modal-footer">
          <h2 className="item__modal-title">{card.name}</h2>
          <p className="item__modal-text">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
