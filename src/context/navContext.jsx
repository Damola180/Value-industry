import React from "react";

const NavContext = React.createContext();

export default function NavProvider({ children }) {
  const [navState, setNavState] = React.useState(true);

  const toggleNavState = () => {
    setNavState(!navState);
  };

  if (!navState) {
    document.body.classList.add("black-after");
  } else {
    document.body.classList.remove("black-after");
  }

  return (
    <NavContext.Provider value={{ navState, toggleNavState }}>
      {children}
    </NavContext.Provider>
  );
}

export { NavContext, NavProvider };
