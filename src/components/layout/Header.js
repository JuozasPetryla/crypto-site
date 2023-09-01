import { useState } from "react";
import SearchBar from "./SearchBar";
import classes from "./Header.module.scss";

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  function toggleSearch() {
    setSearchOpen(!searchOpen);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          onClick={toggleSearch}
          type="button"
          className={"btn btn-secondary mx-auto " + classes.button}
        >
          Open search
        </button>
      </nav>
      {searchOpen ? <SearchBar /> : ""}
    </>
  );
}

export default Header;
