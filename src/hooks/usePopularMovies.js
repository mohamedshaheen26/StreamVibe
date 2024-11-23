import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../config";

function usePopularMovies() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allPosters = [];

        // Generate a consistent random page number daily
        const randomSeed = Math.floor(new Date().getDate() / 7); // Changes each week
        const randomPage = 1 + (randomSeed % 20); // Adjust range based on TMDB's max pages

        for (let i = 0; i < 2; i++) {
          const response = await axios.get(
            `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${
              randomPage + i
            }`
          );

          const posterUrls = response.data.results.map(
            (movie) => `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          );
          allPosters = [...allPosters, ...posterUrls];
        }

        setImages(allPosters.slice(0, 36)); // Limit to 36 posters
      } catch (error) {
        console.error("Error fetching popular movies:", err);
        setError("Failed to load popular movies.");
      }
    };

    fetchMovies();
  }, []);

  return images;
}

export default usePopularMovies;
