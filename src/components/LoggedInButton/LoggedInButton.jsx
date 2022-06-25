import React, { useState } from "react";
import "./LoggedInButton.css";
import LogoutPage from "../LogoutPage/LogoutPage";
import UpdateDetails from "../UpdateDetails/UpdateDetails";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import mapValues from "lodash/mapValues";

const LoggedInButton = ({ name, toggleToast }) => {
  const [modalManager, setModalManager] = useState({
    logoutModal: false,
    detailsModal: false,
    passwordModal: false,
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

  const { logoutModal, detailsModal, passwordModal } = modalManager;

  return (
    <>
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
            <span
              onClick={() => handleShow("detailsModal")}
              className="dropdown-item"
            >
              Update Details
            </span>
          </li>
          <li style={{ borderBottom: "1px solid grey" }}>
            <span
              onClick={() => handleShow("passwordModal")}
              className="dropdown-item"
            >
              Update Password
            </span>
          </li>
          <li style={{ borderBottom: "1px solid grey" }}>
            <span
              onClick={() => handleShow("logoutModal")}
              className="dropdown-item"
            >
              Log Out
            </span>
          </li>
        </ul>
      </div>
      <UpdateDetails
        show={detailsModal}
        handleHide={handleHide}
        toggleToast={toggleToast}
      />
      <UpdatePassword
        show={passwordModal}
        handleHide={handleHide}
        toggleToast={toggleToast}
      />
      <LogoutPage
        show={logoutModal}
        handleHide={handleHide}
        toggleToast={toggleToast}
      />
    </>
  );
};

export default LoggedInButton;
