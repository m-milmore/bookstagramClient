import React, { useContext } from "react";
import { UserContext } from "../../App";
import BrandName from "../BrandName/BrandName";
import SearchButton from "../SearchButton/SearchButton";
import LoginSignupButton from "../LoginSignupButton/LoginSignupButton";
import LoggedInButton from "../LoggedInButton/LoggedInButton";
import "bootstrap/dist/js/bootstrap.bundle";  // for bootstrap dropdown

const Navbar = ({ books }) => {
  const {
    authService: { isLoggedIn },
  } = useContext(UserContext);
  return (
    <div className="container-md m-0 p-0">
      <div className="row mt-3 mb-5 mx-2 d-flex align-items-center justify-content-around justify-content-sm-between">
        <div className="col-sm-auto col-md-6 col-lg-7 col-xl-6 m-0 p-0 pb-2 d-flex justify-content-start">
          <BrandName />
        </div>
        <div className="col-auto m-0 p-0 pb-1">
          <SearchButton books={books} />
        </div>
        <div className="col-auto m-0 p-0 pb-1">
          {isLoggedIn ? <LoggedInButton /> : <LoginSignupButton />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
