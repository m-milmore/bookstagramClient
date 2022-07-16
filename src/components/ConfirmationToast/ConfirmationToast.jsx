import React from "react";
import PropTypes from "prop-types";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ConfirmationToast = ({ show, onClose, toastMsg }) => {
  return (
    <ToastContainer position="top-center" style={{ marginTop: "1rem" }}>
      <Toast show={show} onClose={onClose} delay={5000} autohide bg="warning">
        <Toast.Header>
          <i className="fa-solid fa-book fa-1x"></i>
          <strong className="me-auto">Bookstagram</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>{toastMsg}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

ConfirmationToast.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  toastMsg: PropTypes.string,
};

ConfirmationToast.defaultProps = {
  show: false,
  onClose: () => {},
  toastMsg: "",
};

export default ConfirmationToast;
