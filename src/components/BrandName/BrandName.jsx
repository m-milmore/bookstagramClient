import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook } from "@fortawesome/free-solid-svg-icons";

library.add(faBook);

const BrandName = () => {
  return (
    <>
      <span className="fw-bold text-info h3">
        <FontAwesomeIcon icon="book" />
      </span>
      <span
        className="text-info ms-2 h4"
        style={{ position: "relative", top: "0" }}
      >
        bookstagram
      </span>
    </>
  );
};

export default BrandName;
