import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { NavContext } from "../context/navContext";

export default function Header() {
  const { navState, toggleNavState } = React.useContext(NavContext);
  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="logo-div">
            <div>
              <Link to="">
                <img src={logoImg} alt=" logo images" />
                <p>
                  Value <br />
                  industry
                </p>
              </Link>
            </div>

            <GiHamburgerMenu className="custom-icon" onClick={toggleNavState} />
          </div>
          <div className={`all-navInfos ${navState ? "" : "james"}`}>
            <FaTimes className="custom-icon" onClick={toggleNavState} />
            <div className="nav-links">
              <Link to="services">Services</Link>
              <Link>FAQ</Link>
              <Link>Shipping</Link>
              <Link>Contact</Link>
            </div>

            <div className="nav-btns">
              <Link>
                <button>Login</button>
              </Link>
              <Link>
                <button>Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
