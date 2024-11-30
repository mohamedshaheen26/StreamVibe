import React from "react";
import HeroSection from "../components/HeroSection";
import Carousel from "../components/Carousel";
import ErrorBoundary from "../components/ErrorBoundary";
import DeviceCompatibility from "../components/DeviceCompatibility";
import FAQSection from "../components/FAQSection";
import SubscriptionPlans from "../components/SubscriptionPlans";
import useMoviesShowsData from "../hooks/useMoviesShowsData";

function App() {
  const { genres, popularByGenre, trending, newReleases, loading } =
    useMoviesShowsData("movie");

  return (
    <>
      <HeroSection />
      <ErrorBoundary>
        <div className='container'>
          <Carousel
            title='Explore our wide variety of categories'
            description="Whether you're looking for a comedy to make you laugh, a drama to make
          you think, or a documentary to learn something new"
            data={genres.map((genre) => ({
              ...genre,
              topRatedMovies: popularByGenre[genre.id] || [],
            }))}
            isLoading={loading}
            error={null}
            showGenreName={true}
          />
        </div>
      </ErrorBoundary>
      <DeviceCompatibility />
      <FAQSection />
      <SubscriptionPlans />
    </>
  );
}

export default App;
