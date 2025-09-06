import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  clothingItems,
  handleOpenItemModal,
  handleAddGarmentModal,
}) => {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
        handleAddGarmentModal={handleAddGarmentModal}
      />
    </main>
  );
};

export default Profile;
