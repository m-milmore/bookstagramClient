import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./RegisterPage.css";
import { EYE_ICONS } from "../../constants";
import InputBase from "../InputBase/InputBase";
import Alert from "../Alert/Alert";

const RegisterPage = () => {
  const { authService } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [userLogins, setUserLogins] = useState({
    name: "Bob Beeman",
    email: "b@b.com",
    password: "123456",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordInfo, setPasswordInfo] = useState({
    passwordError: "",
    passwordType: "password",
    eyeIcon: EYE_ICONS["SHOW"],
    confirmPassword: "123456",
    confirmPasswordError: "",
    confirmPasswordType: "password",
    confirmEyeIcon: EYE_ICONS["SHOW"],
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setUserLogins({ ...userLogins, [name]: value });
  };

  const handleConfirmChange = ({ target: { name, value } }) => {
    setPasswordInfo({ ...passwordInfo, [name]: value });
  };

  const handleEyeIcon = (passOrConfPass = "") => {
    const passObj =
      passOrConfPass === "password"
        ? { pass: "passwordType", eye: "eyeIcon" }
        : { pass: "confirmPasswordType", eye: "confirmEyeIcon" };
    passwordInfo[passObj.pass] === "text"
      ? setPasswordInfo({
          ...passwordInfo,
          [passObj.pass]: "password",
          [passObj.eye]: EYE_ICONS["SHOW"],
        })
      : setPasswordInfo({
          ...passwordInfo,
          [passObj.pass]: "text",
          [passObj.eye]: EYE_ICONS["HIDE"],
        });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordInfo({
      ...passwordInfo,
      passwordError: "",
      confirmPasswordError: "",
    });
    const { name, email, password } = userLogins;
    const { confirmPassword } = passwordInfo;
    setTimeout(() => {
      if (!name) {
        setNameError("Name missing...");
      } else if (!email) {
        setEmailError("E-Mail Address missing...");
      } else if (!password) {
        setPasswordInfo({
          ...passwordInfo,
          passwordError: "Password missing...",
        });
      } else if (!confirmPassword) {
        setPasswordInfo({
          ...passwordInfo,
          confirmPasswordError: "Confirmation Password missing...",
        });
      } else if (password !== confirmPassword) {
        setPasswordInfo({
          ...passwordInfo,
          confirmPasswordError: "Passwords mismatched...",
        });
      } else {
        setLoading(true);
        const { from } = location.state || { from: { pathname: "/" } };
        authService
          .registerUser(name, email, password)
          .then(() => navigate(from, { replace: true }))
          .catch(() => {
            setError(true);
          });
        setLoading(false);
      }
    }, 50);
  };

  const { name, email, password } = userLogins;
  const {
    passwordType,
    passwordError,
    eyeIcon,
    confirmPassword,
    confirmPasswordType,
    confirmPasswordError,
    confirmEyeIcon,
  } = passwordInfo;
  const errMsg = "Error creating account. Please try again.";

  return (
    <div className="center-display">
      {loading ? <div>"Loading..."</div> : null}
      {error ? <Alert message={errMsg} type="my-alert-danger" /> : null}
      <div
        className="badge bg-success text-wrap py-3 fs-6"
        style={{ width: "30rem", margin: "35px auto" }}
      >
        BOOKSTAGRAM REGISTER
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <InputBase
          label="Name *"
          error={nameError}
          type="text"
          value={name}
          name="name"
          onChange={handleChange}
          onFocus={() => setNameError("")}
          minLength="5"
          maxLength="20"
        />
        <InputBase
          label="E-Mail *"
          error={emailError}
          type="email"
          value={email}
          name="email"
          onChange={handleChange}
          onFocus={() => setEmailError("")}
          minLength="5"
          maxLength="20"
        />
        <InputBase
          label="Create Password *"
          error={passwordError}
          type={passwordType}
          value={password}
          name="password"
          onChange={handleChange}
          onFocus={() =>
            setPasswordInfo({ ...passwordInfo, passwordError: "" })
          }
          minLength="6"
          maxLength="20"
          typeIs="password"
          eyeIcon={eyeIcon}
          handleEyeIcon={() => handleEyeIcon("password")}
        />
        <InputBase
          label="Confirm Password *"
          error={confirmPasswordError}
          type={confirmPasswordType}
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleConfirmChange}
          onFocus={() =>
            setPasswordInfo({
              ...passwordInfo,
              confirmPasswordError: "",
            })
          }
          minLength="6"
          maxLength="20"
          typeIs="password"
          eyeIcon={confirmEyeIcon}
          handleEyeIcon={handleEyeIcon}
        />
        <input type="submit" className="submit-button" value="sign up" />
      </form>
      <div className="footer-text">
        <div>
          Already have an account? Log in <Link to="/login">HERE</Link>
        </div>
        <Link to="/" className="span-cancel">
          Cancel
        </Link>
        <span className="span-policy">
          <u>Privacy Policy and Cookies</u>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <u>Terms of Sale and Use</u>
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
