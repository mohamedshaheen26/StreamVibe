import React from "react";
import HeroSection from "./components/HeroSection";
import CategoryCarousel from "./components/CategoryCarousel";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import DeviceCompatibility from "./components/DeviceCompatibility";
import FAQSection from "./components/FAQSection";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ErrorBoundary>
        <CategoryCarousel />
      </ErrorBoundary>
      <DeviceCompatibility />
      <FAQSection />
    </>
  );
}

export default App;
