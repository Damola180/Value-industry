import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <TbError404 size={350} style={{}} />
      <h2>Sorry, the page you were looking for was not found.</h2>
      <Link to="/" className="link-button">
        Return to Home
      </Link>
    </div>
  );
}
