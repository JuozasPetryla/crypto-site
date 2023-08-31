import { useEffect, useState } from "react";
import classes from "./SearchBar.module.scss";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [searchIsValid, setSearchIsValid] = useState(true);

  function inputChange(e) {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    function validateInput() {
      if (inputValue.length === 30) {
        setSearchIsValid(false);
      } else {
        setSearchIsValid(true);
      }
    }
    validateInput();
  }, [inputValue]);

  return (
    <div className={classes.search}>
      <input
        type="text"
        className={`${classes.input} ${!searchIsValid ? classes.invalid : ""}`}
        id="search"
        placeholder="Search..."
        value={inputValue}
        maxLength={30}
        onInput={inputChange}
      />
      {!searchIsValid ? (
        <p className={classes.error}>
          Search value cannot exceed 30 characters
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default SearchBar;
