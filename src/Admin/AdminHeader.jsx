import { Link } from "react-router-dom";
import logoImg from "../assets/logo.svg";

export default function AdminHeader() {
  return (
    <>
      <nav>
        <div className="Admin-nav-container">
          <div className="logo-div">
            <div>
              <Link to="/">
                <img src={logoImg} alt=" logo images" />
                <p>
                  Value <br />
                  industry
                </p>
              </Link>
            </div>
          </div>
          <div className="admin-head-txt">
            <p>Admin</p>
          </div>
        </div>
      </nav>
    </>
  );
}
