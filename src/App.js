import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthService, BookService } from "./services";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LogoutPage from "./components/LogoutPage/LogoutPage";
import UpdateDetails from "./components/UpdateDetails/UpdateDetails";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

const authService = new AuthService();
const bookService = new BookService();
export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const context = {
    authService,
    bookService,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

const App = () => {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
