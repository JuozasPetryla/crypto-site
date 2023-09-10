import { useEffect, useState } from "react";
import classes from "./SearchBar.module.scss";
import { fetchCryptos } from "../../app/cryptoSlice";
import { useDispatch } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [searchIsValid, setSearchIsValid] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  function inputChange(e) {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(inputValue);
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [inputValue]);

  useEffect(() => {
    function validateInput() {
      if (inputValue.length === 30) {
        setSearchIsValid(false);
      } else {
        setSearchIsValid(true);
      }
    }
    validateInput();
    dispatch(fetchCryptos({ search: debouncedSearchTerm }));
    // eslint-disable-next-line
  }, [debouncedSearchTerm, dispatch]);

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
