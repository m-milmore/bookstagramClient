import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../App";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import "./DetailPage.css";
import { appEmitter } from "../MainPage/MainPage";

const DetailPage = ({
  show,
  handleCloseDetail,
  book: { _id, title, photo, user: ownerId },
}) => {
  const { authService, bookService, appSetIsLoggedIn, awsService } =
    useContext(UserContext);
  const { id: currentUserId, role: currentUserRole } = authService;

  const [updateTitle, setUpdateTitle] = useState(title);
  const [showTitleInput, setShowTitleInput] = useState(false);

  useEffect(() => {
    if (!show) {
      setShowTitleInput(false);
      setUpdateTitle(title);
    }
  }, [show, title]);

  const handleChange = ({ target: { value } }) => {
    setUpdateTitle(value);
  };

  const handleTitle = () => {
    // handleClose();
    setShowTitleInput(!showTitleInput);
  };

  const handleDelete = () => {
    const response = window.confirm(
      "Are you sure you ant to delete this book?"
    );
    if (response) {
      authService
        .findUserByEmail()
        .then(() => {
          awsService
            .deleteBook(photo)
            .then(() => {
              bookService
                .deleteBook(_id)
                .then(() => {
                  appEmitter.emit("toast", "Book successfully deleted.");
                  bookService
                    .getAllBooks()
                    .then(() => {
                      appEmitter.emit("newBookUpdate", "newBookUpdate");
                    })
                    .catch((error) => {
                      appEmitter.emit("toast", "Error loading images.");
                    });
                })
                .catch((error) => {
                  appEmitter.emit(
                    "toast",
                    "Error deleting book on the server. Please sign in again."
                  );
                });
            })
            .catch((error) => {
              appEmitter.emit(
                "toast",
                "Error deleting book on aws s3. Please try again."
              );
            });
        })
        .catch((error) => {
          appEmitter.emit(
            "toast",
            "Unauthorized or expired token. Please sign in again."
          );
          appSetIsLoggedIn(false);
        });
      handleCloseDetail();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateTitle !== title) {
      authService
        .findUserByEmail()
        .then(() => {
          bookService
            .updateBook(_id, updateTitle)
            .then(() => {
              appEmitter.emit("toast", "Book info successfully updated.");
              bookService
                .getAllBooks()
                .then(() => {
                  appEmitter.emit("newBookUpdate", "newBookUpdate");
                })
                .catch((error) => {
                  appEmitter.emit("toast", "Error loading images.");
                });
            })
            .catch((error) => {
              appEmitter.emit(
                "toast",
                "Error updating book on the server. Please sign in again."
              );
            });
        })
        .catch((error) => {
          appEmitter.emit(
            "toast",
            "Unauthorized or expired token. Please sign in again."
          );
          appSetIsLoggedIn(false);
        });
    }
    handleCloseDetail();
  };

  return (
    <Modal show={show} onHide={handleCloseDetail} centered id={_id}>
      <Modal.Dialog className="px-3">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Book Details</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
              <div className="col-md-4 p-1">
                <img
                  src={photo}
                  className="img-fluid rounded-start"
                  alt="title"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body detail-page">
                  {ownerId === currentUserId || currentUserRole === "admin" ? (
                    showTitleInput ? (
                      <form
                        className="form"
                        onSubmit={handleSubmit}
                        style={{ paddingBottom: "5px" }}
                      >
                        <input
                          type="text"
                          value={updateTitle}
                          name="title"
                          onChange={handleChange}
                          minLength="1"
                          maxLength="50"
                        />
                        <Button
                          variant="success"
                          size="sm"
                          type="submit"
                          style={{ margin: "5px 50px" }}
                        >
                          <i className="bi bi-check2-square"></i> Submit
                        </Button>
                      </form>
                    ) : (
                      <OverlayTrigger
                        placement={"bottom"}
                        delay={{ show: 0, hide: 0 }}
                        overlay={<Tooltip>Click to edit</Tooltip>}
                      >
                        <h5
                          className="card-title card-title-highlight"
                          onClick={handleTitle}
                        >
                          {title}
                        </h5>
                      </OverlayTrigger>
                    )
                  ) : (
                    <h5 className="card-title">{title}</h5>
                  )}
                  <h6
                    className="card-text m-0 p-0 mt-2 text-dark"
                    style={{ fontWeight: "600" }}
                  >
                    {`ref: ${_id}`}
                  </h6>
                  <button
                    type="button"
                    className={`btn btn-primary ${
                      !(ownerId === currentUserId) &&
                      !(currentUserRole === "admin") &&
                      "not-owner"
                    }`}
                    onClick={handleDelete}
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};

DetailPage.propTypes = {
  show: PropTypes.bool,
  handleCloseDetail: PropTypes.func,
  book: PropTypes.object,
};

DetailPage.defaultProps = {
  show: false,
  handleCloseDetail: () => {},
  book: {},
};

export default DetailPage;
