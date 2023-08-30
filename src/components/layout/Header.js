import { useState } from "react";
import SearchBar from "./SearchBar";

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
          className="btn btn-secondary mx-auto"
        >
          Open search
        </button>
      </nav>
      {searchOpen ? <SearchBar /> : ""}
    </>
  );
}

export default Header;
