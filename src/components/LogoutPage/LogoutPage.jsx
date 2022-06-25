import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../Alert/Alert";

const LogoutPage = ({ show, handleHide, toggleToast}) => {
  const { authService, appSetIsLoggedIn } = useContext(UserContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const logoutUser = () => {
    setError("");
    setLoading(true);
    authService
      .userLogout()
      .then(() => {
        handleHide();
        appSetIsLoggedIn(false);
        toggleToast();
      })
      .catch(() => {
        setError("Error logging out of the account. Please try again.");
      });
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={handleHide} centered onShow={logoutUser}>
      <Modal.Dialog>
        <Modal.Body>
          {loading && <div>"Logging out..."</div>}
          {error && <Alert message={error} type="my-alert-danger" />}
          <div
            className="badge bg-success text-wrap py-3 fs-6"
            style={{ width: "25rem", margin: "35px auto" }}
          >
            BOOKSTAGRAM LOGOUT
          </div>
          <div className="form">
            <input
              type="button"
              className="submit-button"
              value="log out"
              onClick={logoutUser}
            />
          </div>
          <div className="footer-text">
            <span onClick={handleHide}>Cancel</span>
            <div style={{ cursor: "pointer" }}>
              <u>Privacy Policy and Cookies</u>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <u>Terms of Sale and Use</u>
            </div>
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};

export default LogoutPage;
