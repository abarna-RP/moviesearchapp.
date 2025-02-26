// src/api/omdbService.js
const API_KEY = '5f2c4543'; // Replace with your actual API key
const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = async (searchTerm, page = 1, type = '') => {
  let url = `${BASE_URL}?s=${searchTerm}&page=${page}&apikey=${API_KEY}`;
  if (type) {
    url += `&type=${type}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};