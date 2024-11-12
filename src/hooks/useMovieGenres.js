import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../config";

function useMovieGenres() {
  const [genres, setGenres] = useState([]); // Store genres list
  const [topRatedByGenre, setTopRatedByGenre] = useState({}); // Store top-rated posters by genre
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Fetch genres list
        const genreResponse = await axios.get(
          `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const genreList = genreResponse.data.genres;
        setGenres(genreList);

        // Fetch top-rated movies per genre
        const genreTopRated = await Promise.all(
          genreList.map(async (genre) => {
            const response = await axios.get(
              `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&language=en-US&sort_by=vote_average.desc&vote_count.gte=100`
            );
            return {
              genreId: genre.id,
              genreName: genre.name,
              topRatedPosters: response.data.results
                .slice(0, 4)
                .map((movie) => movie.poster_path), // Top 4 top-rated posters
            };
          })
        );

        // Map genres to their top-rated posters
        const topRatedMap = genreTopRated.reduce((acc, curr) => {
          acc[curr.genreId] = curr.topRatedPosters;
          return acc;
        }, {});

        setTopRatedByGenre(topRatedMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top-rated movies by genre:", error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, topRatedByGenre, isLoading: loading };
}

export default useMovieGenres;
