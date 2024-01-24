import React from "react";
import { NavContext } from "../context/navContext";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from "react-router-dom";

export default function pgCart() {
  const { cartItems, setCartItems, setbuttonState } =
    React.useContext(NavContext);

  console.log(cartItems);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Map through cartItems and add quantity property to each item
        const itemsWithQuantity = cartItems.map((item) => ({
          ...item,
        }));
        // Set the updated cartItems state
        await setCartItems(itemsWithQuantity);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // handleAdd to Cart
  function handleAddToCart(product, event, id) {
    setbuttonState((prev) => {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
    setCartItems((prevCartItems) => {
      // Check if the product with the same ID already exists
      const existingProductIndex = prevCartItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Product with the same ID already exists, remove it
        const updatedCartItems = [...prevCartItems];
        updatedCartItems.splice(existingProductIndex, 1);
        return updatedCartItems;
      } else {
        // Product doesn't exist, add it to the cart
        return [...prevCartItems, product];
      }
    });
  }

  // increase quantity function

  function increaseQuantity(params) {
    console.log(params);

    const quantityIncrease = cartItems.map((item) =>
      item.id === params.id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCartItems(quantityIncrease);
  }

  // decrease quantity function
  function decreaseQuantity(params) {
    console.log(params);

    const quantityIncrease = cartItems.map((item) =>
      item.id === params.id
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item
    );

    setCartItems(quantityIncrease);
  }

  // total price function
  const total = cartItems.reduce(
    (acc, cartItems) => acc + cartItems.price * cartItems.quantity,
    0
  );

  return cartItems.length === 0 ? (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h3 style={{ marginBottom: "10px" }}>No items in the cart</h3>
      <Link to="/" className="link-button">
        Return to Home
      </Link>
    </div>
  ) : (
    <div>
      <div className="pgCart">
        {cartItems.map((eachcartItems) => (
          <div className="each-pgCart" key={eachcartItems.id}>
            <img src={eachcartItems.imgUrl} alt="" />
            <h1>
              {eachcartItems.productName.charAt(0).toUpperCase() +
                eachcartItems.productName.slice(1).toLowerCase()}
            </h1>
            <p> $ {eachcartItems.price * eachcartItems.quantity}</p>
            <div className="pgCart-quantityDiv">
              <h3>Quantity:</h3>
              <div>
                {eachcartItems.quantity === 1 ? (
                  <FaChevronLeft
                    className="FaChevron"
                    style={{ opacity: "8.5%" }}
                  />
                ) : (
                  <FaChevronLeft
                    className="FaChevron"
                    onClick={() => decreaseQuantity(eachcartItems)}
                  />
                )}

                {eachcartItems.quantity}
                <FaChevronRight
                  className="FaChevron"
                  onClick={() => increaseQuantity(eachcartItems)}
                />
              </div>
            </div>
            <span
              onClick={(event) =>
                handleAddToCart(eachcartItems, event, eachcartItems.id)
              }
            >
              <MdOutlineDelete className="MdOutlineDelete" />
            </span>
          </div>
        ))}
      </div>
      <div className="pgCart-total">
        <h1>Total:</h1>
        <span>${total}</span>
      </div>
      <div className="pgCart-checkout">
        <button>
          <MdOutlineShoppingCartCheckout />
          CheckOut
        </button>
      </div>
    </div>
  );
}
