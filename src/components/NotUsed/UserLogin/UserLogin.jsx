import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../../Alert/Alert";

const UserLogin = () => {
  const { authService } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [userLogins, setUserLogins] = useState({
    email: "e@e.com",
    password: "123456",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    setUserLogins({ ...userLogins, [name]: value });
  };

  const onLoginUser = (e) => {
    e.preventDefault();
    const { email, password } = userLogins;
    if (!!email && !!password) {
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
  };

  const errMsg = "Sorry you entered an incorrect email or password";

  return (
    <div className="center-display">
      {error ? <Alert message={errMsg} type="alert-danger" /> : null}
      {loading ? <div>"Loading..."</div> : null}
      <form onSubmit={onLoginUser} className="form">
        <label>
          Enter your <strong>email</strong> and <strong>password</strong>
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="email@email.com"
          onChange={onChange}
          value={userLogins.email}
        />
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="password"
          onChange={onChange}
          value={userLogins.password}
        />
        <input type="submit" className="submit-btn" value="sign in" />
      </form>
      <div className="footer-text">
        No Account? Create one <Link to="/register">HERE</Link>
      </div>
    </div>
  );
};

export default UserLogin;
