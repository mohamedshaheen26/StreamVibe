import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import useResposiveScreen from "../hooks/useResposiveScreen.js";
import { ThreeDots } from "react-loader-spinner";

// Reusable Carousel Component
const Carousel = ({
  title,
  description,
  data,
  showBadgeForPopular = false,
  showGenreName = false,
  showTimeline = false,
  showViwers = false,
  isLoading,
  error,
}) => {
  const isMobile = useResposiveScreen();

  if (error) {
    return (
      <p>
        Error loading {title}: {error.message}
      </p>
    );
  }

  return (
    <section className='category-carousel'>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : ""}

      {/* Conditionally render based on mobile or desktop */}
      {isMobile ? (
        <div className='swiper-progress-bar'>
          <div className='swiper-progress-fill'></div>
        </div>
      ) : (
        <div className='swiper-control d-flex align-items-center'>
          <div className='custom-prev p-3 d-flex align-items-center justify-content-center'>
            <i className='fas fa-arrow-left'></i>
          </div>
          <div className='custom-pagination'></div>
          <div className='custom-next p-3 d-flex align-items-center justify-content-center'>
            <i className='fas fa-arrow-right'></i>
          </div>
        </div>
      )}
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
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }
          }
          pagination={
            isMobile
              ? { type: "progressbar", el: ".swiper-progress-fill" }
              : {
                  clickable: true,
                  type: "bullets",
                  el: ".custom-pagination",
                  bulletClass: "swiper-pagination-bullet",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                }
          }
          breakpoints={{
            420: { slidesPerView: 2, slidesPerGroup: 2 },
            991: { slidesPerView: 3, slidesPerGroup: 3 },
            1440: { slidesPerView: 4, slidesPerGroup: 4 },
          }}
        >
          {data.map((genre, index) => (
            <SwiperSlide key={index}>
              <div className='genre-section'>
                <div className='poster-grid'>
                  {genre.topRatedMovies?.map((movie, idx) => (
                    <div key={idx} className='poster-item'>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={`${movie.title || movie.name} poster`}
                        className='poster-image'
                      />
                    </div>
                  ))}
                </div>
                <div className='swiper-footer'>
                  <div className='swiper-footer-left'>
                    {showBadgeForPopular && (
                      <span className='badge top-ten'>Top 10 In</span>
                    )}
                    {showGenreName && <p>{genre.name}</p>}
                    {showTimeline && <p>{genre.release_date}</p>}
                  </div>
                  <div className='swiper-footer-right'>
                    <a href='#'>
                      <i className='fas fa-arrow-right'></i>
                    </a>
                    {showViwers && <p>{genre.viewers}</p>}
                  </div>
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
