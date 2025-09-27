import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  clothingItems,
  handleOpenItemModal,
  handleAddGarmentModal,
  handleEditProfileModal,
  handleSignOut,
}) => {
  return (
    <main className="profile">
      <SideBar
        handleEditProfileModal={handleEditProfileModal}
        handleSignOut={handleSignOut}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
        handleAddGarmentModal={handleAddGarmentModal}
      />
    </main>
  );
};

export default Profile;
