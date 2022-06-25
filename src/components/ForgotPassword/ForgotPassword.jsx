import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../App";
import InputBase from "../InputBase/InputBase";
import Alert from "../Alert/Alert";
import { CLIENT_URL } from "../../constants";

const ForgotPassword = ({ show, handleHide, handleShow, toggleToast }) => {
  const { authService } = useContext(UserContext);

  const [email, setEmail] = useState("m.milmore2701@gmail.com");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const urlLink = CLIENT_URL + "/resetpassword/";
    authService
      .forgotPassword(email, urlLink)
      .then(() => {
        handleHide();
        toggleToast();
      })
      .catch(() => {
        setError("Sorry email entered not in the database.");
      });
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Dialog style={{ margin: "28px" }}>
        <Modal.Body>
          {loading && <div>"Loading..."</div>}
          {error && <Alert message={error} type="my-alert-danger" />}
          <div
            className="badge bg-success text-wrap text-white py-3 fs-6 fw-bolder rounded-3"
            style={{ width: "100%", margin: "30px auto 50px" }}
          >
            BOOKSTAGRAM FORGOT PASSWORD
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <InputBase
              label="Please enter your email"
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
              minLength="5"
              maxLength="50"
            />
            <input
              type="submit"
              disabled={!email}
              className="submit-button"
              value="send email"
            />
            <div style={{ textAlign: "center" }}>
              Check your email box for a message containing the link to reset
              your password
            </div>
          </form>
          <div className="footer-text">
            <span onClick={() => handleShow("loginModal")}>Cancel</span>
            <div style={{ cursor: "pointer", width: "380px" }}>
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

export default ForgotPassword;
