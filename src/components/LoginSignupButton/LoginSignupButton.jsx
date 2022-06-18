import React from "react";
import { Link } from "react-router-dom";
import "./LoginSignupButton.css";

const LoginSignupButton = () => {

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        style={{ width: "160px" }}
        id="login-dropdown"
        type="button"
        data-bs-toggle="dropdown"
      >
        Login/Signup
      </button>
      <ul
        className="dropdown-menu"
        aria-labelledby="login-dropdown"
        style={{ padding: "5px" }}
      >
        <li style={{ borderBottom: "1px solid grey" }}>
          <Link to="/login" className="dropdown-item">
            SIGN IN
          </Link>
        </li>
        <li style={{ borderBottom: "1px solid grey" }}>
          <Link to="/register" className="dropdown-item">
            SIGN UP
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LoginSignupButton;
