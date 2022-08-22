import React from "react";
import "./Search.css";
function Search({ value, data, change, submit, position }) {
  return (
    <>
      <div className="search__container">
        <form onSubmit={submit}>
          <input
            type="text"
            value={value}
            onChange={change}
            placeholder="Lahore,Pakistan"
            className="search__input"
          />
        </form>
        <button onClick={position} className="search__button">
          Get Your Location Weather
        </button>
      </div>
    </>
  );
}

export default Search;
