import React from "react";
import PropTypes from "prop-types";
import "./SearchButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { appEmitter } from "../MainPage/MainPage";

library.add(faMagnifyingGlass);

const SearchButton = ({ books }) => {
  const products = books.map((book) => ({
    title: book.title,
    id: book._id,
  }));
  const [suggestions, setSuggestions] = React.useState([]);
  const [inputSearch, setInputSearch] = React.useState("");

  const handleInputChange = ({ target: { value } }) => {
    let matches = [];
    if (value.length > 0) {
      matches = products.filter((product) => {
        const re = new RegExp(`${value}`, "gi");
        return product.title.match(re);
      });
    }
    setSuggestions(matches);
    setInputSearch(value);
  };

  const suggestHandler = (suggestion) => {
    appEmitter.emit("ImageCard", suggestion.id)
    setInputSearch(suggestion.title);
    setSuggestions([]);
  };

  const handleSearchButton = () => {
    if (inputSearch.length > 0) {
      const found = products.find((product) => product.title === inputSearch);
      if (found !== undefined) suggestHandler(found);
      else alert("no product under that name.");
    }
  };

  return (
    <div className="d-flex align-items-baseline">
      <div className="d-flex flex-column position-relative">
        <div className="input-group">
          <input
            className="form-control search-style my-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleInputChange}
            value={inputSearch}
          />
          <span
            className="input-group-text btn btn-secondary"
            role="button"
            onClick={handleSearchButton}
          >
            <FontAwesomeIcon icon="magnifying-glass" />
          </span>
        </div>
        {suggestions.length > 0 && (
          <div
            className="list-group list-group-flush border rounded corners"
            style={{
              position: "absolute",
              zIndex: "1000",
              width: "100%",
              top: "2.39rem",
            }}
          >
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                className="list-group-item list-group-item-action list-group-item-light h6 my-0 py-1 border-0 text-start"
                onClick={() => suggestHandler(suggestion)}
              >
                {suggestion.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

SearchButton.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

SearchButton.defaultProps = {
  books: [],
};


export default SearchButton;
