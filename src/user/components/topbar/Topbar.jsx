import React, { useState } from "react";
import "./topbar.css";
import Dropdown from "../dropdown/Dropdown";
import notifications from "../../asset/JsonData/notification.json";
import user_image from "../../asset/image/icon.png";
import user_menu from "../../asset/JsonData/user_menus.json";
import { auth } from "../../../firebase/firebase";
import { signOut } from "@firebase/auth";
import Alert from "@material-ui/lab/Alert";
import { Link, useNavigate } from "react-router-dom";

const Topbar = () => {
  let navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const user_name = localStorage.getItem("name");

  const curr_user = {
    display_name: user_name,
    image: user_image,
  };

  // Sleep Function
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const renderDeconnexion = () => {
    if (success !== "") {
      return (
        <div className="topbar-middle">
          <Alert severity="info">Déconnexion réussie</Alert>
        </div>
      );
    }
  };

  const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  );

  const renderUserToggle = (user) => (
    <div className="topbar_right-user">
      <div className="topbar_right-user_image">
        <img src={user.image} alt="" />
      </div>
      <div className="topbar_right-user_name">{user.display_name}</div>
    </div>
  );

  const handleClick = async (event) => {
    const text = event.target.textContent;
    if (text === "Profile") {
      console.log("Profile");
    } else if (text === "Déconnexion") {
      setSuccess("Success");
      await sleep(3000);
      setSuccess("");
      Logout();
    }
  };

  const renderUserMenu = (item, index) => {
    console.log(item.content);
    return (
      <div key={index}>
        <div className="notification-item" onClick={handleClick}>
          <i className={item.icon}></i>
          <span>{item.content}</span>
        </div>
      </div>
    );
  };

  const Logout = async () => {
    window.localStorage.removeItem("logged");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("uid");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("role");
    await signOut(auth);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="topbar">
      <div className="topbar_search">
      </div>
      {renderDeconnexion()}
      <div className="topbar_right">
        <div className="topbar_right-item">
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topbar_right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="1"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/quiz">Voir le Quiz</Link>}
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
