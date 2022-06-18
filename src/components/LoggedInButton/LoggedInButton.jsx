import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./LoggedInButton.css";

const LoggedInButton = () => {
  const {
    authService: { name },
  } = useContext(UserContext);

  return (
    <div className="dropdown">
      <button
        className="btn btn-success dropdown-toggle"
        style={{ width: "160px" }}
        id="logout-dropdown"
        type="button"
        data-bs-toggle="dropdown"
      >
        <i className="bi bi-person-fill"></i>&nbsp;Hello, {name.split(" ")[0]}
      </button>
      <ul
        className="dropdown-menu"
        aria-labelledby="logout-dropdown"
        style={{ width: "100%" }}
      >
        <li style={{ borderBottom: "1px solid grey" }}>
          <Link to="/logout" className="dropdown-item">
            Log out
          </Link>
        </li>
        <li style={{ borderBottom: "1px solid grey" }}>
          <Link to="/updateDetails" className="dropdown-item">
            Update Details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LoggedInButton;
