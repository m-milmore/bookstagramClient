import React, { useState, useEffect } from "react";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/books")
      .then((res) => setBooks(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {books.length
        ? books.map((book) => (
            <div key={book.id}>
              <h4>
                Book: {book.title}, Photo: {book.photo}
              </h4>
            </div>
          ))
        : null}
    </div>
  );
};

export default Books;
