import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../App";
import { EYE_ICONS } from "../../constants";
import InputBase from "../InputBase/InputBase";
import Alert from "../Alert/Alert";
import "./LoginPage.css"; // for submit button

const LoginPage = ({ show, handleHide, handleShow }) => {
  const { authService, appSetIsLoggedIn } = useContext(UserContext);

  const [userLogins, setUserLogins] = useState({
    email: "l@l.com",
    password: "111111",
  });

  const [passwordInfo, setPasswordInfo] = useState({
    passwordType: "password",
    eyeIcon: EYE_ICONS["SHOW"],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setUserLogins({ ...userLogins, [name]: value });
  };

  const handleEyeIcon = () => {
    passwordInfo.passwordType === "text"
      ? setPasswordInfo({
          passwordType: "password",
          eyeIcon: EYE_ICONS["SHOW"],
        })
      : setPasswordInfo({
          passwordType: "text",
          eyeIcon: EYE_ICONS["HIDE"],
        });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userLogins;
    setLoading(true);
    authService
      .loginUser(email, password)
      .then(() => {
        handleHide();
        setTimeout(() => {
          appSetIsLoggedIn(true);
        }, 100);
      })
      .catch(() => {
        setError("Sorry, you entered an incorrect email or password.");
      });
    setLoading(false);
  };

  const { email, password } = userLogins;
  const { passwordType, eyeIcon } = passwordInfo;

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Dialog>
        <Modal.Body>
          {loading && <div>"Loading..."</div>}
          {error && <Alert message={error} type="my-alert-danger" />}
          <div
            className="badge bg-success text-wrap text-white py-3 fs-6 fw-bolder rounded-3"
            style={{ width: "100%", margin: "30px auto 50px" }}
          >
            BOOKSTAGRAM LOGIN
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <InputBase
              label="E-Mail"
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
              minLength="5"
              maxLength="50"
            />
            <InputBase
              label="Password"
              type={passwordType}
              value={password}
              name="password"
              onChange={handleChange}
              minLength="6"
              maxLength="20"
              typeIs="password"
              eyeIcon={eyeIcon}
              handleEyeIcon={handleEyeIcon}
            />
            <input
              type="submit"
              disabled={!email || !password}
              className="submit-button"
              value="sign in"
            />
          </form>
          <div className="footer-text">
            <span onClick={() => handleShow("forgotModal")}>
              Forgot password?
            </span>
            <div>
              No Account? Create one{" "}
              <span onClick={() => handleShow("registerModal")}>HERE</span>
            </div>
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

export default LoginPage;
