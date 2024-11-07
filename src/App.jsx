import React from "react";
import Navbar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import MovieGrid from "./components/MovieGrid";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <HeroSection />
      <MovieGrid />
    </div>
  );
}

export default App;
