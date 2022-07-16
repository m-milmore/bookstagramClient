import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DetailPage from "../DetailPage/DetailPage";
import { appEmitter } from "../MainPage/MainPage";

const ImageCard = ({ book }) => {
  const { _id, title, photo } = book;
  const titleAdjusted = title.length > 23 ? title.slice(0, 19) + "..." : title;

  const [show, setShow] = useState(false);

  const handleShowDetail = () => setShow(true);
  const handleCloseDetail = () => setShow(false);

  useEffect(() => {
    const onImageCard = (bookId) => {
      if (bookId === _id) {
        handleShowDetail();
      }
    };

    const imageCardListener = appEmitter.addListener("ImageCard", onImageCard);

    return () => {
      imageCardListener.remove();
    };
  }, [_id]);

  return (
    <>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-5">
        <div
          className="card border-0 h-100"
          role="button"
          // data-bs-toggle="modal"
          // data-bs-target={`#id${_id}`}
          onClick={handleShowDetail}
        >
          <div className="card-header border">Featured</div>
          <div className="card-body my-0 px-0">
            <img src={photo} className="card-img-top border" alt={title} />
          </div>
          <div className="card-footer text-muted border">
            <h5
              className="card-title m-0 p-0 bg-light d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: "3rem", color: "black", overflow: "hidden" }}
            >
              {titleAdjusted}
            </h5>
          </div>
        </div>
      </div>
      <DetailPage show={show} handleCloseDetail={handleCloseDetail} book={book} />
    </>
  );
};

ImageCard.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

ImageCard.defaultProps = {
  books: [],
};

export default ImageCard;
