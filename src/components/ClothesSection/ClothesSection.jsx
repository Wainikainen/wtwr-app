import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ClothesSection = ({
  clothingItems,
  handleOpenItemModal,
  handleAddGarmentModal,
  onCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <section className="clothes-section">
      <div className="clothes-section__list">
        Your Items
        <button
          className="clothes-section__add"
          onClick={handleAddGarmentModal}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__card-list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default ClothesSection;
