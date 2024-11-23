import React, { useState, useEffect } from "react";
import "./index.css";
import Home from "./pages/Home.jsx";
import StreamVibeLoader from "./components/StreamVibeLoader";

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
    <div className='App'>
      <Home />
    </div>
  );
};

export default App;
