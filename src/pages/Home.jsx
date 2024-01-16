import React from "react";
import Boxfilters from "../components/Boxfilters";
import Cart from "../components/CartNav";
import { FiAlertCircle } from "react-icons/fi";
import Outline from "../assets/Outline.svg";
import { Link } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../config/firebase";
import { useSearchParams } from "react-router-dom";
export default function Home() {
  // setting searchParams state
  let [searchParams, setSearchParams] = useSearchParams();

  // getting all the searchParams
  const filterValues = searchParams.getAll("filter");
  const priceFilterValues = searchParams.get("priceFilter");

  const deliveryFilterValues = searchParams.getAll("deliveryFilter");
  const typeFilter = searchParams.get("type");

  // React state
  const [eachProduct, seteachProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState(null);
  // getting data from firebase
  const getProductData = async () => {
    const querySnapshot = await getDocs(collection(db, "Value-Products"));

    const arrData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return arrData;
  };

  // use effect to set eachProduct state from firebase(getProductData)
  React.useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const data = await getProductData();

        seteachProduct(data);
      } catch (err) {
        console.log(err);
        console.log("there is an error");
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, []);

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

          <button>Add to Cart</button>
        </div>
      </Link>
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
