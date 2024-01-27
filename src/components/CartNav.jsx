import React from "react";
import imgCart from "../assets/cart.svg";
import searchbtn from "../assets/search-normal.svg";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { NavContext } from "../context/navContext";

export default function Cart() {
  const { cartItems } = React.useContext(NavContext);
  let [searchParams, setSearchParams] = useSearchParams();

  function handleChange(key, value) {
    setSearchParams((prevParams) => {
      prevParams.set(key, value);
      return prevParams;
    });
  }

  return (
    <div className="navCart">
      <div className="navCart-left">
        <Link to="/admin ">
          <button>Admin</button>
        </Link>
      </div>

      <div className="navCart-middle">
        <Link>Special offers</Link>
        <Link>Best Sellers</Link>
        <Link>New arrival</Link>
        <Link>Recommended</Link>
      </div>
      <div className="navCart-right">
        <img src={searchbtn} className="placeholder-image" />

        <input
          onChange={(event) => handleChange("type", event.target.value)}
          type="text"
          placeholder="What are you looking for"
          value={searchParams.get("type") ? searchParams.get("type") : ""}
        />
        <Link
          style={{
            textDecoration: "none",
          }}
          to="pgCart"
        >
          <button>
            <img src={imgCart} alt="" />
          </button>

          {cartItems.length === 0 ? (
            ""
          ) : (
            <div className="cartNav-indicator"> {cartItems.length}</div>
          )}
        </Link>
      </div>
    </div>
  );
}
