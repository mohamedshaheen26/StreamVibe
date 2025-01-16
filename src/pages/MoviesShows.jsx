import React, { useState } from "react";
import Slider from "react-slick";

import Carousel from "../components/Carousel";
import CustomButton from "../components/CustomButton";
import ToggleTabs from "../components/ToggleTabs";
import TrailerModal from "../components/TrailerModal";

import useMoviesShowsData from "@/hooks/useMoviesShowsData";
import useResposiveScreen from "../hooks/useResposiveScreen";
import usePopularMovies from "../hooks/usePopularMovies";

const MoviesShowsPage = () => {
  const isMobile = useResposiveScreen();
  const [activeTab, setActiveTab] = useState("Movies");
  const { movies, error } = usePopularMovies();
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch data for movies
  const {
    genres: movieGenres,
    randomMoviesByGenre: randomMovies,
    popularByGenre: popularMovies,
    trending: trendingMovies,
    newReleases: newMovieReleases,
    loading: moviesLoading,
    error: moviesError,
  } = useMoviesShowsData("movie");

  // Fetch data for TV shows
  const {
    genres: showGenres,
    randomMoviesByGenre: randomShows,
    popularByGenre: popularShows,
    trending: trendingShows,
    newReleases: newShowReleases,
    loading: showsLoading,
    error: showsError,
  } = useMoviesShowsData("tv");

  if (moviesError) return <p>Error: {moviesError.message}</p>;
  if (showsError) return <p>Error: {showsError.message}</p>;

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
    customPaging: () => (
      <div
        style={{
          background: "gray",
        }}
      />
    ),
  };

  return (
    <div className='movies-shows-page'>
      <div className='container'>
        <div className='slider-Movies'>
          {selectedMovie && (
            <TrailerModal
              trailerUrl={selectedMovie.trailerUrl}
              onClose={() => setSelectedMovie(null)}
            />
          )}
          <Slider {...settings}>
            {movies.slice(0, 3).map((movie) => (
              <div key={movie.id} className='movie-slide'>
                <div
                  className='movie-poster'
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w200${movie.backdrops[0]})`,
                  }}
                >
                  <div className='movie-content'>
                    <h3>{movie.title}</h3>
                    <p>{movie.overview}</p>
                    <div className='action-btn'>
                      <CustomButton
                        className={`custom-button me-4 ${
                          isMobile ? "w-100 mb-4" : ""
                        }`}
                        icon='fa-play'
                        label='Play Now'
                        noMargin={false}
                        onClick={() => setSelectedMovie(movie)}
                      />
                      <CustomButton
                        className='custom-button featured-btn me-2'
                        icon='fa-plus'
                        noMargin={true}
                      />
                      <CustomButton
                        className='custom-button featured-btn me-2'
                        icon='fa-thumbs-up'
                        noMargin={true}
                      />
                      <CustomButton
                        className='custom-button featured-btn me-2'
                        icon='fa-volume-up'
                        noMargin={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {isMobile ? (
          <>
            {/* Toggle Tabs for Mobile */}
            <ToggleTabs
              tabs={["Movies", "Shows"]} // Tabs for Movies and Shows
              activeTab={activeTab}
              onTabChange={(selectedTab) => setActiveTab(selectedTab)}
            />

            {/* Render Movies or Shows based on active tab */}
            {activeTab === "Movies" ? (
              <div className='movies'>
                {/* Genres Carousel */}
                <Carousel
                  title='Our Genres'
                  data={randomMovies}
                  isLoading={moviesLoading}
                  error={moviesError}
                  showGenreName={true}
                  showArrow={true}
                />

                {/* Popular by Genre Carousel */}
                <Carousel
                  title='Popular Top 10 In Genres'
                  data={popularMovies}
                  isLoading={moviesLoading}
                  error={moviesError}
                  showBadgeForPopular={true}
                  showGenreName={true}
                  showArrow={true}
                />

                {/* Trending Movies Carousel */}
                <Carousel
                  title='Trending Movies'
                  data={trendingMovies}
                  isLoading={moviesLoading}
                  error={moviesError}
                  singlePoster={true}
                  showDuration={true}
                  showViwers={true}
                />

                {/* New Releases Carousel */}
                <Carousel
                  title='New Releases'
                  data={newMovieReleases}
                  isLoading={moviesLoading}
                  error={moviesError}
                  singlePoster={true}
                  showReleaseDate={true}
                />
              </div>
            ) : (
              <div className='shows'>
                {/* Genres Carousel */}
                <Carousel
                  title='Our Genres'
                  data={randomShows}
                  isLoading={showsLoading}
                  error={showsError}
                  showGenreName={true}
                  showArrow={true}
                />

                {/* Popular by Genre Carousel */}
                <Carousel
                  title='Popular Top 10 In Genres'
                  data={popularShows}
                  isLoading={showsLoading}
                  error={showsError}
                  showBadgeForPopular={true}
                  showGenreName={true}
                  showArrow={true}
                />

                {/* Trending TV Shows Carousel */}
                <Carousel
                  title='Trending Shows Now'
                  data={trendingShows}
                  isLoading={showsLoading}
                  error={showsError}
                  singlePoster={true}
                  isShow={true}
                  showDuration={true}
                  seasonCount={true}
                />

                {/* New Releases Carousel */}
                <Carousel
                  title='New Released Shows'
                  data={newShowReleases}
                  isLoading={showsLoading}
                  error={showsError}
                  singlePoster={true}
                  isShow={true}
                  seasonCount={true}
                  showDuration={true}
                />
              </div>
            )}
          </>
        ) : (
          <>
            {/* Desktop View */}
            <div className='movies'>
              {/* Genres Carousel */}
              <Carousel
                title='Our Genres'
                data={randomMovies}
                isLoading={moviesLoading}
                error={moviesError}
                showGenreName={true}
                showArrow={true}
              />

              {/* Popular by Genre Carousel */}
              <Carousel
                title='Popular Top 10 In Genres'
                data={popularMovies}
                isLoading={moviesLoading}
                error={moviesError}
                showBadgeForPopular={true}
                showGenreName={true}
                showArrow={true}
              />

              {/* Trending Movies Carousel */}
              <Carousel
                title='Trending Movies'
                data={trendingMovies}
                isLoading={moviesLoading}
                error={moviesError}
                singlePoster={true}
                showDuration={true}
                showViwers={true}
              />

              {/* New Releases Carousel */}
              <Carousel
                title='New Releases'
                data={newMovieReleases}
                isLoading={moviesLoading}
                error={moviesError}
                singlePoster={true}
                showReleaseDate={true}
              />
            </div>
            <div className='shows'>
              {/* Genres Carousel */}
              <Carousel
                title='Our Genres'
                data={randomShows}
                isLoading={showsLoading}
                error={showsError}
                showGenreName={true}
                showArrow={true}
              />

              {/* Popular by Genre Carousel */}
              <Carousel
                title='Popular Top 10 In Genres'
                data={popularShows}
                isLoading={showsLoading}
                error={showsError}
                showBadgeForPopular={true}
                showGenreName={true}
                showArrow={true}
              />

              {/* Trending TV Shows Carousel */}
              <Carousel
                title='Trending Shows Now'
                data={trendingShows}
                isLoading={showsLoading}
                error={showsError}
                singlePoster={true}
                isShow={true}
                showDuration={true}
                seasonCount={true}
              />

              {/* New Releases Carousel */}
              <Carousel
                title='New Released Shows'
                data={newShowReleases}
                isLoading={showsLoading}
                error={showsError}
                singlePoster={true}
                isShow={true}
                seasonCount={true}
                showDuration={true}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoviesShowsPage;
