import React, { useState } from "react";
import Slider from "react-slick";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Carousel from "../components/Carousel";
import CustomButton from "../components/CustomButton";
import ToggleTabs from "../components/ToggleTabs";
import TrailerModal from "../components/TrailerModal";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import useMoviesShowsData from "@/hooks/useMoviesShowsData";
import useResposiveScreen from "../hooks/useResposiveScreen";
import usePopularMovies from "../hooks/usePopularMovies";

const MoviesShowsPage = () => {
  const isMobile = useResposiveScreen();
  const [activeTab, setActiveTab] = useState("Movies");
  const { movies, loading, error } = usePopularMovies();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

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
    autoplay: true,
    autoplaySpeed: 5000,
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
  const handleGenreClick = (genre, type) =>
    navigate(`/movies&shows/genre/${genre.id}/${type}`);
  console.log(movies);

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
          {loading ? (
            <ThreeDots
              visible={true}
              height='80'
              width='80'
              color='#e50000'
              radius='9'
              ariaLabel='three-dots-loading'
              wrapperClass='three-dots-loader'
            />
          ) : (
            <Slider {...settings}>
              {movies
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 3)
                .map((movie) => (
                  <div key={movie.id} className='movie-slide'>
                    <div
                      className='movie-poster'
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                      }}
                    >
                      <div className='movie-content'>
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                        <div className='action-btn'>
                          <CustomButton
                            id='play-tooltip'
                            className={`custom-button me-4 ${
                              isMobile ? "w-100 mb-4" : ""
                            }`}
                            icon='fa-play'
                            label='Play Now'
                            noMargin={false}
                            title='Play the movie'
                            onClick={() => setSelectedMovie(movie)}
                          />
                          <CustomButton
                            id={"add-tooltip"}
                            className='custom-button featured-btn me-2'
                            icon='fa-plus'
                            noMargin={true}
                            title='Add to Watchlist'
                          />
                          <CustomButton
                            id={"like-tooltip"}
                            className='custom-button featured-btn me-2'
                            icon='fa-thumbs-up'
                            noMargin={true}
                            title={movie.isLiked ? "Unlike" : "Like"}
                          />
                          <CustomButton
                            id={"volume-tooltip"}
                            className='custom-button featured-btn me-2'
                            icon='fa-volume-up'
                            noMargin={true}
                            title={movie.isMuted ? "Unmute" : "Mute"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          )}
          <Tooltip id='play-tooltip' place='bottom' />
          <Tooltip id='add-tooltip' place='bottom' />
          <Tooltip id='like-tooltip' place='bottom' />
          <Tooltip id='volume-tooltip' place='bottom' />
        </div>

        {isMobile ? (
          <>
            {/* Toggle Tabs for Mobile */}
            <ToggleTabs
              tabs={["Movies", "Shows"]}
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
                  onGenreClicked={(genre) => handleGenreClick(genre, "movies")}
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
                  onGenreClicked={(genre) => handleGenreClick(genre, "movies")}
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
                  onGenreClicked={(genre) => handleGenreClick(genre, "movies")}
                />

                {/* New Releases Carousel */}
                <Carousel
                  title='New Releases'
                  data={newMovieReleases}
                  isLoading={moviesLoading}
                  error={moviesError}
                  singlePoster={true}
                  showReleaseDate={true}
                  onGenreClicked={(genre) => handleGenreClick(genre, "movies")}
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
                  onGenreClicked={(genre) => handleGenreClick(genre, "shows")}
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
                  onGenreClicked={(genre) => handleGenreClick(genre, "shows")}
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
                  onGenreClicked={(genre) => handleGenreClick(genre, "shows")}
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
                  onGenreClicked={(genre) => handleGenreClick(genre, "shows")}
                />
              </div>
            )}
          </>
        ) : (
          <>
            {/* Desktop View */}
            <div className='movies__shows' data-genre='Movies'>
              {/* Genres Carousel */}
              <Carousel
                title='Our Genres'
                data={randomMovies}
                isLoading={moviesLoading}
                error={moviesError}
                showGenreName={true}
                showArrow={true}
                onGenreClicked={(genre) => handleGenreClick(genre, "movies")}
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
                onGenreClicked={(genre) => handleGenreClick(genre, "movies")}
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
                onGenreClicked={(genre) => handleGenreClick(genre, "movies")}
              />

              {/* New Releases Carousel */}
              <Carousel
                title='New Releases'
                data={newMovieReleases}
                isLoading={moviesLoading}
                error={moviesError}
                singlePoster={true}
                showReleaseDate={true}
                onGenreClicked={(genre) => handleGenreClick(genre, "movies")}
              />
            </div>
            <div className='movies__shows' data-genre='Shows'>
              {/* Genres Carousel */}
              <Carousel
                title='Our Genres'
                data={randomShows}
                isLoading={showsLoading}
                error={showsError}
                showGenreName={true}
                showArrow={true}
                onGenreClicked={(genre) => handleGenreClick(genre, "shows")}
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
                onGenreClicked={(genre) => handleGenreClick(genre, "shows")}
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
                onGenreClicked={(genre) => handleGenreClick(genre, "shows")}
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
                onGenreClicked={(genre) => handleGenreClick(genre, "shows")}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoviesShowsPage;
