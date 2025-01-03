import React from "react";
import HeroSection from "../components/HeroSection";
import Carousel from "../components/Carousel";
import ErrorBoundary from "../components/ErrorBoundary";
import DeviceCompatibility from "../components/DeviceCompatibility";
import FAQSection from "../components/FAQSection";
import SubscriptionPlans from "../components/SubscriptionPlans";
import useMoviesShowsData from "../hooks/useMoviesShowsData";

function App() {
  const { randomMoviesByGenre, loading } = useMoviesShowsData("movie");

  return (
    <>
      <HeroSection />
      <ErrorBoundary>
        <div className='container'>
          <Carousel
            title='Explore our wide variety of categories'
            description="Whether you're looking for a comedy to make you laugh, a drama to make
          you think, or a documentary to learn something new"
            data={randomMoviesByGenre}
            isLoading={loading}
            error={null}
            showGenreName={true}
            showArrow={true}
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
