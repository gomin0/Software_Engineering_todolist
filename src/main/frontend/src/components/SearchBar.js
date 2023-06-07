import React, { useState } from "react";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
  };

  return (
    <input
      type="search"
      placeholder="Search a list"
      onChange="{handleChange}"
      value="searchInput"
    />
  );
};

export default SearchBar;
