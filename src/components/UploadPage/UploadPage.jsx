import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../App";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import InputBase from "../InputBase/InputBase";
import Alert from "../Alert/Alert";
import "./UploadPage.css";
import { progressEmitter } from "../../awsService";
import { appEmitter } from "../MainPage/MainPage";
import { MAX_FILE_SIZE } from "../../constants";

const UploadPage = ({ show, handleClose }) => {
  const { bookService, awsService, appSetIsLoggedIn, authService } =
    useContext(UserContext);

  const [uploadInfo, setUploadInfo] = useState({
    title: "",
    filename: "",
    files: [],
  });

  const [progress, setProgress] = useState(0);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputFileRef = useRef(null);

  useEffect(() => {
    const onProgress = (eventData) => {
      setProgress(
        parseInt(Math.round((eventData.loaded * 100) / eventData.total))
      );
    };

    const listener = progressEmitter.addListener("progress", onProgress);

    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    if (!show) {
      setError("");
      setUploadInfo({ title: "On Managing Yourself", filename: "", files: [] });
      setProgress(0);
    }
  }, [show]);

  const handleChange = ({ target: { name, value } }) => {
    setUploadInfo({ ...uploadInfo, [name]: value });
  };

  const handleFocus = () => {
    setError("");
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

  const handleClickRegion = () => {
    inputFileRef.current.click();
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
    console.log(files)
    setError("");
    if (
      bookService.books.find(
        (o) => o.title.toLowerCase() === title.toLowerCase()
      )
    ) {
      setError(`The title "${title}" already exists in the DB`);
    } else if (!files[0].type.startsWith("image")) {
      setError("Please upload an image file.");
    } else if (files[0].size > MAX_FILE_SIZE) {
      setError(
        `Please upload an image less than ${MAX_FILE_SIZE / 1024 / 1024} MB.`
      );
    } else {
      console.log("Continue with the rest...");
      // setLoading(true);
      // authService
      //   .findUserByEmail()
      //   .then(() => {
      //     bookService
      //       .checkMimeType(files)
      //       .then(() => {
      //         awsService
      //           .addPhoto(files)
      //           .then((data) => {
      //             bookService
      //               .uploadBook(title, data)
      //               .then(() => {
      //                 setProgress(0);
      //                 handleClose();
      //                 appEmitter.emit(
      //                   "toast",
      //                   "Book info successfully uploaded."
      //                 );
      //                 bookService
      //                   .getAllBooks()
      //                   .then(() => {
      //                     appEmitter.emit("newBookUpdate", "newBookUpdate");
      //                   })
      //                   .catch((error) => {
      //                     setError("Error loading images.");
      //                   });
      //               })
      //               .catch((error) => {
      //                 console.log(error.response.data.error);
      //                 setError(
      //                   "Error uploading book info to the server. Please try again."
      //                 );
      //               });
      //           })
      //           .catch((error) => {
      //             console.error(error);
      //             setError(
      //               "Error uploading book info in s3. Please try again."
      //             );
      //           });
      //       })
      //       .catch((error) => {
      //         console.log("error");
      //         setError("Please upload an image file.");
      //       });
      //   })
      //   .catch((error) => {
      //     console.log(error.response.data.error);
      //     appEmitter.emit(
      //       "toast",
      //       "Unauthorized or expired token. Please sign in again."
      //     );
      //     appSetIsLoggedIn(false);
      //     setError(
      //       "Error uploading book info to the server. Please try again."
      //     );
      //   });
      // setLoading(false);
    }
  };

  const { title, filename } = uploadInfo;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Dialog className="px-3">
        <Modal.Body>
          {loading ? <div>"Loading..."</div> : null}
          {error && <Alert message={error} type="my-alert-danger" />}
          <div
            className="badge bg-success text-wrap text-white py-3 fs-6 fw-bolder rounded-3"
            style={{ width: "100%", margin: "20px auto" }}
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
              maxLength="50"
              onFocus={handleFocus}
            />
            <div
              id="drop-region-container"
              className={`drop-region-container mx-auto ${
                (drag || filename) && "highlight"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleClickRegion}
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
                  <h2>Drop image here or click to upload</h2>
                )}
                <input
                  id="file-input"
                  type="file"
                  multiple
                  onChange={handleInputByClick}
                  accept="image/*"
                  ref={inputFileRef}
                />
              </div>
            </div>
            <p className="mx-auto">
              <strong>Uploading Progress</strong>
            </p>
            <div className="progress-bar-percentage-container">
              <div className="progress mx-auto">
                <div
                  id="progress-bar"
                  className="progress-bar progress-bar-striped bg-info"
                  role="progressbar"
                  aria-valuenow="40"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className={`percentage ${progress === 0 && "zero"}`}>
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

UploadPage.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};

UploadPage.defaultProps = {
  show: false,
  handleClose: () => {},
};

export default UploadPage;
