import React from "react";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { appEmitter } from "../MainPage/MainPage";

const ConfirmationToast = ({ show, onClose, toastMsg }) => {
  // const [toastMsg, setToastMsg] = useState("");

  // useEffect(() => {
  //   const onToastMsg = (msg) => {
  //     setToastMsg(msg);
  //   };

  //   const listener = appEmitter.addListener("toast", onToastMsg);

  //   return () => {
  //     listener.remove();
  //   };
  // }, []);

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
