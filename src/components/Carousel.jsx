import React, { useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ThreeDots } from "react-loader-spinner";

import useResposiveScreen from "../hooks/useResposiveScreen.js";

let carouselCounter = 0;

const formatValue = (value, type = "number") => {
  if (type === "runtime") {
    // Format runtime (in minutes) to "1h 30m"
    if (!value) return "N/A"; // Handle missing runtime
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  } else if (type === "date") {
    // Format date (e.g., "2022-04-01" → "1 Apr 2022")
    if (!value) return "N/A"; // Handle missing date
    const date = new Date(value);
    const day = date.getDate(); // Get the day (1-31)
    const month = date.toLocaleString("en-US", { month: "long" }); // Get the full month name
    const year = date.getFullYear(); // Get the year
    return `${day} ${month.slice(0, 3)} ${year}`; // Slice month to first 3 characters
  } else {
    // Format numbers (e.g., 1000 → 1K, 1500 → 1.5K)
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return `${((value * 100) / 1000).toFixed(1)}K`;
  }
};

const Carousel = ({
  title,
  description,
  data,
  isShow = false,
  showBadgeForPopular = false,
  showGenreName = false,
  showArrow = false,
  showDuration = false,
  showViwers = false,
  showReleaseDate = false,
  singlePoster = false,
  seasonCount = false,
  isLoading,
  error,
  onGenreClicked,
}) => {
  const isMobile = useResposiveScreen();
  const carouselId = `carousel-${carouselCounter++}`;
  const swiperRef = useRef(null);

  if (error) {
    return (
      <p>
        Error loading {title}: {error.message}
      </p>
    );
  }

  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current.update();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className='category-carousel' id='categories'>
      <h2>{title}</h2>
      {description ? <p className='description'>{description}</p> : ""}

      {/* Conditionally render based on mobile or desktop */}
      {!isLoading &&
        (isMobile ? (
          <div className='swiper-progress-bar custom-swiper-progress-bar'>
            <div
              className={`swiper-progress-fill-${carouselId} custom-swiper-progress-fill`}
            ></div>
          </div>
        ) : (
          <div className='swiper-control d-flex align-items-center'>
            <div
              className={`custom-prev-${carouselId} carousel-prev p-3 d-flex align-items-center justify-content-center`}
            >
              <i className='fas fa-arrow-left'></i>
            </div>
            <div
              className={`custom-pagination-${carouselId} d-flex mx-1`}
            ></div>
            <div
              className={`custom-next-${carouselId} carousel-next p-3 d-flex align-items-center justify-content-center`}
            >
              <i className='fas fa-arrow-right'></i>
            </div>
          </div>
        ))}
      {isLoading ? (
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
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          navigation={
            isMobile
              ? false
              : {
                  nextEl: `.custom-next-${carouselId}`,
                  prevEl: `.custom-prev-${carouselId}`,
                }
          }
          pagination={
            isMobile
              ? {
                  type: "progressbar",
                  el: `.swiper-progress-fill-${carouselId}`,
                }
              : {
                  clickable: true,
                  type: "bullets",
                  el: `.custom-pagination-${carouselId}`,
                  bulletClass: "swiper-pagination-bullet",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                }
          }
          breakpoints={{
            420: {
              slidesPerView: singlePoster ? 2 : 2,
              slidesPerGroup: singlePoster ? 2 : 2,
            },
            991: {
              slidesPerView: singlePoster ? 3 : 2,
              slidesPerGroup: singlePoster ? 3 : 2,
            },
            1200: {
              slidesPerView: singlePoster ? 4 : 3,
              slidesPerGroup: singlePoster ? 4 : 3,
            },
            1440: {
              slidesPerView: singlePoster ? (isShow ? 4 : 5) : 4,
              slidesPerGroup: singlePoster ? (isShow ? 4 : 5) : 4,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {data.map((genre, index) => (
            <SwiperSlide
              key={index}
              className={
                isMobile
                  ? `custom__swiper-slide ${
                      singlePoster
                        ? `custom__single-swiper-silde 
                      ${isShow ? "increase__width" : ""}`
                        : ""
                    }`
                  : ""
              }
            >
              <div
                className='genre-section'
                onClick={() => onGenreClicked(genre)}
              >
                <div
                  className={`poster-grid ${singlePoster && "single-poster"}`}
                >
                  {genre.topRatedMovies?.map((movie, idx) => (
                    <div key={idx} className='poster-item'>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={`${movie.title || movie.name} poster`}
                        className='poster-image'
                        loading='lazy'
                      />
                    </div>
                  ))}
                </div>
                <div
                  className={`swiper-footer ${
                    showReleaseDate && "justify-content-center"
                  }`}
                >
                  {!showReleaseDate && (
                    <>
                      <div className='swiper-footer-left'>
                        {showBadgeForPopular && (
                          <span className='badge top-ten'>Top 10 In</span>
                        )}
                        {showGenreName && <p>{genre.name}</p>}
                        {showDuration && (
                          <p className='badge__single-Poster'>
                            <img
                              src='./assets/duration.svg'
                              alt='duration For movie'
                            />

                            {formatValue(
                              genre.topRatedMovies[0].runtime,
                              "runtime"
                            )}
                          </p>
                        )}
                      </div>
                      <div className='swiper-footer-right'>
                        {showArrow && (
                          <a href='#'>
                            <i className='fas fa-arrow-right'></i>
                          </a>
                        )}
                        {showViwers && (
                          <p className='badge__single-Poster'>
                            <img src='./assets/eye_viewers.svg' alt='Viewers' />
                            {formatValue(genre.topRatedMovies[0].popularity)}
                          </p>
                        )}
                        {seasonCount && (
                          <p className='badge__single-Poster'>
                            <img
                              src='./assets/season_Count.svg'
                              alt='duration For movie'
                            />
                            {genre.topRatedMovies[0].numberOfSeasons} Season
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  {showReleaseDate && (
                    <p className='badge__single-Poster w-100'>
                      Released at{" "}
                      <span>
                        {formatValue(
                          genre.topRatedMovies[0].release_date,
                          "date"
                        )}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Carousel;
