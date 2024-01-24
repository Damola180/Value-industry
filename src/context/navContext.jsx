import React from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../config/firebase";

const NavContext = React.createContext();

export default function NavProvider({ children }) {
  // state homepg
  const [eachProduct, seteachProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState(null);

  const [navState, setNavState] = React.useState(true);
  const [cartItems, setCartItems] = React.useState([]);
  const [buttonState, setbuttonState] = React.useState({});

  // Use useEffect to update local storage whenever myData changes

  // retireve cart from storage

  const stringifycartItemsFromStorage = localStorage.getItem("cartItems");
  const stringifybuttonStateFromStorage = localStorage.getItem("buttonState");
  const cartItemsGained = JSON.parse(stringifycartItemsFromStorage);

  const buttonStateGained = JSON.parse(stringifybuttonStateFromStorage);

  React.useEffect(() => {
    const stringifycartItems = JSON.stringify(cartItems);
    localStorage.setItem("cartItems", stringifycartItems);

    const stringifyButtonState = JSON.stringify(buttonState);
    localStorage.setItem("buttonState", stringifyButtonState);
  }, [cartItems, buttonState]);

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
        setCartItems(cartItemsGained);
        setbuttonState(buttonStateGained);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, []);

  // toogle mobile and desktop

  const toggleNavState = () => {
    setNavState(!navState);
  };

  if (!navState) {
    document.body.classList.add("black-after");
  } else {
    document.body.classList.remove("black-after");
  }

  return (
    <NavContext.Provider
      value={{
        navState,
        toggleNavState,
        cartItems,
        setCartItems,
        eachProduct,
        loading,
        error,
        buttonState,
        setbuttonState,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export { NavContext, NavProvider };
