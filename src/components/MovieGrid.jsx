import React from 'react';

const movies = [
  // List of movie image URLs
  "image1.jpg", "image2.jpg", "image3.jpg" // Replace with actual URLs
];

function MovieGrid() {
  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <div key={index} className="movie-card">
          <img src={movie} alt="Movie" />
        </div>
      ))}
    </div>
  );
}

export default MovieGrid;
