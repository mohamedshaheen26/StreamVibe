import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import useMovieGenres from "@/hooks/useMovieGenres";

const CategoryCarousel = () => {
  const { genres, moviesByGenre, isLoading, error } = useMovieGenres();

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
    <div className='category-carousel'>
      <div className='container'>
        <h2>Explore our wide variety of categories</h2>
        <p>
          Whether you're looking for a comedy to make you laugh, a drama to make
          you think, or a documentary to learn something new
        </p>
        <div className='swiper-control'>
          <div className='custom-prev'>
            <i className='fas fa-arrow-left'></i>
          </div>
          <div className='custom-pagination'></div>
          <div className='custom-next'>
            <i className='fas fa-arrow-right'></i>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination]} // Enable Pagination and Navigation
          spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={4} // Scroll 4 slides at a time
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{
            clickable: false,
            type: "bullets", // Use default bullet pagination type
            el: ".custom-pagination", // Custom pagination element
            bulletClass: "swiper-pagination-bullet", // Add custom class for bullets
            bulletActiveClass: "swiper-pagination-bullet-active", // Active class for the bullet
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {genres.map((category) => (
            <SwiperSlide key={category.id}>
              <div className='category-card'>
                <div className='images-grid'>
                  {moviesByGenre[category.id]?.map((poster, index) => (
                    <img
                      key={index}
                      src={
                        poster
                          ? `https://image.tmdb.org/t/p/w200${poster}`
                          : "https://via.placeholder.com/200"
                      }
                      alt={`${category.name} poster ${index + 1}`}
                    />
                  ))}
                </div>
                <div className='swiper-footer'>
                  <p>{category.name}</p>
                  <a href='#'>
                    <i className='fas fa-arrow-right'></i>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoryCarousel;
