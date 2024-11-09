import React from "react";
import HeroSection from "./components/HeroSection";
import CategoryCarousel from "./components/CategoryCarousel";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

function App() {
  return (
    <div className='App'>
      <HeroSection />
      <ErrorBoundary>
        <CategoryCarousel />
      </ErrorBoundary>
    </div>
  );
}

export default App;
