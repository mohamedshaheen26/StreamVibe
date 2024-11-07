import React, { useState } from "react";

function SearchBar({ setQuery }) {
  const [input, setInput] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    setQuery(input);
  };

  return (
    <form onSubmit={handleSearch} className='search-bar'>
      <input
        type='text'
        placeholder='Search for a movie...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type='submit'>Search</button>
    </form>
  );
}

export default SearchBar;
