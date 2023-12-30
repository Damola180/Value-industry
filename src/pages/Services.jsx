import React from "react";
import { NavContext } from "../context/navContext";

export default function Services() {
  const { toggleNavState } = React.useContext(NavContext);
  // i need this useEffect because of the navbar, which i want to close
  React.useEffect(() => {
    console.log("Component mounted");
    toggleNavState();

    return () => {
      console.log("Component unmounted or updated");
    };
  }, []);
  return <h1>services here i come</h1>;
}
