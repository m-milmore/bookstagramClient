import React, { useContext } from "react";
import Alert from "../Alert/Alert";
import { UserContext } from "../../App";
import ImageCard from "../ImageCard/ImageCard";
import DetailPage from "../DetailPage/DetailPage";

const MainPage = ({ loading, error }) => {
  const { books } = useContext(UserContext);
  const errMsg = "Error loading images.";

  return (
    <div className="container px-0">
      {loading ? <div>"Loading..."</div> : null}
      {error ? <Alert message={errMsg} type="alert-danger" /> : null}
      <div className="row justify-content-center">
        {books.length ? (
          books.map((book) => <ImageCard book={book} key={book._id} />)
        ) : (
          <div>No pictures...</div>
        )}
      </div>
      {books.map((book) => (
        <DetailPage book={book} key={book._id} />
      ))}
    </div>
  );
};

export default MainPage;
