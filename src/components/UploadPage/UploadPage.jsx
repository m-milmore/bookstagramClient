import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import InputBase from "../InputBase/InputBase";
import Alert from "../Alert/Alert";
import "./UploadPage.css";

const UploadPage = ({ show, handleClose, toggleToast }) => {
  const { bookService, awsService } = useContext(UserContext);

  const [uploadInfo, setUploadInfo] = useState({
    title: "",
    filename: "",
    files: [],
  });

  const [progress, setProgress] = useState(0);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!show) {
      setError("");
      setUploadInfo({ title: "title", filename: "", files: [] });
    }
  }, [show]);

  const handleChange = ({ target: { name, value } }) => {
    setUploadInfo({ ...uploadInfo, [name]: value });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    const files = e.dataTransfer.files;
    setUploadInfo({
      ...uploadInfo,
      filename: files[0].name,
      files: Array.from(files),
    });
  };

  const handleInputByClick = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    setUploadInfo({
      ...uploadInfo,
      filename: files[0].name,
      files,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, files } = uploadInfo;
    setProgress(0);
    awsService
      .addPhoto(files)
      .then((data) => {
        console.log("in UploadPage, data", data);
        // bookService
        //   .uploadBook(title, data)
        //   .then(() => {
        //     handleClose();
        //     toggleToast();
        //     // call getAllBooks
        //   })
        //   .catch(() => {
        //     setError(
        //       "Error uploading book info into the server. Please try again."
        //     );
        //   });
      })
      .catch((error) => {
        console.error(error);
        setError("Error uploading book info in s3. Please try again.");
      });
    setProgress(0);
  };

  const { title, filename } = uploadInfo;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Dialog>
        <Modal.Body>
          {error && <Alert message={error} type="my-alert-danger" />}
          <div
            className="badge bg-success text-wrap text-white py-3 fs-6 fw-bolder rounded-3"
            style={{ width: "100%", margin: "30px auto 50px" }}
          >
            BOOKSTAGRAM UPLOAD BOOK IMAGE
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <InputBase
              label="enter title"
              type="text"
              value={title}
              name="title"
              onChange={handleChange}
              minLength="1"
              maxLength="20"
            />
            <div
              id="drop-region-container"
              className={`drop-region-container mx-auto ${
                (drag || filename) && "highlight"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div id="drop-region" className="drop-region text-center">
                <img
                  id="download-btn"
                  src="/Download.png"
                  width="80"
                  alt="download"
                />
                {filename ? (
                  <h2>Image to Upload : "{filename}"</h2>
                ) : (
                  <h2>Drag and Drop or Click to Upload an Image</h2>
                )}
                <input
                  id="file-input"
                  type="file"
                  multiple
                  onChange={handleInputByClick}
                />
              </div>
            </div>
            <p className="mx-auto">
              <strong>Uploading Progress</strong>
            </p>
            <div className="progress mx-auto">
              <div
                id="progress-bar"
                className="progress-bar progress-bar-striped bg-info"
                role="progressbar"
                aria-valuenow="40"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
            <input
              type="submit"
              disabled={!title || !filename}
              className="submit-button"
              value="upload book info"
            />
          </form>
          <div className="footer-text">
            <span onClick={handleClose}>Cancel</span>
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

export default UploadPage;
