import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../config";

function useMoviesShowsData(type = "movie") {
  const [data, setData] = useState({
    genres: [],
    randomMoviesByGenre: [], // Random 4 posters per genre
    popularByGenre: [], // Top popular movies/shows by genre
    trending: [], // Trending movies/shows
    newReleases: [], // New releases
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (type !== "movie" && type !== "tv") {
      console.error(`Invalid type: ${type}. Must be "movie" or "tv".`);
      setError(new Error("Invalid type specified."));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch genres
        const genreResponse = await axios.get(
          `${API_BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=en-US`
        );
        const genreList = genreResponse.data.genres || [];

        // Fetch random 4 posters for each genre
        const randomMoviesByGenre = await Promise.all(
          genreList.map(async (genre) => {
            const response = await axios.get(
              `${API_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre.id}&language=en-US&sort_by=popularity.desc&page=1`
            );
            const movies = response.data.results;
            const randomMovies = movies
              .sort(() => 0.5 - Math.random())
              .slice(0, 4); // Random 4 posters
            return {
              id: genre.id,
              name: genre.name,
              topRatedMovies: randomMovies,
            };
          })
        );

        // Fetch top popular movies/shows for each genre
        const popularByGenre = await Promise.all(
          genreList.map(async (genre) => {
            const response = await axios.get(
              `${API_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre.id}&language=en-US&sort_by=popularity.desc&page=1`
            );
            return {
              id: genre.id,
              name: genre.name,
              topRatedMovies: response.data.results.slice(0, 4), // Top 4 popular
            };
          })
        );

        // Fetch trending items
        const trendingResponse = await axios.get(
          `${API_BASE_URL}/trending/${type}/week?api_key=${API_KEY}&language=en-US`
        );
        const trendingTransformed = trendingResponse.data.results.map(
          (movie) => ({
            topRatedMovies: [movie], // Wrap the movie in an array
          })
        );

        // Fetch new releases
        const newReleasesEndpoint =
          type === "movie"
            ? `${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`
            : `${API_BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US`;
        const newReleasesResponse = await axios.get(newReleasesEndpoint);
        const newReleasesTransformed = newReleasesResponse.data.results.map(
          (movie) => ({
            topRatedMovies: [movie], // Wrap the movie in an array
          })
        );

        // Consolidate all data
        setData({
          genres: genreList,
          randomMoviesByGenre, // Random 4 posters per genre
          popularByGenre, // Top popular by genre
          trending: trendingTransformed, // Trending
          newReleases: newReleasesTransformed, // New releases
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return { ...data, loading, error };
}

export default useMoviesShowsData;
