import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import useMovieGenres from "@/hooks/useMovieGenres";
import useResposiveScreen from "../hooks/useResposiveScreen.js";

const CategoryCarousel = () => {
  const { genres, topRatedByGenre, isLoading, error } = useMovieGenres();
  const isMobile = useResposiveScreen();

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error loading categories: {error.message}</p>;
  }

  if (!genres || genres.length === 0) {
    return <p>No categories found.</p>;
  }

  return (
    <section className='category-carousel' id='category-carousel'>
      <div className='container'>
        <h2>Explore our wide variety of categories</h2>
        <p>
          Whether you're looking for a comedy to make you laugh, a drama to make
          you think, or a documentary to learn something new
        </p>

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
          {genres.map((genre) => (
            <SwiperSlide key={genre.id}>
              <div className='genre-section'>
                <div className='poster-grid'>
                  {topRatedByGenre[genre.id]?.map((posterPath, index) => (
                    <img
                      key={index}
                      src={
                        posterPath
                          ? `https://image.tmdb.org/t/p/w200${posterPath}`
                          : "https://via.placeholder.com/200"
                      }
                      alt={`Top-rated movie poster ${index + 1} for ${
                        genre.name
                      }`}
                      className='poster-image'
                    />
                  ))}
                </div>
                <div className='swiper-footer'>
                  <p>{genre.name}</p>
                  <a href='#'>
                    <i className='fas fa-arrow-right'></i>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryCarousel;
