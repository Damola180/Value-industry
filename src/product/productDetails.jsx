import React from "react";
import { useParams } from "react-router-dom";
import { MdDeliveryDining } from "react-icons/md";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { FaOpencart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [infoProductPg, setInfoProductPg] = React.useState(null);
  const params = useParams();

  const docRef = doc(db, "Value-Products", `${params.id}`);

  // use navigate react router
  const navigate = useNavigate();

  // calling a single document from firebase
  const getASingleDoc = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
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

        setInfoProductPg(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  console.log(infoProductPg);
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
              <button>
                <FaOpencart /> Add to Cart
              </button>
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
