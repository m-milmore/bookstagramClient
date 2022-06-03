import React from "react";

const ListAlbums = ({ appState: { photoUrls: photos, loading, error } }) => {
  return (
    <div className="container px-0">
      <h1 className="mb-5">Bookstagram</h1>
      <div className="row justify-content-center">
        {!loading ? (
          photos.length ? (
            <div>
              {photos.map((photo, i) => (
                <img
                  src={photo}
                  style={{
                    width: "200px",
                    height: "256px",
                    marginRight: "5px",
                  }}
                  key={i}
                  alt="book"
                />
              ))}
            </div>
          ) : (
            <div>No pictures...</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {error && (
        <h3 className="text-danger">
          "Error loading data...
          <span role="img" aria-label="smiley">
            😐
          </span>
          "
        </h3>
      )}
    </div>
  );
};

export default ListAlbums;
