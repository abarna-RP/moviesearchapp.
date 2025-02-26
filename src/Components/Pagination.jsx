// src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex item-center
     justify-center mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`  mx-2 ml-2 mr-2  px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'border'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;