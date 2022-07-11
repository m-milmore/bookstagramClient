import React from "react";

const ImageCard = ({ book: { _id, title, photo } }) => {
  const titleAdjusted = title.length > 23 ? title.slice(0, 19) + "..." : title;

  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-5">
      <div
        className="card border-0 h-100"
        role="button"
        data-bs-toggle="modal"
        data-bs-target={`#id${_id}`}
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
  );
};

export default ImageCard;
