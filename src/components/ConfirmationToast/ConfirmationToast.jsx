import React, { useContext } from "react";
import { UserContext } from "../../App";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ConfirmationToast = ({ show, onClose }) => {
  const {
    authService: { isLoggedIn, email },
  } = useContext(UserContext);

  const toastMsg = isLoggedIn
    ? "Account updated."
    : email
    ? `Email send to ${email}`
    : "You are now signed out.";

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

export default ConfirmationToast;
