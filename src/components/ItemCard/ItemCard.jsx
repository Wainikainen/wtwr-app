import "./ItemCard.css";
import DefaultImageError from "../../images/image-error.svg";
import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ data, onCardClick, onCardLike }) {
  const [imageError, setImageError] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = currentUser
    ? data.likes.some((id) => id === currentUser._id)
    : false;
  const likeButtonClass = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  function handleOpenCard() {
    onCardClick(data);
  }

  function handleLike() {
    if (!currentUser) return;
    onCardLike(data);
  }

  return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__title">{data.name}</h2>
        <button className={likeButtonClass} onClick={handleLike}></button>

        <img
          onError={() => {
            setImageError(true);
          }}
          src={imageError ? DefaultImageError : data.imageUrl}
          alt={data.name}
          className="card__img"
          onClick={handleOpenCard}
        />
      </div>
    </li>
  );
}

export default ItemCard;
