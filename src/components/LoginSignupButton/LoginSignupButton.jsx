import React, { useState } from "react";
import "./LoginSignupButton.css"; // for menu background
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import mapValues from "lodash/mapValues";
import "bootstrap/dist/js/bootstrap.bundle"; // for bootstrap dropdown

const LoginSignupButton = () => {
  const [modalManager, setModalManager] = useState({
    loginModal: false,
    registerModal: false,
    forgotModal: false,
  });

  const handleShowModal = (modal) => {
    setModalManager({
      ...mapValues(modalManager, () => false),
      [modal]: true,
    });
  };

  const handleHideModal = () => {
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
          aria-expanded="false"
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
              onClick={() => handleShowModal("loginModal")}
              className="dropdown-item"
            >
              SIGN IN
            </span>
          </li>
          <li style={{ borderBottom: "1px solid grey" }}>
            <span
              onClick={() => handleShowModal("registerModal")}
              className="dropdown-item"
            >
              SIGN UP
            </span>
          </li>
        </ul>
      </div>
      <LoginPage
        show={loginModal}
        handleHide={handleHideModal}
        handleShow={handleShowModal}
      />
      <RegisterPage
        show={registerModal}
        handleHide={handleHideModal}
        handleShow={handleShowModal}
      />
      <ForgotPassword
        show={forgotModal}
        handleHide={handleHideModal}
        handleShow={handleShowModal}
      />
    </>
  );
};

export default LoginSignupButton;
