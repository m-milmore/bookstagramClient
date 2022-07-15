import React from "react";
import PropTypes from "prop-types";
import ImageCard from "../ImageCard/ImageCard";

const Books = ({ books }) => {
  return (
    <div className="container px-0">
      <div className="row justify-content-center">
        {books.length ? (
          books.map((book) => <ImageCard book={book} key={book._id} />)
        ) : (
          <div>No pictures...</div>
        )}
      </div>
    </div>
  );
};

Books.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

Books.defaultProps = {
  books: [],
};

export default Books;
