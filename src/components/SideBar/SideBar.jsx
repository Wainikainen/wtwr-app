import React from "react";
import "./SideBar.css";
import userLogo from "../../images/avatar.svg";

const SideBar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <p className="sidebar__user">Terrance</p>
        <img src={userLogo} alt="USER IMAGE" className="sidebar__user-img" />
      </div>
    </aside>
  );
};

export default SideBar;
