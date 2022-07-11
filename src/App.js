import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthService, BookService } from "./services";
import { AWSService } from "./awsService";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Page404 from "./components/Page404/Page404";

const authService = new AuthService();
const bookService = new BookService();
const awsService = new AWSService();
export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const context = {
    authService,
    bookService,
    awsService,
    isLoggedIn: false,
    appSetIsLoggedIn: (isLoggedIn) => {
      setAuthContext({ ...authContext, isLoggedIn });
    },
    persist: JSON.parse(localStorage.getItem("persist"))
      ? JSON.parse(localStorage.getItem("persist"))
      : false,
    setPersist: (persist) => {
      setAuthContext({ ...authContext, persist });
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
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
