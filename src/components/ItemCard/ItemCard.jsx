import "./ItemCard.css";
import DefaultImageError from "../../images/image-error.svg"
import { useState } from "react";

function ItemCard({ data, onCardClick }) {
  const [imageError, setImageError] = useState(false);
  function handleOpenCard() {
    onCardClick(data);
  }
  return (
    <li className="card">
      <h2 className="card__title">{data.name}</h2>
      <img onError={()=>{
        setImageError(true)
      }}
        src={imageError ? DefaultImageError : data.imageUrl}
        alt={data.name}
        className="card__img"
        onClick={handleOpenCard}
      />
    </li>
  );
}

export default ItemCard;
