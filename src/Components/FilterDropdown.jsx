// src/components/FilterDropdown.jsx
import React from 'react';

const FilterDropdown = ({ onFilterChange }) => {
  const handleFilter = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <select onChange={handleFilter} className="border text-white p-1 rounded-lg bg-blue-500">
      <option value="">All Types</option>
      <option value="movie">Movies</option>
      <option value="series">Series</option>
      <option value="episode">Episodes</option>
    </select>
  );
};

export default FilterDropdown;