import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../App";
import BrandName from "../BrandName/BrandName";
import UploadLink from "../UploadLink/UploadLink";
import SearchButton from "../SearchButton/SearchButton";
import LoginSignupButton from "../LoginSignupButton/LoginSignupButton";
import LoggedInButton from "../LoggedInButton/LoggedInButton";
import "bootstrap/dist/js/bootstrap.bundle"; // for bootstrap dropdown

const Navbar = ({ books }) => {
  const { authService, isLoggedIn, appSetIsLoggedIn, persist } =
    useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn && persist) {
      authService
        .refresh()
        .then(() => {
          appSetIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [authService, persist, isLoggedIn, appSetIsLoggedIn]);

  return (
    <>
      <div className="container-md m-0 p-0">
        <div
          className="row mt-3 mb-5 mx-0 d-flex align-items-center"
          style={{ minHeight: "60px" }}
        >
          <div className="col-6 m-0 py-2 d-flex justify-content-between">
            <div className="m-0 p-0">
              <BrandName />
            </div>
            <div className="m-0 p-0">{isLoggedIn && <UploadLink />}</div>
          </div>
          <div className="col-6 m-0 py-2 d-flex justify-content-evenly">
            <div className="m-0 p-0">
              <SearchButton books={books} />
            </div>
            <div className="m-0 p-0">
              {isLoggedIn ? (
                <LoggedInButton name={authService.name} />
              ) : (
                <LoginSignupButton />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

Navbar.defaultProps = {
  books: [],
};

export default Navbar;
