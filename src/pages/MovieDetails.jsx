import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../config";
import TrailerModal from "../components/TrailerModal";
import { ThreeDots } from "react-loader-spinner";
import CustomButton from "../components/CustomButton";
import useResposiveScreen from "../hooks/useResposiveScreen";
import NotFound from "./NotFound";

const MovieDetails = () => {
  const { id, type, movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useResposiveScreen();
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch basic movie details
        const movieResponse = await axios.get(
          `${API_BASE_URL}/${type}/${movieId}`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );

        // Fetch credits (cast and crew)
        const creditsResponse = await axios.get(
          `${API_BASE_URL}/${type}/${movieId}/credits`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );

        // Fetch country of origin for each crew member
        const crewWithCountries = await Promise.all(
          creditsResponse.data.crew.map(async (crewMember) => {
            const personResponse = await axios.get(
              `${API_BASE_URL}/person/${crewMember.id}`,
              {
                params: {
                  api_key: API_KEY,
                },
              }
            );
            return {
              ...crewMember,
              country: personResponse.data.place_of_birth
                ? personResponse.data.place_of_birth.split(",").pop().trim()
                : "Unknown",
            };
          })
        );

        const [
          imagesResponse,
          videosResponse,
          similarResponse,
          reviewsResponse,
          trailerResponse,
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/${type}/${movieId}/images`, {
            params: {
              api_key: API_KEY,
            },
          }),
          axios.get(`${API_BASE_URL}/${type}/${movieId}/videos`, {
            params: {
              api_key: API_KEY,
            },
          }),
          axios.get(`${API_BASE_URL}/${type}/${movieId}/similar`, {
            params: {
              api_key: API_KEY,
            },
          }),
          axios.get(`${API_BASE_URL}/${type}/${movieId}/reviews`, {
            params: {
              api_key: API_KEY,
            },
          }),
          axios.get(`${API_BASE_URL}/${type}/${movieId}/videos`, {
            params: {
              api_key: API_KEY,
            },
          }),
        ]);

        // Fetch seasons and episodes (only for TV shows)
        let seasonsWithEpisodes = [];
        if (type === "tv") {
          const seasonsResponse = await axios.get(
            `${API_BASE_URL}/tv/${movieId}`,
            {
              params: {
                api_key: API_KEY,
              },
            }
          );

          // Fetch episodes for each season
          seasonsWithEpisodes = await Promise.all(
            seasonsResponse.data.seasons.map(async (season) => {
              const episodesResponse = await axios.get(
                `${API_BASE_URL}/tv/${movieId}/season/${season.season_number}`,
                {
                  params: {
                    api_key: API_KEY,
                  },
                }
              );
              return {
                ...season,
                episodes: episodesResponse.data.episodes,
              };
            })
          );
        }

        const trailer = videosResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        // Combine all data into a single object
        const movieData = {
          ...movieResponse.data,
          credits: {
            ...creditsResponse.data,
            crew: crewWithCountries,
          },
          images: imagesResponse.data,
          videos: videosResponse.data,
          similar: similarResponse.data,
          reviews: reviewsResponse.data.results,
          seasons: seasonsWithEpisodes,
          trailerUrl: trailer
            ? `https://www.youtube.com/embed/${trailer.key}`
            : null,
        };

        setMovie(movieData);
        console.log(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Please check your connection or try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, type]);

  // Custom Previous Arrow
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} onClick={onClick}></div>;
  };

  // Custom Next Arrow
  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} onClick={onClick}></div>;
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  var ReviewSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  if (loading) {
    return (
      <div className='loader-container'>
        <ThreeDots
          visible={true}
          height='80'
          width='80'
          color='#e50000'
          radius='9'
          ariaLabel='three-dots-loading'
          wrapperClass='three-dots-loader'
        />
      </div>
    );
  }

  if (error) {
    return <NotFound message={error} />;
  }

  if (!movie) {
    return <NotFound message='Movie not found.' />;
  }

  return (
    <div className='movies-shows-page'>
      <div className='container'>
        <div className='movie-details'>
          <div className='slider-Movies'>
            {selectedMovie && (
              <TrailerModal
                trailerUrl={selectedMovie.trailerUrl}
                onClose={() => setSelectedMovie(null)}
              />
            )}

            <div key={movie.id} className='movie-slide'>
              {/* Movie Poster */}
              <div
                className='movie-poster'
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
              >
                <div className='movie-content' style={{ bottom: 0 }}>
                  <h3>{movie.title || movie.name}</h3>
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
                      id='add-tooltip'
                      className='custom-button featured-btn me-2'
                      icon='fa-plus'
                      noMargin={true}
                      title='Add to Watchlist'
                    />
                    <CustomButton
                      id='like-tooltip'
                      className='custom-button featured-btn me-2'
                      icon='fa-thumbs-up'
                      noMargin={true}
                      title={movie.isLiked ? "Unlike" : "Like"}
                    />
                    <CustomButton
                      id='volume-tooltip'
                      className='custom-button featured-btn me-2'
                      icon='fa-volume-up'
                      noMargin={true}
                      title={movie.isMuted ? "Unmute" : "Mute"}
                    />

                    <Tooltip id='play-tooltip' place='bottom' />
                    <Tooltip id='add-tooltip' place='bottom' />
                    <Tooltip id='like-tooltip' place='bottom' />
                    <Tooltip id='volume-tooltip' place='bottom' />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-8'>
              {type === "tv" && (
                <div className='movie-info'>
                  <h3 className='text-white mb-5'>Seasons and Episodes</h3>
                  <div
                    className='accordion accordion-flush'
                    id='accordionFlushExample'
                  >
                    {movie.seasons.map((season) => (
                      <div
                        className='accordion-item border-0 mb-3'
                        key={season.id}
                      >
                        <h2 className='accordion-header'>
                          <button
                            className='accordion-button collapsed'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target={`#${season.id}`}
                            aria-expanded='false'
                            aria-controls={`flush-${season.id}`}
                          >
                            <h4 className='mb-0'>
                              Season{" "}
                              {season.season_number > 9
                                ? season.season_number
                                : `0${season.season_number}`}
                              <span className='ms-1'>
                                {season.episode_count} Episodes
                              </span>
                            </h4>
                          </button>
                        </h2>
                        <div
                          id={season.id}
                          className='accordion-collapse collapse'
                        >
                          <div className='accordion-body'>
                            <ul>
                              {season.episodes.map((episode) =>
                                isMobile ? (
                                  <li
                                    className='episode-card d-block'
                                    key={episode.id}
                                  >
                                    <div className='d-flex align-items-center mb-3'>
                                      <div className='eposide-img ms-0'>
                                        <img
                                          src={`https://image.tmdb.org/t/p/w200${episode.still_path}`}
                                          alt={episode.name}
                                          loading='lazy'
                                        />
                                      </div>
                                      <div className='counter'>
                                        {episode.episode_number > 9
                                          ? episode.episode_number
                                          : `0${episode.episode_number}`}
                                      </div>
                                    </div>
                                    <div className='episode-content'>
                                      <span className='mb-2'>
                                        <img
                                          src='/assets/duration.svg'
                                          alt='Time'
                                        />
                                        {episode.runtime} min
                                      </span>
                                      <h5>{episode.name}</h5>
                                    </div>
                                  </li>
                                ) : (
                                  <li
                                    className='episode-card d-flex align-items-center'
                                    key={episode.id}
                                  >
                                    <div className='counter'>
                                      {episode.episode_number > 9
                                        ? episode.episode_number
                                        : `0${episode.episode_number}`}
                                    </div>
                                    <div className='eposide-img'>
                                      <img
                                        src={`https://image.tmdb.org/t/p/w200${
                                          episode.still_path == null
                                            ? episode.still_path
                                            : episode.still_path
                                        }`}
                                        alt={episode.name}
                                        loading='lazy'
                                      />
                                    </div>
                                    <div className='episode-content w-100'>
                                      <div className='d-flex align-items-center justify-content-between mb-3'>
                                        <h5>{episode.name}</h5>
                                        <span>
                                          <img
                                            src='/assets/duration.svg'
                                            alt='Time'
                                          />
                                          {episode.runtime} min
                                        </span>
                                      </div>
                                      <p>{episode.overview}</p>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className='movie-info'>
                <h4>Overview</h4>
                <p>{movie.overview}</p>
              </div>
              <div className='movie-info cast-section'>
                <h4>Cast</h4>
                <div className='slider-container'>
                  {movie.credits.cast.length > 0 ? (
                    <Slider {...settings}>
                      {movie.credits.cast.slice(0, 15).map((actor) => (
                        <div key={actor.id} className='cast-member'>
                          <img
                            src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                            alt={actor.name}
                            loading='lazy'
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <p className='text-center'>No Cast Available</p>
                  )}
                </div>
              </div>
              <div className='movie-info reviews'>
                <div className='d-flex justify-content-between mb-5'>
                  <h4 className='mb-0'>Reviews</h4>
                  <CustomButton
                    label='Add Your Review'
                    className='custom-button add__review'
                  />
                </div>
                <Slider {...ReviewSettings}>
                  {movie.reviews.length > 0 ? (
                    movie.reviews.slice(0, 8).map((review) => {
                      const date = new Date(review.created_at);

                      // Format the date and time
                      const formattedDate = `${date.getFullYear()}-${String(
                        date.getMonth() + 1
                      ).padStart(2, "0")}-${String(date.getDate()).padStart(
                        2,
                        "0"
                      )}`;
                      const formattedTime = date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      });

                      return (
                        <div
                          key={review.id}
                          className='badge__movie__details review'
                        >
                          <div className='reviewer d-flex justify-content-between align-items-center'>
                            <h5>{review.author}</h5>
                            <div className='badge__movie__details rate author_rate'>
                              <div className='star-rating'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={`star ${
                                      star <=
                                      Math.round(
                                        review.author_details.rating / 2
                                      )
                                        ? "filled"
                                        : ""
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                                <span>
                                  {(review.author_details.rating / 2).toFixed(
                                    1
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p
                            dangerouslySetInnerHTML={{ __html: review.content }}
                          />
                          <span className='review-date'>
                            {formattedDate} {formattedTime}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <p className='text-center'>No reviews yet.</p>
                  )}
                </Slider>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='movie-info'>
                <div className='release-date mb-4'>
                  <h4>
                    <img src='/assets/Released_Date.png' alt='Released Date' />
                    Released Year
                  </h4>
                  <p className='fw-bold'>
                    {type === "tv"
                      ? movie.first_air_date.split("-")[0] || "-"
                      : movie.release_date.split("-")[0] || "-"}
                  </p>
                </div>
                <div className='available_languages mb-4'>
                  <h4>
                    <img
                      src='/assets/Available_Languages.png'
                      alt='Available_Languages.png'
                    />
                    Available Languages
                  </h4>
                  <div className='d-flex flex-wrap gap-2'>
                    {movie.spoken_languages.map((language) => {
                      return (
                        <span
                          key={language.english_name}
                          className='badge__movie__details'
                        >
                          {language.english_name}
                        </span>
                      );
                    })}
                  </div>
                  <p></p>
                </div>
                <div className='rating mb-4'>
                  <h4>
                    <img src='/assets/Rating.png' alt='Rating' />
                    Rating
                  </h4>
                  <div className='d-flex flex-wrap gap-2'>
                    <div className='badge__movie__details rate'>
                      TMDB
                      <div className='star-rating'>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`star ${
                              star <= Math.round(movie.vote_average / 2)
                                ? "filled"
                                : ""
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span>{(movie.vote_average / 2).toFixed(1)}</span>
                      </div>
                    </div>
                    <div className='badge__movie__details rate'>
                      StreamVibe
                      <div className='star-rating'>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`star ${
                              star <= Math.round(movie.vote_average / 2 - 0.5)
                                ? "filled"
                                : ""
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span>{(movie.vote_average / 2).toFixed(1) - 0.5}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='genres mb-4'>
                  <h4>
                    <img src='/assets/Genres.png' alt='Genres' />
                    Genres
                  </h4>
                  <div className='d-flex flex-wrap gap-2'>
                    {movie.genres.map((genre) => {
                      return (
                        <span key={genre.id} className='badge__movie__details'>
                          {genre.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className='crew mb-4'>
                  <h4>Director</h4>
                  {movie.credits.crew > 0 ? (
                    movie.credits.crew
                      .filter(
                        (member) =>
                          member.job === "Director" ||
                          member.job === "Executive Producer"
                      )
                      .map((member) => {
                        return (
                          <div
                            key={member.id}
                            className='badge__movie__details director mb-2'
                          >
                            <div className='img'>
                              <img
                                src={`${
                                  member.profile_path != null
                                    ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                                    : `/assets/profile-picture.png`
                                }`}
                                alt='Profile Picture'
                              />
                            </div>{" "}
                            <div className='text-content'>
                              <h4 className='text-white mb-1'>{member.name}</h4>
                              <span>From {member.country || "Unknown"}</span>
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
