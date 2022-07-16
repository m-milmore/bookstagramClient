import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../App";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../Alert/Alert";
import { appEmitter } from "../MainPage/MainPage";

const LogoutPage = ({ show, handleHide }) => {
  const { authService, appSetIsLoggedIn } = useContext(UserContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      !show && setError("");
    }, [show]);

  const logoutUser = () => {
    setError("");
    setLoading(true);
    authService
      .userLogout()
      .then(() => {
        handleHide();
        appEmitter.emit("toast", "You are now signed out.");
        appSetIsLoggedIn(false);
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

LogoutPage.propTypes = {
  show: PropTypes.bool,
  handleHide: PropTypes.func,
};

LogoutPage.defaultProps = {
  show: false,
  handleHide: () => {},
};

export default LogoutPage;
