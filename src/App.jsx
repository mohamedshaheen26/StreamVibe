import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import MoviesShows from "./pages/MoviesShows.jsx";
import GenrePage from "./pages/GenrePage";
import MovieDetails from "./pages/MovieDetails";
import Support from "./pages/Support.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";

import StreamVibeLoader from "./components/StreamVibeLoader";
import FreeTrial from "./components/FreeTrial.jsx";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for effect
    const timer = setTimeout(() => setLoading(false), 3000); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <StreamVibeLoader />;
  }

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies&shows' element={<MoviesShows />} />
            <Route
              path='/movies&shows/genre/:id/:type'
              element={<GenrePage />}
            />
            <Route
              path='/movies&shows/genre/:id/:type/:movieId'
              element={<MovieDetails />}
            />
            <Route path='/support' element={<Support />} />
            <Route path='/subscriptions' element={<Subscriptions />} />
          </Routes>
        </main>
        <FreeTrial />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
