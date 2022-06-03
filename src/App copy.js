import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [book, setBook] = useState({
    title: "",
    imageUrl: "",
  });

  const onChange = ({ target: { name, value } }) => {
    setBook({ ...book, [name]: value });
  };

  const onSubmit = (e) => {
    const { title, imageUrl } = book;
    e.preventDefault();
    if (!!title && !!imageUrl) {
      console.log("Form submitted");
    } else {
      console.log("Missing...");
    }
  };

  return (
    <div className="App">
      <h1>Photo Album Viewer</h1>
      {/* <header className="App-header">Upload a book image</header>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <input
            className="form-control mb-1"
            type="text"
            placeholder="Title"
            aria-label="title"
            name="title"
            value={book.title}
            onChange={onChange}
            id="bookTitle"
          />
          <input
            className="form-control"
            type="file"
            id="bookImage"
            aria-label="book image"
            name="imageUrl"
            value={book.imageUrl}
            onChange={onChange}
            accept="image/*"
          />
        </div>
        <div className="">
          <button type="submit" className="btn btn-primary mb-3">
            Send
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default App;
