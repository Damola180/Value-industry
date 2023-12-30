import imgCart from "../assets/cart.svg";
import searchbtn from "../assets/search-normal.svg";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div className="navCart">
      <div className="navCart-left">
        <button>Admin</button>
      </div>

      <div className="navCart-middle">
        <Link>Special offers</Link>
        <Link>Best Sellers</Link>
        <Link>New arrival</Link>
        <Link>Recommended</Link>
      </div>
      <div className="navCart-right">
        <img src={searchbtn} className="placeholder-image" />
        <input type="text" placeholder="What are you looking for" />

        <button>
          <img src={imgCart} alt="" />
        </button>
      </div>
    </div>
  );
}
