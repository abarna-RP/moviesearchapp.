// src/components/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="block">
      <div className="border shadow-md rounded p-2 bg-white">
        <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover mb-2" />
        <h3 className="text-lg font-semibold mt-2">{movie.Title}</h3>
        <p className='text-gray'>  {movie.Year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;