import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
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
            {/* Add future pages here */}
            <Route
              path='/movies'
              element={
                <div
                  className='text-center'
                  style={{ padding: " 100px", fontSize: "100px" }}
                >
                  Coming Soon!
                </div>
              }
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
