import React from "react";
import usePopularMovies from "@/hooks/usePopularMovies";
import useResposiveScreen from "../hooks/useResposiveScreen.js";
import CustomButton from "./CustomButton.jsx";

function HeroSection() {
  const { movies, error } = usePopularMovies();

  const isMobile = useResposiveScreen();

  const fullText =
    "StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.";

  const shortText =
    "StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere.";

  return (
    <>
      <section className='hero-section'>
        <div className='mosaic-background'>
          {movies.map((movie) => (
            <div key={movie.id} className='mosaic-image'>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`Movie poster: ${movie.title}`}
                loading='lazy'
              />
            </div>
          ))}
        </div>
        <div className='hero-overlay'></div>
      </section>
      <section className='hero-content'>
        <div className='container text-center text-white'>
          <h1 className='display-4 fw-bold'>The Best Streaming Experience</h1>
          <p className='my-3'>{isMobile ? shortText : fullText}</p>
          <CustomButton
            className='d-flex align-items-center mx-auto custom-button'
            icon='fa-play'
            label=' Start Watching Now'
          />
        </div>
      </section>
    </>
  );
}

export default HeroSection;
