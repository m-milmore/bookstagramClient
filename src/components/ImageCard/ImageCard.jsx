import React from "react";

const ImageCard = ({ book: { _id, title, photo } }) => {
  const titleAdjusted = title.length > 24 ? title.slice(0, 20) + "..." : title;

  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2">
      <div
        className="card border-0 mb-5 h-100"
        role="button"
        data-bs-toggle="modal"
        data-bs-target={`#id${_id}`}
      >
        <div className="card-header">Featured</div>
        <div className="card-body my-2 px-0">
          <img src={photo} className="card-img-top" alt={title} />
        </div>
        <div className="card-footer text-muted">
          <h5
            className="card-title m-0 p-0 bg-light d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "3rem", color: "black", overflow: "hidden" }}
          >
            {titleAdjusted}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
