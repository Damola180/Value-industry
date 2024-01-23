import React from "react";
import { useParams } from "react-router-dom";
import { MdDeliveryDining } from "react-icons/md";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { FaOpencart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavContext } from "../context/navContext";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { Link } from "react-router-dom";
const ProductDetails = () => {
  // through context

  const { setCartItems, buttonState, setbuttonState } =
    React.useContext(NavContext);
  const [infoProductPg, setInfoProductPg] = React.useState(null);
  const params = useParams();

  const docRef = doc(db, "Value-Products", `${params.id}`);

  // use navigate react router
  const navigate = useNavigate();

  // calling a single document from firebase
  const getASingleDoc = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case

      console.log("No such document!");

      navigate("*", { replace: true });
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`/api/vans/${params.id}`);
        const result = await getASingleDoc();

        setInfoProductPg({ ...result, id: params.id });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const infoId = params.id;

  // handleBuyNow
  function handleBuyNow(product, id) {
    if (buttonState[id]) {
      setbuttonState((prev) => {
        return {
          ...prev,
        };
      });
    } else {
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
          return [...prevCartItems];
        } else {
          // Product doesn't exist, add it to the cart
          return [...prevCartItems, product];
        }
      });
    }
  }

  // handleToCart
  function handleAddToCart(product, id) {
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
  return (
    <>
      {infoProductPg ? (
        <div className="product-detailsPg">
          <div className="product-detailsPgflex">
            <div className="product-detailsPg-imgDiv">
              <img src={infoProductPg.imgUrl} alt="productNameImg" />
            </div>
            <div className="product-detailsPg-info">
              <h2>
                {infoProductPg.productName.charAt(0).toUpperCase() +
                  infoProductPg.productName.slice(1).toLowerCase()}
              </h2>
              <div>
                <p>
                  Brand: <span>{infoProductPg.brand.toUpperCase()}</span>
                </p>
                <p className="product-detailsPg-para">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Impedit, et corrupti velit dolores vitae optio ab voluptas
                  sequi dicta ad! Lorem ipsum dolor, sit amet consectetur
                  adipisicing elit. Unde aperiam numquam officiis nemo,
                  voluptatem
                </p>
                <p>
                  $ <span>{infoProductPg.price}</span>
                </p>
                <div className="product-detailsPg-delivery">
                  <span>
                    <MdDeliveryDining
                      style={{ width: "35px", height: "35px" }}
                    />
                  </span>

                  <p>: {infoProductPg.deliveryOpt}</p>
                </div>
              </div>

              {/* Add more product details here */}
              {buttonState[infoId] ? (
                <button
                  style={{
                    cursor: "pointer",
                    color: "white",
                    backgroundColor: "var(--neutral-13, #242526)",
                  }}
                  onClick={() => handleAddToCart(infoProductPg, infoId)}
                >
                  Remove from cart
                </button>
              ) : (
                <button
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleAddToCart(infoProductPg, infoId)}
                >
                  <FaOpencart />
                  Add to Cart
                </button>
              )}

              <Link
                style={{ textDecoration: "none" }}
                to="/pgCart"
                onClick={() => handleBuyNow(infoProductPg, infoId)}
                replace
              >
                <button
                  style={{
                    cursor: "pointer",
                    color: "var(--neutral-13, #242526)",

                    display: "block",
                    border: "1px solid var(--neutral-5, #B9C3)",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <FaMoneyBill1Wave /> Buy now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading... product info</h2>
      )}
    </>
  );
};

export default ProductDetails;
