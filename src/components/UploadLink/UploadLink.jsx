import React, { useState } from "react";
import "./UploadLink.css";
import UploadPage from "../UploadPage/UploadPage";

const UploadLink = ({ toggleToast }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div>
        <i
          onClick={handleShow}
          className="fa-regular fa-cloud-arrow-up fa-3x"
        ></i>
      </div>
      <UploadPage
        show={show}
        handleClose={handleClose}
        toggleToast={toggleToast}
      />
    </>
  );
};

export default UploadLink;
