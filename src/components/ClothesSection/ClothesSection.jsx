import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({
  clothingItems,
  handleOpenItemModal,
  handleAddGarmentModal,
}) => {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default ClothesSection;
