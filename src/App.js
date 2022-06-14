import React, { useState, createContext, useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import UserLogin from "./components/UserLogin/UserLogin";
import UserCreate from "./components/UserCreate/UserCreate";
import { AuthService } from "./services";

const authService = new AuthService();
export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const context = {
    authService,
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
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<MainPage />} />
            </Route>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserCreate />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
