import React from 'react';
import { IconSearch, IconClose } from './icons';

// Live search box: the list filters on every keystroke (by name or category).
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <IconSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search by name or category..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search products"
      />
      {searchTerm && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onSearchChange('')}
          aria-label="Clear search"
        >
          <IconClose />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
