import React from "react";
import PropTypes from "prop-types";
import "./InputBase.css";
import LabelErrorContainer from "./LabelErrorContainer";

class InputBase extends React.Component {
  render() {
    const {
      label,
      error,
      typeIs,
      handleEyeIcon,
      eyeIcon,
      placeholder,
      htmlFor,
      ...props
    } = this.props;

    return (
      <div className="input-base-container">
        <LabelErrorContainer label={label} error={error} htmlFor={htmlFor} />
        <input
          autoComplete="off"
          className={`${error ? "red-bg" : ""}`}
          {...props}
          placeholder={placeholder}
        />
        {typeIs === "password" && (
          <div className="eye-icon-container" onClick={handleEyeIcon}>
            <img src={eyeIcon} alt="eye" />
          </div>
        )}
      </div>
    );
  }
}

InputBase.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  typeIs: PropTypes.string,
  handleEyeIcon: PropTypes.func,
  eyeIcon: PropTypes.string,
  placeholder: PropTypes.string,
  htmlFor: PropTypes.string,
};

InputBase.defaultProps = {
  label: "",
  error: "",
  typeIs: "",
  handleEyeIcon: () => {},
  eyeIcon: "",
  placeholder: "",
  htmlFor: "",
};

export default InputBase;
