import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import orderBy from "lodash.orderby";
import Navbar from "../Navbar/Navbar";
import Alert from "../Alert/Alert";
import Books from "../Books/Books";

const MainPage = () => {
  const { bookService } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;  // prevents "trying to modify state on a unmounted component" error
    const controller = new AbortController();
    // need the 2 setLoading(false), both in try & catch, so the "no pictures" message doesn't show unnecessary
    setLoading(true);
    bookService
      .getAllBooks(isMounted, controller)
      .then(() => {
        setBooks(orderBy(bookService.getBooks(), ["createAt"], ["asc"]));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Error loading images.");
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [bookService]);

  return (
    <>
      <Navbar books={books} />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <Alert message={error} type="my-alert-danger" />
      ) : (
        <Books books={books} />
      )}
    </>
  );
};

export default MainPage;
