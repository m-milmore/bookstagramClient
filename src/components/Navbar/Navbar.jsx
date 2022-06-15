import React from "react";
import BrandName from "./BrandName";
import SearchButton from "./SearchButton";
import LoginSignupScreen from "./LoginSignupScreen/LoginSignupScreen";

const Navbar = () => {
  return (
    <div className="container-md m-0 p-0">
      <div className="row mt-3 mb-5 mx-2 d-flex align-items-center justify-content-around justify-content-sm-between">
        <div className="col-sm-auto col-md-6 col-lg-7 col-xl-6 m-0 p-0 pb-2 d-flex justify-content-start">
          <BrandName />
        </div>
        <div className="col-auto m-0 p-0 pb-1">
          <SearchButton />
        </div>
        <div className="col-auto m-0 p-0 pb-1">
          <LoginSignupScreen />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
