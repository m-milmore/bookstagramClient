import React, { useState, useEffect, createContext } from "react";
import { AuthService, BookService } from "./services";
import orderBy from "lodash.orderby";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./components/MainPage/MainPage";
import Alert from "./components/Alert/Alert";

const authService = new AuthService();
const bookService = new BookService();
export const UserContext = createContext();

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const context = {
    authService,
    bookService,
    books,
  };

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
  }, []);

  const errMsg = "Error loading images.";

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <UserContext.Provider value={context}>
        <Navbar />
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <Alert message={errMsg} type="my-alert-danger" />
        ) : (
          <MainPage />
        )}
      </UserContext.Provider>
    </div>
  );
};

export default App;
