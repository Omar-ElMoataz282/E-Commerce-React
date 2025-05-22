import { Link } from "react-router-dom";
import "./403.css";

function Err403({ role }) {
  return (
    <div className="text-wrapper">
      <div className="err-title" data-content={404}>
        403 - ACCESS DENIED
      </div>
      <div className="err-subtitle">
        Oops, You don't have permission to access this page
      </div>
      <Link
        className="btn btn-primary mt-4"
        to={
          role === "1996"
            ? "/dashboard/writers"
            : role === "1999"
            ? "/dashboard/categories"
            : "/"
        }
      >
        {role === "1996"
          ? "Writers Page"
          : role === "1999"
          ? "Categories Page"
          : "Home Page"}
      </Link>
    </div>
  );
}

export default Err403;
