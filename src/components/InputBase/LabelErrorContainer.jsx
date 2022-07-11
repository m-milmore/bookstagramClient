import React from "react";
import "./LabelErrorContainer.css";

class LabelErrorContainer extends React.Component {
  render(props) {
    const { label, error, htmlFor } = this.props;

    return (
      <div className="label-error-container">
        <label htmlFor={htmlFor} className="label">
          {label}
        </label>
        <span className={`error ${error ? "slide" : ""}`}>{error}</span>
      </div>
    );
  }
}

export default LabelErrorContainer;
