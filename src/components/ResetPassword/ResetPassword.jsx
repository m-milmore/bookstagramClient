import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { EYE_ICONS } from "../../constants";
import InputBase from "../InputBase/InputBase";
import Alert from "../Alert/Alert";

const ResetPassword = () => {
  const { authService } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useParams();

  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
    passwordType: "password",
    eyeIcon: EYE_ICONS["SHOW"],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setPasswordInfo({ ...passwordInfo, [name]: value });
  };

  const handleEyeIcon = () => {
    const { passwordType } = passwordInfo;
    passwordType === "text"
      ? setPasswordInfo({
          ...passwordInfo,
          passwordType: "password",
          eyeIcon: EYE_ICONS["SHOW"],
        })
      : setPasswordInfo({
          ...passwordInfo,
          passwordType: "text",
          eyeIcon: EYE_ICONS["HIDE"],
        });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password } = passwordInfo;
    setLoading(true);
    const { from } = location.state || { from: { pathname: "/" } };
    authService
      .resetPassword(password, token)
      .then(() => navigate(from, { replace: true }))
      .catch(() => {
        setError("Error resetting password. Please try again.");
      });
    setLoading(false);
  };

  const { password, passwordType, eyeIcon } = passwordInfo;

  return (
    <div className="center-display">
      {loading ? <div>"Loading..."</div> : null}
      {error ? <Alert message={error} type="my-alert-danger" /> : null}
      <div
        className="badge bg-success text-wrap text-white py-3 fs-6 fw-bolder rounded-3"
        style={{ width: "30rem", margin: "35px auto" }}
      >
        BOOKSTAGRAM RESET PASSWORD
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <InputBase
          label="New Password"
          type={passwordType}
          value={password}
          name="password"
          onChange={handleChange}
          minLength="6"
          maxLength="20"
          typeIs="password"
          eyeIcon={eyeIcon}
          handleEyeIcon={handleEyeIcon}
        />
        <input
          type="submit"
          disabled={!password}
          className="submit-button"
          value="reset password"
        />
      </form>
      <div className="footer-text">
        <Link to="/" className="span-cancel">
          Cancel
        </Link>
        <div style={{ cursor: "pointer", width: "380px" }}>
          <u>Privacy Policy and Cookies</u>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <u>Terms of Sale and Use</u>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
