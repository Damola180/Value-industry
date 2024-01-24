import React from "react";
import Boxfilters from "../components/Boxfilters";
import Cart from "../components/CartNav";
import { FiAlertCircle } from "react-icons/fi";
import Outline from "../assets/Outline.svg";
import { Link } from "react-router-dom";

import { useSearchParams } from "react-router-dom";
import { NavContext } from "../context/navContext";
export default function Home() {
  //  through context
  const {
    cartItems,
    setCartItems,
    eachProduct,
    loading,
    error,
    buttonState,
    setbuttonState,
  } = React.useContext(NavContext);

  // setting searchParams state
  let [searchParams, setSearchParams] = useSearchParams();

  // getting all the searchParams
  const filterValues = searchParams.getAll("filter");
  const priceFilterValues = searchParams.get("priceFilter");

  const deliveryFilterValues = searchParams.getAll("deliveryFilter");
  const typeFilter = searchParams.get("type");

  // search params filtering

  const lowercaseArray = filterValues.map((item) => item.toLowerCase());

  const displayedCharacters =
    filterValues.length === 0
      ? eachProduct
      : eachProduct.filter((item) =>
          lowercaseArray.includes(item.brand.toLowerCase())
        );

  // price filtering
  const priceDisplayedCharacters = priceFilterValues
    ? displayedCharacters.filter((item) => priceFilterValues <= item.price)
    : displayedCharacters;

  // deliveryOpt filtering
  const deliveryOptlowercaseArray = deliveryFilterValues.map((item) =>
    item.toLowerCase()
  );
  const deliveryOptDisplayedCharacters =
    deliveryFilterValues.length === 0
      ? priceDisplayedCharacters
      : priceDisplayedCharacters.filter((item) =>
          deliveryOptlowercaseArray.includes(item.deliveryOpt.toLowerCase())
        );

  // type character

  const characterElements = typeFilter
    ? deliveryOptDisplayedCharacters.filter((item) => {
        const pattern = new RegExp(typeFilter, "i");
        return pattern.test(item.brand) || pattern.test(item.productName);
      })
    : deliveryOptDisplayedCharacters;

  // add to cart function

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
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  }

  console.log(cartItems);

  // productElements
  const productElements = characterElements.map((eachProduct) => (
    <div key={eachProduct.id} className="each-products">
      <Link to={`${eachProduct.id}`}>
        <div className="Illustration">
          <button className="like-btn">
            <img src={Outline} alt="like-btn" />
          </button>

          <div className="tool-img">
            <img src={eachProduct.imgUrl} alt="each-tools img" />
          </div>
        </div>
      </Link>
      <div className="product-info">
        <h3>{eachProduct.brand.toUpperCase()}</h3>

        <div>
          <p>
            {eachProduct.productName.charAt(0).toUpperCase() +
              eachProduct.productName.slice(1).toLowerCase()}
          </p>

          <p>
            ${eachProduct.price} <sup>.00</sup>
          </p>
        </div>

        {buttonState[eachProduct.id] ? (
          <button
            style={{
              cursor: "pointer",
              color: "white",
              backgroundColor: "var(--neutral-13, #242526)",
            }}
            onClick={(event) =>
              handleAddToCart(eachProduct, event, eachProduct.id)
            }
          >
            remove from cart
          </button>
        ) : (
          <button
            style={{ cursor: "pointer" }}
            onClick={(event) =>
              handleAddToCart(eachProduct, event, eachProduct.id)
            }
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  ));

  return (
    <>
      <Cart />
      {loading && <p>Loading in a bit</p>}
      {error && (
        <div>
          <h1>Error</h1>
          {console.error()}
        </div>
      )}
      {!loading && !error && eachProduct.length === 0 && (
        <h3>
          <FiAlertCircle />
          check your network
        </h3>
      )}

      {!loading && !error && eachProduct.length > 0 && (
        <div className="home-id">
          <Boxfilters />

          {characterElements.length > 0 ? (
            <div className="All-products">{productElements}</div>
          ) : (
            <div
              className="All-products"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h2>no item match filter</h2>
            </div>
          )}
        </div>
      )}
    </>
  );
}
