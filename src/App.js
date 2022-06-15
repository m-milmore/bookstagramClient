import React, { useState, useEffect, createContext } from "react";
import { AuthService } from "./services";
import orderBy from "lodash.orderby";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./components/MainPage/MainPage";

const authService = new AuthService();
export const UserContext = createContext();

const App = () => {
  const [books, setbooks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const context = {
    authService,
    books,
  };

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
