import React, { useEffect, useState } from "react";
import usePopularMovies from "@/hooks/usePopularMovies";
import Navbar from "./Navbar.jsx";

function HeroSection() {
  const images = usePopularMovies();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fullText =
    "StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.";

  const shortText =
    "StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere.";

  return (
    <>
      <section className='hero-section'>
        <Navbar />
        <div className='mosaic-background'>
          {images.map((url, index) => (
            <div key={index} className='mosaic-image'>
              <img src={url} alt={`Movie poster ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className='hero-overlay'></div>
      </section>
      <section className='hero-content'>
        <div className='container'>
          <h1>The Best Streaming Experience</h1>
          <p>{isMobile ? shortText : fullText}</p>
          <button className='btn btn-danger watch-btn'>
            <i className='fas fa-play'></i>
            Start Watching Now
          </button>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
