import { Link } from "react-router-dom";
import SuccessImg from "../assets/check.png";
import logoImg from "../assets/logo.svg";

export default function success() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "70vh",
        gap: "10px",
      }}
    >
      <img src={SuccessImg} style={{ height: "350px", width: "auto" }} alt="" />
      <div>
        <p style={{ marginBottom: "10px" }}>Thank you</p>
        <p style={{ marginBottom: "10px" }}>
          <img src={logoImg} alt="logothanks" />
          Value industries
        </p>
        <h1> Order successful</h1>
      </div>

      <Link to="/" className="link-button">
        Return to Home
      </Link>
    </div>
  );
}
