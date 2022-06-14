import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./UserCreate.css";
import Modal from "../Modal/Modal";
import { AVATARS } from "../../constants";
import { AVATAR_COUNT } from "../../constants";
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";

const UserCreate = () => {
  const { authService } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const INIT_STATE = {
    name: "",
    email: "",
    password: "",
    avatarName: "avatarDefault.png",
    avatarColor: "none",
  };
  const [userInfo, setUserInfo] = useState(INIT_STATE);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const chooseAvatar = (avatarName) => {
    setUserInfo({ ...userInfo, avatarName });
    setModal(false);
  };

  const generateBgColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setUserInfo({ ...userInfo, avatarColor: `#${randomColor}` });
  };

  const createUser = (e) => {
    e.preventDefault();
    const { name, email, password, avatarName, avatarColor } = userInfo;
    if (!!name && !!email && !!password) {
      const { from } = location.state || { from: { pathname: "/" } };
      setLoading(true);
      authService
        .registerUser(name, email, password, avatarName, avatarColor)
        .then(() => navigate(from, { replace: true }))
        .catch(() => {
          setError(true);
        });
      setLoading(false);
    }
  };

  const { name, email, password, avatarName, avatarColor } = userInfo;
  const errMsg = "Error creating account. Please try again.";

  return (
    <>
      <div className="center-display">
        {error ? <Alert message={errMsg} type="alert-danger" /> : null}
        {loading ? <div>"Loading..."</div> : null}
        <h3 className="title">Create an account</h3>
        <form onSubmit={createUser} className="form">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="enter username"
            onChange={onChange}
            value={name}
          />
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="enter email"
            onChange={onChange}
            value={email}
          />
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="enter password"
            onChange={onChange}
            value={password}
          />
          <div className="avatar-container">
            <img
              className="avatar-icon avatar-border-radius"
              src={avatarName}
              alt="avatar"
              style={{ backgroundColor: avatarColor }}
            />
            <div onClick={() => setModal(true)} className="avatar-text">
              Choose avatar
            </div>
            <div onClick={generateBgColor} className="avatar-text">
              Generate background color
            </div>
          </div>
          <input type="submit" className="submit-btn" value="sign up" />
        </form>
        <div className="footer-text">
          Already have an account? Sign in <Link to="/login">HERE</Link>
        </div>
      </div>
      <Modal title="Choose Avatar" isOpen={modal} close={() => setModal(false)}>
        <div className="avatar-list">
          {/* {AVATARS.map((img) => (
            <div className="avatar-icon" key={img}>
              <img src={img} alt="avatar" />
            </div>
          ))} */}
          {Array.from({ length: AVATAR_COUNT }, (v, i) => (
            <div
              role="presentation"
              className="avatar-icon"
              key={i}
              onClick={() => chooseAvatar(`dark${i}.png`)}
            >
              <img src={`dark${i}.png`} alt="avatar" />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default UserCreate;
