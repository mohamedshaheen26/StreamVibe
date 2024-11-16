import React from "react";
import HeroSection from "./components/HeroSection";
import CategoryCarousel from "./components/CategoryCarousel";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import DeviceCompatibility from "./components/DeviceCompatibility";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ErrorBoundary>
        <CategoryCarousel />
      </ErrorBoundary>
      <DeviceCompatibility />
    </>
  );
}

export default App;
