import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { EYE_ICONS } from "../../constants";
import InputBase from "../InputBase/InputBase";
import Alert from "../Alert/Alert";
import { appEmitter } from "../MainPage/MainPage";

const INIT_STATE = {
  currentPassword: "",
  currentPasswordType: "password",
  currentEyeIcon: EYE_ICONS["SHOW"],
  newPassword: "",
  newPasswordType: "password",
  newEyeIcon: EYE_ICONS["SHOW"],
};

const UpdatePassword = ({ show, handleHide }) => {
  const { authService, appSetIsLoggedIn } = useContext(UserContext);

  const [passwords, setPasswords] = useState(INIT_STATE);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    !show && setError(false);
    !show && setPasswords(INIT_STATE);
  }, [show]);

  const handleChange = ({ target: { name, value } }) => {
    setPasswords({ ...passwords, [name]: value });
  };

  const handleEyeIcon = (passwordKind) => {
    let passObj = {};
    switch (passwordKind) {
      case "currentPassword":
        passObj = { pass: "currentPasswordType", eye: "currentEyeIcon" };
        break;
      case "newPassword":
        passObj = { pass: "newPasswordType", eye: "newEyeIcon" };
        break;
      default:
        passObj = {};
    }
    passwords[passObj.pass] === "text"
      ? setPasswords({
          ...passwords,
          [passObj.pass]: "password",
          [passObj.eye]: EYE_ICONS["SHOW"],
        })
      : setPasswords({
          ...passwords,
          [passObj.pass]: "text",
          [passObj.eye]: EYE_ICONS["HIDE"],
        });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword } = passwords;
    if (currentPassword !== newPassword) {
      setLoading(true);
      authService
        .updatePassword(currentPassword, newPassword)
        .then(() => {
          handleHide();
          appEmitter.emit("toast", "Password updated successfully.");
        })
        .catch((error) => {
          console.log(error.response.data.error);
          appEmitter.emit(
            "toast",
            "Unauthorized or expired token. Please sign in again."
          );
          appSetIsLoggedIn(false);
          setError("Error updating account. Please try again.");
        });
      setLoading(false);
    } else {
      setError("New password and current password are the same.");
    }
  };

  const {
    currentPassword,
    currentPasswordType,
    currentEyeIcon,
    newPassword,
    newPasswordType,
    newEyeIcon,
  } = passwords;

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Dialog>
        <Modal.Body>
          {loading ? <div>"Loading..."</div> : null}
          {error ? <Alert message={error} type="my-alert-danger" /> : null}
          <div
            className="badge bg-success text-wrap text-white py-3 fs-6 fw-bolder rounded-3"
            style={{ width: "100%", margin: "30px auto 50px" }}
          >
            BOOKSTAGRAM UPDATE PASSWORD
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <InputBase
              label="Current Password *"
              type={currentPasswordType}
              value={currentPassword}
              name="currentPassword"
              onChange={handleChange}
              minLength="6"
              maxLength="20"
              typeIs="password"
              eyeIcon={currentEyeIcon}
              handleEyeIcon={() => handleEyeIcon("currentPassword")}
            />
            <InputBase
              label="New Password *"
              type={newPasswordType}
              value={newPassword}
              name="newPassword"
              onChange={handleChange}
              minLength="6"
              maxLength="20"
              typeIs="password"
              eyeIcon={newEyeIcon}
              handleEyeIcon={() => handleEyeIcon("newPassword")}
            />
            <input
              type="submit"
              disabled={!currentPassword || !newPassword}
              className="submit-button"
              value="update password"
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

export default UpdatePassword;
