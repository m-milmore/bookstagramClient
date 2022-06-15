import React, { useState, useEffect, createContext } from "react";
import { AuthService, BookService } from "./services";
import orderBy from "lodash.orderby";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./components/MainPage/MainPage";

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
    setLoading(true);
    bookService
      .getAllBooks()
      .then(() =>
        setBooks(orderBy(bookService.getBooks(), ["createAt"], ["asc"]))
      )
      .catch(() => {
        setError(true);
      });
    setLoading(false);
  }, []);

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <UserContext.Provider value={context}>
        <Navbar />
        <MainPage loading={loading} error={error} />
      </UserContext.Provider>
    </div>
  );
};

export default App;
