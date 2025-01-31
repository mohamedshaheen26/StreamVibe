import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ item, id, isMovies }) => {
  return (
    <Link
      to={`/movies&shows/genre/${id}/${isMovies ? "movie" : "tv"}/${item.id}`}
      key={item.id}
    >
      <div
        className='movie-card'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${item.poster_path})`,
        }}
      >
        <div className='movie-content'>
          <span className='rate'>
            <i className='fa-solid fa-star'></i>
            {item.vote_average.toFixed(1)}
          </span>
          <span className='playicon'>
            <i className='fas fa-circle-play'></i>
          </span>
          <div>
            <h4 className='title'>{item.title || item.name}</h4>
            <h5 className='description'>{item.overview}</h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
