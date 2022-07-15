import React, { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../../App";
import orderBy from "lodash.orderby";
import Navbar from "../Navbar/Navbar";
import Alert from "../Alert/Alert";
import Books from "../Books/Books";
import { EventEmitter } from "fbemitter";
import ConfirmationToast from "../ConfirmationToast/ConfirmationToast";

export const appEmitter = new EventEmitter();

const MainPage = () => {
  const { bookService } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showToast, setShowToast] = useState(false);
  const toggleToast = useCallback(() => {
    setShowToast(!showToast);
  }, [showToast]);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    // need the 2 setLoading(false), both in try & catch, so the "no pictures" message doesn't show unnecessary
    setLoading(true);
    bookService
      .getAllBooks()
      .then(() => {
        setBooks(orderBy(bookService.getBooks(), ["createAt"], ["asc"]));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Error loading images.");
      });
  }, [bookService]);

  useEffect(() => {
    const onUpdateBooks = (eventData) => {
      setBooks(orderBy(bookService.getBooks(), ["createAt"], ["asc"]));
    };

    const onToastMsg = (msg) => {
      setToastMsg(msg);
      toggleToast();
    };

    const toastListener = appEmitter.addListener("toast", onToastMsg);

    const updateBooksListener = appEmitter.addListener(
      "newBookUpdate",
      onUpdateBooks
    );

    return () => {
      updateBooksListener.remove();
      toastListener.remove();
    };
  }, [bookService, toggleToast]);

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
      <ConfirmationToast
        show={showToast}
        onClose={toggleToast}
        toastMsg={toastMsg}
      />
    </>
  );
};

export default MainPage;
