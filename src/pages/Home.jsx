// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Pagination from '../Components/Pagination';
import FilterDropdown from '../components/FilterDropdown';
import { searchMovies } from '../api/omdbService';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [movieType, setMovieType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (term, page, type) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(term, page, type);
      if (data.Search) {
        setMovies(data.Search);
        setTotalPages(Math.ceil(data.totalResults / 10)); // Assuming 10 results per page
      } else {
        setMovies([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    fetchMovies(term, 1, movieType);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMovies(searchTerm, page, movieType);
  };

  const handleFilterChange = (type) => {
    setMovieType(type);
    setCurrentPage(1);
    fetchMovies(searchTerm, 1, type);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm, currentPage, movieType);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-screen-xl mx-auto 
via-[#a4a2a2]
">
      <h1 className="text-3xl font-bold mb-4">Movie Search</h1>
      <div className="flex justify-between mb-4">
        <SearchBar onSearch={handleSearch} />
        <FilterDropdown onFilterChange={handleFilterChange} />
      </div>

      {movies.length > 0 ? (
        <>
          <MovieList movies={movies} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        searchTerm && <p>No movies found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default Home;