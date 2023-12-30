import Boxfilters from "../components/Boxfilters";
import Cart from "../components/Cart";
import Outline from "../assets/Outline.svg";
import eachtool from "../assets/Level 1.png";
export default function Home() {
  return (
    <>
      <Cart />

      <div className="home-id">
        <Boxfilters />
        <div className="All-products">
          <div className="each-products">
            <div className="Illustration">
              <button className="like-btn">
                <img src={Outline} alt="like-btn" />
              </button>

              <div className="tool-img">
                <img src={eachtool} alt="each-tools img" />
              </div>
            </div>
            <div className="product-info">
              <h3>BOSCH</h3>
              <div>
                <p>Rotation Laser Level Kit</p>
                <p>
                  $954 <sup>.45</sup>
                </p>
              </div>

              <button>Add to Cart</button>
            </div>
          </div>

          {/* anotherproduct */}
          <div className="each-products">
            <div className="Illustration">
              <button className="like-btn">
                <img src={Outline} alt="like-btn" />
              </button>

              <div className="tool-img">
                <img src={eachtool} alt="each-tools img" />
              </div>
            </div>
            <div className="product-info">
              <h3>BOSCH</h3>
              <div>
                <p>Rotation Laser Level Kit</p>
                <p>
                  $954 <sup>.45</sup>
                </p>
              </div>

              <button>Add to Cart</button>
            </div>
          </div>
          <div className="each-products">
            <div className="Illustration">
              <button className="like-btn">
                <img src={Outline} alt="like-btn" />
              </button>

              <div className="tool-img">
                <img src={eachtool} alt="each-tools img" />
              </div>
            </div>
            <div className="product-info">
              <h3>BOSCH</h3>
              <div>
                <p>Rotation Laser Level Kit</p>
                <p>
                  $954 <sup>.45</sup>
                </p>
              </div>

              <button>Add to Cart</button>
            </div>
          </div>
          <div className="each-products">
            <div className="Illustration">
              <button className="like-btn">
                <img src={Outline} alt="like-btn" />
              </button>

              <div className="tool-img">
                <img src={eachtool} alt="each-tools img" />
              </div>
            </div>
            <div className="product-info">
              <h3>BOSCH</h3>
              <div>
                <p>Rotation Laser Level Kit</p>
                <p>
                  $954 <sup>.45</sup>
                </p>
              </div>

              <button>Add to Cart</button>
            </div>
          </div>
          <div className="each-products">
            <div className="Illustration">
              <button className="like-btn">
                <img src={Outline} alt="like-btn" />
              </button>

              <div className="tool-img">
                <img src={eachtool} alt="each-tools img" />
              </div>
            </div>
            <div className="product-info">
              <h3>BOSCH</h3>
              <div>
                <p>Rotation Laser Level Kit</p>
                <p>
                  $954 <sup>.45</sup>
                </p>
              </div>

              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
