import arrowUp from "../assets/arrow-up.svg";
import downBlue from "../assets/arrow-downblue.svg";
export default function Boxfilter() {
  return (
    <div className="Boxfilters">
      <div className="head-div">
        <h1>Filter By </h1>
      </div>
      <div className="Boxes">
        <div className="single-box">
          <label>
            <div>
              <h4>Brands</h4>
              <img src={arrowUp} alt="arrow img" />
            </div>
            <form>
              <label>
                <input type="checkbox" />
                3M <span>(49)</span>
              </label>
              <label>
                <input type="checkbox" />
                Alemite <span>(49)</span>
              </label>
              <label>
                <input type="checkbox" />
                Ambersil <span>(49)</span>
              </label>
              <label>
                <input type="checkbox" />
                Ansil <span>(49)</span>
              </label>
              <label>
                <input type="checkbox" />
                Bahco <span>(49)</span>
              </label>
              <label>
                <input type="checkbox" />
                Baltec <span>(49)</span>
              </label>
              <label>
                <input type="checkbox" />
                Bessey <span>(49)</span>
              </label>
              <label>
                <input type="checkbox" />
                Bisson <span>(49)</span>
              </label>
              <label>
                <input type="checkbox" />
                Bolle <span>(49)</span>
              </label>
              <label>
                <input type="checkbox" />
                Bosch <span>(49)</span>
              </label>
              <label>
                <input type="checkbox" />
                Brauler <span>(49)</span>
              </label>

              <span className="seeAll-span">
                See all <img src={downBlue} alt="downBlue" />
              </span>
            </form>
          </label>
        </div>

        {/* Price form */}
        <label>
          <div>
            <h4>Price</h4>
            <img src={arrowUp} alt="arrow img" />
          </div>
          <form></form>
        </label>

        {/* Delivery options */}

        <label>
          <div>
            <h4>Delivery options</h4>
            <img src={arrowUp} alt="arrow img" />
          </div>
          <form></form>
        </label>
      </div>
    </div>
  );
}
