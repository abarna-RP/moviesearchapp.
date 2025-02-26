// src/components/MovieDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/omdbService';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return null;

  return (
    <div className="p-4 mb-8 ">
      <h2 className="text-2xl font-bold mb-4">{movie.Title}</h2>
      <div className="flex flex-col md:flex-row">
        <img src={movie.Poster} alt={movie.Title} className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4" />
        <div>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Ratings:</strong> {movie.Ratings.map((rating) => `${rating.Source}: ${rating.Value}`).join(', ')}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
          {/* Add other details as needed */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;