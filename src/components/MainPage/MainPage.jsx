import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import orderBy from "lodash.orderby";
import Navbar from "../Navbar/Navbar";
import Alert from "../Alert/Alert";
import Books from "../Books/Books";

const MainPage = () => {
  const {bookService} = useContext(UserContext)
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // need the 2 setLoading(false), both in try & catch, so "no pictures" message not showing unnecessary
    setLoading(true);
    bookService
      .getAllBooks()
      .then(() => {
        setBooks(orderBy(bookService.getBooks(), ["createAt"], ["asc"]));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [bookService]);

  const errMsg = "Error loading images.";

  return (
    <>
      <Navbar books={books}/>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <Alert message={errMsg} type="my-alert-danger" />
      ) : (
        <Books books={books}/>
      )}
    </>
  );
};

export default MainPage;
