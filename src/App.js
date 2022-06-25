import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthService, BookService } from "./services";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import ResetPassword from "./components/ResetPassword/ResetPassword";

const authService = new AuthService();
const bookService = new BookService();
export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const context = {
    authService,
    bookService,
    isLoggedIn: false,
    appSetIsLoggedIn: (isLoggedIn) => {
      setAuthContext({ ...authContext, isLoggedIn });
    },
  };

  const [authContext, setAuthContext] = useState(context);

  return (
    <UserContext.Provider value={authContext}>{children}</UserContext.Provider>
  );
};

const App = () => {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
