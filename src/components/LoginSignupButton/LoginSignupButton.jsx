import React, { useState } from "react";
import "./LoginSignupButton.css"; // for menu background
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import mapValues from "lodash/mapValues";

const LoginSignupButton = ({ toggleToast }) => {
  const [modalManager, setModalManager] = useState({
    loginModal: false,
    registerModal: false,
    forgotModal: false,
  });

  const handleShow = (modal) => {
    setModalManager({
      ...mapValues(modalManager, () => false),
      [modal]: true,
    });
  };

  const handleHide = () => {
    setModalManager({
      ...mapValues(modalManager, () => false),
    });
  };

  const { loginModal, registerModal, forgotModal } = modalManager;

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle rounded"
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
            <span
              onClick={() => handleShow("loginModal")}
              className="dropdown-item"
            >
              SIGN IN
            </span>
          </li>
          <li style={{ borderBottom: "1px solid grey" }}>
            <span
              onClick={() => handleShow("registerModal")}
              className="dropdown-item"
            >
              SIGN UP
            </span>
          </li>
        </ul>
      </div>
      <LoginPage
        show={loginModal}
        handleHide={handleHide}
        handleShow={handleShow}
      />
      <RegisterPage
        show={registerModal}
        handleHide={handleHide}
        handleShow={handleShow}
      />
      <ForgotPassword
        show={forgotModal}
        handleHide={handleHide}
        handleShow={handleShow}
        toggleToast={toggleToast}
      />
    </>
  );
};

export default LoginSignupButton;
