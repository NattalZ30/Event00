import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";

function Navbar({username, isLoggedIn}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="nav-box">
      <div className="nav-bar">
        <p className="title-box">
          <HashLink className="title" to={"/#"} smooth>
            UNTITLED
          </HashLink>
        </p>

        <nav className={`nav-menu-1 ${dropdownVisible ? "show-dropdown" : ""}`}>

          <div className="insights-item">
          <HashLink to={"/find-my-tickets#"}>Find My Tickets</HashLink>
          </div>

          <div className="foundation-item">
            <HashLink className="foundation-nav-bar" to={isLoggedIn? "/create-event#":"/login#"}>
              Create Event
            </HashLink>
          </div>

          {isLoggedIn ? <div className="foundation-item"><HashLink to={"/my-account"}>My Account</HashLink></div>:<><div className="login-item-1">
            {dropdownVisible ? <HashLink to={"/login#"}>Login</HashLink>: null}
          </div>
          <div className="sign-up-item-1">
            {dropdownVisible ? <HashLink to={"/sign-up#"}>Sign up</HashLink>: null}
          </div></>}
        </nav>

        {isLoggedIn ? username :<nav className="nav-menu-2">
          Staff:
          <HashLink className="login-item" to={"/login#"}>Login</HashLink>
          <HashLink className="sign-up-item" to={"/sign-up#"}>Sign up</HashLink>
        </nav>}

        <button className="nav-toggle" onClick={toggleDropdown}>
          {dropdownVisible ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
