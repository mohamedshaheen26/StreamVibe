import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../config";

function usePopularMovies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allMovies = [];
        const moviesPerPage = 20; // TMDB returns 20 movies per page
        const totalMoviesNeeded = 36;
        const pagesNeeded = Math.ceil(totalMoviesNeeded / moviesPerPage);

        // Generate a consistent random page number daily
        const randomSeed = Math.floor(new Date().getDate() / 7); // Changes each week
        const randomPage = 1 + (randomSeed % 10); // Adjust range to avoid exceeding TMDB's max pages

        // Fetch top-rated movies
        for (let i = 0; i < pagesNeeded; i++) {
          const response = await axios.get(
            `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${
              randomPage + i
            }`
          );

          // Add the full movie data to the array
          allMovies = [...allMovies, ...response.data.results];

          // Stop fetching if we have enough movies
          if (allMovies.length >= totalMoviesNeeded) {
            break;
          }
        }

        // Limit to 36 movies
        const topMovies = allMovies.slice(0, totalMoviesNeeded);

        // Fetch additional images (posters and backdrops) for each movie
        const moviesWithImages = await Promise.all(
          topMovies.map(async (movie) => {
            const imagesResponse = await axios.get(
              `${API_BASE_URL}/movie/${movie.id}/images?api_key=${API_KEY}`
            );

            // Extract poster URLs and limit to 4 posters
            const posters = imagesResponse.data.posters
              .slice(0, 4) // Limit to 4 posters
              .map(
                (poster) => `https://image.tmdb.org/t/p/w500${poster.file_path}`
              );

            // Extract backdrop URLs and limit to 4 backdrops
            const backdrops = imagesResponse.data.backdrops
              .slice(0, 4) // Limit to 4 backdrops
              .map(
                (backdrop) =>
                  `https://image.tmdb.org/t/p/w1280${backdrop.file_path}`
              );

            // Fetch videos (trailers)
            const videosResponse = await axios.get(
              `${API_BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
            );

            // Find the first trailer (usually the official one)
            const trailer = videosResponse.data.results.find(
              (video) => video.type === "Trailer" && video.site === "YouTube"
            );

            // Add posters and backdrops to the movie object
            return {
              ...movie,
              posters,
              backdrops,
              isMuted: false,
              trailerUrl: trailer
                ? `https://www.youtube.com/embed/${trailer.key}`
                : null,
            };
          })
        );

        setMovies(moviesWithImages);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
        setError("Failed to load popular movies.");
      }
    };

    fetchMovies();
  }, []);

  return { movies, error };
}

export default usePopularMovies;
