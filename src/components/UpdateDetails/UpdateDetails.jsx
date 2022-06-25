import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import InputBase from "../InputBase/InputBase";
import Alert from "../Alert/Alert";

const UpdateDetails = ({ show, handleHide, toggleToast }) => {
  const { authService } = useContext(UserContext);

  const [userLogins, setUserLogins] = useState({
    name: authService.name,
    email: authService.email,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setUserLogins({ ...userLogins, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = userLogins;
    if (name !== authService.name || email !== authService.email) {
      setLoading(true);
      authService
        .updateDetails(name, email)
        .then(() => {
          handleHide();
          toggleToast();
        })
        .catch(() => {
          setError("Error updating account. Please try again.");
        });
      setLoading(false);
    } else {
      setError("No changes found.");
    }
  };

  const { name, email } = userLogins;

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Dialog>
        <Modal.Body>
          {loading && <div>"Loading..."</div>}
          {error && <Alert message={error} type="my-alert-danger" />}
          <div
            className="badge bg-success text-wrap text-white py-3 fs-6 fw-bolder rounded-3"
            style={{ width: "100%", margin: "30px auto 50px" }}
          >
            BOOKSTAGRAM UPDATE DETAILS
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <InputBase
              label="enter new name"
              type="text"
              value={name}
              name="name"
              onChange={handleChange}
              minLength="5"
              maxLength="20"
            />
            <InputBase
              label="enter new email"
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
              minLength="5"
              maxLength="50"
            />
            <input
              type="submit"
              disabled={!name || !email}
              className="submit-button"
              value="update details"
            />
          </form>
          <div className="footer-text">
            <span onClick={handleHide}>Cancel</span>
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

export default UpdateDetails;
