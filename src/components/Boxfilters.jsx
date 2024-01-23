import React from "react";
import arrowUp from "../assets/arrow-up.svg";
import arrowDown from "../assets/arrow-down.svg";
import { CiFilter } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";

export default function Boxfilter() {
  let [searchParams, setSearchParams] = useSearchParams();
  // state for handleRange
  const [dropdowns, setDropdowns] = React.useState({
    dropdown1: false,
    dropdown2: false,
    dropdown3: false,
  });

  const brands = [
    "3M",
    "Alemite",
    "Kobalt",
    "Milwaukee",
    "Irwin Tools",
    "Wiss",
    "Moore & Wright",
    "Bosch",
    "Dewalt",
    "Bahco",
    "Craftsman",
    "Citec",
    "Stanley",

    // Add more brand names here as needed
  ];

  const toggleDropdown = (dropdown) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const [isActive, setIsActive] = React.useState(true);

  const toggleState = () => {
    setIsActive(!isActive);
  };

  // useEffect and function to check the user screen size
  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setIsActive(false);
    }
  };

  // useEffect and function to check the user screen size
  React.useEffect(() => {
    handleResize(); // Initial check on mount
  }, []);

  // eventListener for box filter view
  window.addEventListener("resize", handleResize);

  // handleCheck function for check filter
  function handleCheckboxClick(key, event, label) {
    const isChecked = event.target.checked;
    console.log(isChecked, label);

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      if (isChecked) {
        // If checkbox is checked, add the label to the parameters
        params.append(key, label);
      } else {
        // If checkbox is unchecked, get all values associated with the key
        const values = params.getAll(key);
        // Filter out the specific label to be removed
        const updatedValues = values.filter((value) => value !== label);

        // Delete the key from the parameters
        params.delete(key);

        // Append all updated values back to the parameters
        updatedValues.forEach((value) => {
          params.append(key, value);
        });
      }

      return params.toString(); // Return the updated parameters as a string
    });
  }

  //  handleCheckboxClickPrice function for check
  const handleRangeChange = (key, event) => {
    const value = event.target.value;

    if (value == 0) {
      setSearchParams((prevParams) => {
        prevParams.delete(key);

        return prevParams;
      });
    } else {
      setSearchParams((prevParams) => {
        prevParams.set(key, value);

        return prevParams;
      });
    }
  };

  // function to clearfilter
  function clearFilter(filter, priceFilter, deliveryFilter) {
    setSearchParams((prevParams) => {
      prevParams.delete(filter);
      prevParams.delete(priceFilter);
      prevParams.delete(deliveryFilter);
      prevParams.delete("type");
      return prevParams;
    });
  }

  // function to check method
  const filterValues = searchParams.getAll("filter");

  const deliveryFilterValues = searchParams.getAll("deliveryFilter");

  // use effect for price range

  // the whole boxfilter
  return (
    <div
      className="Boxfilters"
      style={
        isActive
          ? { border: "0px solid var(--neutral-2, #e9edf0)" }
          : {
              border: "1px solid var(--neutral-2, #e9edf0)",
            }
      }
    >
      {isActive ? (
        <div onClick={toggleState} className="mobile-filterBtn">
          <CiFilter />
          <span>Filter</span>
        </div>
      ) : (
        <>
          <div className="head-div">
            <h1>Filter By </h1>
          </div>

          <div className="Boxes">
            <div className="single-box">
              <div className="form-label">
                <h4>Brands</h4>
                <div onClick={() => toggleDropdown("dropdown1")}>
                  {dropdowns.dropdown1 ? (
                    <img src={arrowUp} alt="arrow img" />
                  ) : (
                    <img src={arrowDown} alt="arrow img" />
                  )}
                </div>
              </div>
              <form className={dropdowns.dropdown1 ? "show-form" : "each-form"}>
                {brands.map((brand) => (
                  <label key={brand}>
                    <input
                      type="checkbox"
                      checked={filterValues.includes(brand) ? true : false}
                      onChange={(event) =>
                        handleCheckboxClick("filter", event, brand)
                      }
                    />
                    {brand} <span>(49)</span>
                  </label>
                ))}
              </form>
            </div>
            {/* Price form */}
            <div className="single-box">
              <div className="form-label">
                <h4>Price</h4>
                <div onClick={() => toggleDropdown("dropdown2")}>
                  {dropdowns.dropdown2 ? (
                    <img src={arrowUp} alt="arrow img" />
                  ) : (
                    <img src={arrowDown} alt="arrow img" />
                  )}
                </div>
              </div>

              <form className={dropdowns.dropdown2 ? "show-form" : "each-form"}>
                <label style={{ marginBottom: "10px" }}>
                  greater/= ${searchParams.get("priceFilter")}
                </label>
                <input
                  style={{ width: "100%" }}
                  type="range"
                  id="points"
                  name="points"
                  min="0"
                  max="500"
                  value={
                    searchParams.get("priceFilter")
                      ? searchParams.get("priceFilter")
                      : 0
                  }
                  onChange={(event) => handleRangeChange("priceFilter", event)}
                />
              </form>
            </div>
            {/* Delivery options */}
            <div className="single-box">
              <div className="form-label">
                <h4>Delivery options</h4>
                <div onClick={() => toggleDropdown("dropdown3")}>
                  {dropdowns.dropdown3 ? (
                    <img src={arrowUp} alt="arrow img" />
                  ) : (
                    <img src={arrowDown} alt="arrow img" />
                  )}
                </div>
              </div>
              <form className={dropdowns.dropdown3 ? "show-form" : "each-form"}>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      deliveryFilterValues.includes("At your Doorstep")
                        ? true
                        : false
                    }
                    onChange={(event) =>
                      handleCheckboxClick(
                        "deliveryFilter",
                        event,
                        "At your Doorstep"
                      )
                    }
                  />
                  At your Doorstep
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      deliveryFilterValues.includes("Pick Up Station")
                        ? true
                        : false
                    }
                    onChange={(event) =>
                      handleCheckboxClick(
                        "deliveryFilter",
                        event,
                        "Pick Up Station"
                      )
                    }
                  />
                  Pick Up Station
                </label>
              </form>
            </div>
          </div>
          <div className="filter-rlt">
            <a
              onClick={() =>
                clearFilter("filter", "priceFilter", "deliveryFilter")
              }
            >
              clear filter
            </a>

            <a onClick={() => setIsActive(true)}>View</a>
          </div>
        </>
      )}
    </div>
  );
}
