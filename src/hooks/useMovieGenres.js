import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../config";

function useMovieGenres() {
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Fetch genres first
        const genreResponse = await axios.get(
          `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const genreList = genreResponse.data.genres;
        setGenres(genreList);

        // Fetch movies for each genre
        const genreMovies = await Promise.all(
          genreList.map(async (genre) => {
            const response = await axios.get(
              `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&language=en-US&page=1`
            );
            return {
              genreId: genre.id,
              genreName: genre.name,
              // posterPath: response.data.results.length
              //   ? response.data.results
              //       .slice(0, 4)
              //       .map((movie) => movie.poster_path)[0] // Take the first movie's poster
              //   : null,
              posterPath: response.data.results.slice(0, 4).map((movie) => movie.poster_path), // Fetch 4 posters
            };
          })
        );

        // Map genres to movie posters
        const moviesMap = genreMovies.reduce((acc, curr) => {
          acc[curr.genreId] = curr.posterPath;
          return acc;
        }, {});

        setMoviesByGenre(moviesMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie genres:", error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, moviesByGenre, isLoading: loading };
}

export default useMovieGenres;
