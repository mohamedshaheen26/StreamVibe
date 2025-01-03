import React from "react";
import useMoviesShowsData from "@/hooks/useMoviesShowsData"; // Your custom hook to fetch movies and shows data
import Carousel from "../components/Carousel";

const MoviesShowsPage = () => {
  // Fetch data for movies and shows
  const {
    genres,
    randomMoviesByGenre,
    popularByGenre,
    trending,
    newReleases,
    loading,
    error,
  } = useMoviesShowsData("movie"); // "movie" or "tv"

  return (
    <div className='movies-shows-page'>
      <div className='container'>
        <div className='movies'>
          {/* Genres Carousel */}
          <Carousel
            title='Our Genres'
            data={randomMoviesByGenre}
            isLoading={loading}
            error={null}
            showGenreName={true}
          />

          {/* Popular by Genre Carousel */}
          <Carousel
            title='Popular Top 10 In Genres'
            data={popularByGenre}
            isLoading={loading}
            error={null}
            showGenreName={true}
            showBadgeForPopular={true}
          />

          {/* Trending Movies Carousel */}
          <Carousel
            title='Trending Movies'
            data={trending}
            isLoading={loading}
            error={null}
          />

          {/* New Releases Carousel */}
          <Carousel
            title='New Releases'
            data={newReleases}
            isLoading={loading}
            error={null}
          />
        </div>
        <div className='shows'></div>
      </div>
    </div>
  );
};

export default MoviesShowsPage;
