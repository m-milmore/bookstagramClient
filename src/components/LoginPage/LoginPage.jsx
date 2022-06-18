import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./LoginPage.css";
import { EYE_ICONS } from "../../constants";
import InputBase from "../InputBase/InputBase";
import Alert from "../Alert/Alert";

const LoginPage = () => {
  const { authService } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [userLogins, setUserLogins] = useState({
    email: "a@a.com",
    password: "123456",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordInfo, setPasswordInfo] = useState({
    passwordType: "password",
    passwordError: "",
    eyeIcon: EYE_ICONS["SHOW"],
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setUserLogins({ ...userLogins, [name]: value });
  };

  const handleEyeIcon = () => {
    passwordInfo.passwordType === "text"
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
    setEmailError("");
    setPasswordInfo({ ...passwordInfo, passwordError: "" });
    const { email, password } = userLogins;
    setTimeout(() => {
      if (!email) {
        setEmailError("E-Mail Address missing...");
      } else if (!password) {
        setPasswordInfo({
          ...passwordInfo,
          passwordError: "Password missing...",
        });
      } else {
        setLoading(true);
        const { from } = location.state || { from: { pathname: "/" } };
        authService
          .loginUser(email, password)
          .then(() => navigate(from, { replace: true }))
          .catch(() => {
            setError(true);
          });
        setLoading(false);
      }
    }, 50);
  };

  const { email, password } = userLogins;
  const { passwordType, passwordError, eyeIcon } = passwordInfo;
  const errMsg = "Sorry you entered an incorrect email or password";

  return (
    <div className="center-display">
      {loading ? <div>"Loading..."</div> : null}
      {error ? <Alert message={errMsg} type="my-alert-danger" /> : null}
      <div
        className="badge bg-success text-wrap py-3 fs-6"
        style={{ width: "30rem", margin: "35px auto" }}
      >
        BOOKSTAGRAM LOGIN
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <InputBase
          label="E-Mail"
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
          label="Password"
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
        <input type="submit" className="submit-button" value="sign in" />
      </form>
      <div className="footer-text">
        <Link to="/forgotpassword" className="forgot-password">
          Forgot password?
        </Link>
        <div>
          No Account? Create one <Link to="/register">HERE</Link>
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

export default LoginPage;
