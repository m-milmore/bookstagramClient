import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({ children, title, close, isOpen }) => {
  return (
    <>
      {isOpen ? (
        <div className="my-modal">
          <div className="my-modal-dialog">
            <div className="my-modal-content">
              <div className="my-modal-header">
                <h5 className="my-modal-title">{title}</h5>
                <button onClick={() => close(false)} className="close">
                  &times;
                </button>
              </div>
              <div className="my-modal-body">{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  close: PropTypes.func,
  isOpen: PropTypes.bool,
};

Modal.defaultProps = {
  title: "Title",
  close: () => {},
  isOpen: false,
};

export default Modal;
