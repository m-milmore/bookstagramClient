import React from "react";
import "./DetailPage.css";

const DetailPage = ({ book: { _id, title, photo } }) => {
  return (
    <div
      className="modal fade"
      id={`id${_id}`}
      tabIndex="-1"
      aria-labelledby="modal-title"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content text-dark bg-light">
          <div className="modal-header">
            <h5 className="modal-title">Book Details</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4 p-1">
                  <img
                    src={photo}
                    className="img-fluid rounded-start"
                    alt="title"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6
                      className="card-text m-0 p-0 mt-2 text-dark"
                      style={{ fontWeight: "600" }}
                    >
                      {`ref: ${_id}`}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
