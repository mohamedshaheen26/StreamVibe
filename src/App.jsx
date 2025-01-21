import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <StreamVibeLoader />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  const validRoutes = [
    "/",
    "/movies&shows",
    "/movies&shows/genre/:id/:type",
    "/movies&shows/genre/:id/:type/:movieId",
    "/support",
    "/subscriptions",
  ];

  const isRouteValid = validRoutes.some((route) => {
    const routePattern = new RegExp(
      `^${route.replace(/:\w+/g, "\\w+").replace(/\//g, "\\/")}$`
    );
    return routePattern.test(location.pathname);
  });

  const isNotFoundPage = !isRouteValid;

  return (
    <div className='App'>
      {!isNotFoundPage && <Navbar />}

      <ScrollToTop />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies&shows' element={<MoviesShows />} />
          <Route path='/movies&shows/genre/:id/:type' element={<GenrePage />} />
          <Route
            path='/movies&shows/genre/:id/:type/:movieId'
            element={<MovieDetails />}
          />
          <Route path='/support' element={<Support />} />
          <Route path='/subscriptions' element={<Subscriptions />} />

          <Route path='*' element={<NotFound message='' />} />
        </Routes>
      </main>

      {!isNotFoundPage && (
        <>
          <FreeTrial />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
