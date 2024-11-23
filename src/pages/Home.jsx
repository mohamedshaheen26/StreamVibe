import React from "react";
import HeroSection from "../components/HeroSection";
import CategoryCarousel from "../components/CategoryCarousel";
import ErrorBoundary from "../components/ErrorBoundary";
import Navbar from "../components/Navbar";
import DeviceCompatibility from "../components/DeviceCompatibility";
import FAQSection from "../components/FAQSection";
import SubscriptionPlans from "../components/SubscriptionPlans";
import FreeTrial from "../components/FreeTrial";
import Footer from "../components/Footer";

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
      <SubscriptionPlans />
      <FreeTrial />
    </>
  );
}

export default App;
