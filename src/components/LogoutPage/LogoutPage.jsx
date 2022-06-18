import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./LogoutPage.css";
import Alert from "../Alert/Alert";

const LogoutPage = () => {
  const { authService } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const logoutUser = (e) => {
		e.preventDefault();
    const { from } = location.state || { from: { pathname: "/" } };
    setLoading(true);
    authService
      .userLogout()
      .then(() => navigate(from, { replace: true }))
      .catch(() => {
        setError(true);
      });
    setLoading(false);
  };

  const errMsg = "Error logging out of the account. Please try again.";

  return (
    <div className="center-display">
      {loading ? <div>"Loading..."</div> : null}
      {error ? <Alert message={errMsg} type="my-alert-danger" /> : null}
      <div
        className="badge bg-success text-wrap py-3 fs-6"
        style={{ width: "30rem", margin: "35px auto" }}
      >
        BOOKSTAGRAM
      </div>
      <form className="form" onSubmit={logoutUser}>
        <input type="submit" className="submit-button" value="logout" />
      </form>
      <div className="footer-text">
        <Link to="/" className="span-cancel">
          Cancel
        </Link>
        <span className="span-policy">
          <u>Privacy Policy and Cookies</u>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <u>Terms of Sale and Use</u>
        </span>
      </div>
    </div>
  );
};

export default LogoutPage;
