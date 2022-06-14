import React from "react";
import ImageCard from "./ImageCard";
import DetailPage from "../Utilities/DetailPage";
import Alert from "../Alert/Alert";

const ListAlbum = ({ photos, loading, error }) => {
  const errMsg = "Error loading images.";

  return (
    <div className="container px-0">
      {error ? <Alert message={errMsg} type="alert-danger" /> : null}
      {loading ? <div>"Loading..."</div> : null}
      <div className="row justify-content-center">
        {photos.length ? (
          photos.map((photo) => <ImageCard photo={photo} key={photo.eTag} />)
        ) : (
          <div>No pictures...</div>
        )}
      </div>
      {photos.map((photo) => (
        <DetailPage photo={photo} key={photo.eTag} />
      ))}
    </div>
  );
};

export default ListAlbum;
