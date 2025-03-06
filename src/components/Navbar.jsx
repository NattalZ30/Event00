import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="nav-box">
      <div className="nav-bar">
        <p className="title-box">
          <HashLink className="title" to={"/#"} smooth>
            Nattal&Co
          </HashLink>
        </p>

        <nav className={`nav-menu-1 ${dropdownVisible ? "show-dropdown" : ""}`}>
          <div className="about-us-item">
            <HashLink to={"/about-us#"} smooth>About Us</HashLink>
            <div className={`dropbox ${dropdownVisible ? "show-dropdown" : ""}`}>
              <div>
                Origin 
                <ul className="about-box-content">
                  <li>
                    <HashLink to={"/about-us#Who-We-Are"} smooth>
                      Who We Are
                    </HashLink>
                  </li>
                  <li>
                    <HashLink to={"/about-us#What-We-Do"} smooth>
                    What We Do
                    </HashLink>
                  </li>
                  <li>
                    <HashLink to={"/about-us#Our-Story"} smooth>
                      Our Story
                    </HashLink>
                  </li>
                </ul>
              </div>
              <div className="vert-line"></div>
              <div>
                Ethos
                <ul className="about-box-content">
                  <li>
                    <HashLink to={"/about-us"}>
                      Our Mission
                    </HashLink>
                  </li>
                  <li>
                    <Link className="values-dropbox" to={"/ethos"}>
                      Values
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="vert-line"></div>
              <div>
                Impact
                <ul className="about-box-content">
                  <li>
                    <Link className="our-mission-dropbox" to={"/our-story"}>
                      So Far 
                    </Link>
                  </li>
                  <li>
                    <Link className="ethos-dropbox" to={"/ethos"}>
                      Projects
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="vert-line"></div>
              <div>
                Support
                <ul className="about-box-content">
                  <li>
                    <Link className="our-mission-dropbox" to={"/our-story"}>
                      Outreach 
                    </Link>
                  </li>
                  <li>
                    <Link className="ethos-dropbox" to={"/ethos"}>
                      Roles
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="insights-item">
          <Link to={"/insights"}>Insights</Link>
            <div className={`dropbox ${dropdownVisible ? "show-dropdown" : ""}`}></div>
          </div>

          <div className="foundation-item">
            <Link className="foundation-nav-bar" to={"/foundation"}>
              Foundation
            </Link>
            <div className="dropbox"></div>
          </div>
        </nav>

        <nav className="nav-menu-2">
          <HashLink className="contact-item" to={"/login#"}>login</HashLink>
          <HashLink className="contact-item" to={"/sign-up#"}>sign up</HashLink>
        </nav>

        <button className="nav-toggle" onClick={toggleDropdown}>
          {dropdownVisible ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
