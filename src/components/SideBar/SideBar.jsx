import { useContext, useEffect, useState } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ handleSignOut, handleEditProfileModal }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [currentUser]);

  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <p className="sidebar__user">{currentUser?.name}</p>
        {imageError ? (
          <div className="sidebar__img-error">
            <p className="sidebar__img-error-name">
              {currentUser?.name?.charAt(0)}
            </p>
          </div>
        ) : (
          <img
            onError={() => {
              setImageError(true);
            }}
            src={currentUser?.avatar}
            alt="USER IMAGE"
            className="sidebar__user-img"
          />
        )}
      </div>
      <div className="sidebar__btns">
        <button onClick={handleEditProfileModal} className="sidebar__edit">
          Edit profile
        </button>
        <button onClick={handleSignOut} className="sidebar__signOut">
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
