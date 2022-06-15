import React from "react";
import { extractTitleFromUrl } from "../../constants";

const ImageCard = ({ photo }) => {
  const { photoUrl, eTag } = photo;
  const id = eTag.replace(/['"]+/g, "").slice(-6);
  let title = extractTitleFromUrl(photoUrl);
  title = title.length > 26 ? title.slice(0, 22) + "..." : title;

  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2">
      <div className="card border-0 mb-5 h-100">
        <div class="card-header">Featured</div>
        <div
          className="card-body my-2 px-0"
          role="button"
          data-bs-toggle="modal"
          data-bs-target={`#id${id}`}
        >
          <img src={photoUrl} className="card-img-top" alt={title} />
        </div>
        <div
          class="card-footer text-muted"
          role="button"
          data-bs-toggle="modal"
          data-bs-target={`#id${id}`}
        >
          <h5
            className="card-title m-0 p-0 bg-light d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "3rem", color: "black", overflow: "hidden" }}
          >
            {title}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
