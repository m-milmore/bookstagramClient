import React from "react";
import ImageCard from "./ImageCard";
import DetailPage from "./Utilities/DetailPage";

const ListAlbum = ({ appState: { photoUrls: photos, loading, error } }) => {
  return (
    <div className="container px-0">
      <h1 className="mb-5">Bookstagram</h1>
      <div className="row justify-content-center">
        {!loading ? (
          photos.length ? (
            photos.map((photo) => (
              <ImageCard photo={photo} key={photo.eTag} />
            ))
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
      {photos.map((photo) => (
        <DetailPage photo={photo} key={photo.eTag} />
      ))}
    </div>
  );
};

export default ListAlbum;
