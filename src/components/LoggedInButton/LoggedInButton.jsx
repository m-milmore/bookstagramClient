import React, { useState } from "react";
import PropTypes from "prop-types";
import "./LoggedInButton.css";
import LogoutPage from "../LogoutPage/LogoutPage";
import UpdateDetails from "../UpdateDetails/UpdateDetails";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import mapValues from "lodash/mapValues";

const LoggedInButton = ({ name }) => {
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
  const fn = name.split(" ")[0];
  const fnShorten = fn.length > 9 ? fn.slice(0, 8) + "." : fn;

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
          <i className="bi bi-person-fill"></i>&nbsp;Hello, {fnShorten}
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
      />
      <UpdatePassword
        show={passwordModal}
        handleHide={handleHide}
      />
      <LogoutPage
        show={logoutModal}
        handleHide={handleHide}
      />
    </>
  );
};

LoggedInButton.propTypes = {
  name: PropTypes.string,
};

LoggedInButton.defaultProps = {
  name: "",
};

export default LoggedInButton;
