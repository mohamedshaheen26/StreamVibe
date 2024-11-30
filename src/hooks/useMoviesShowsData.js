import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../config";

function useMoviesShowsData(type = "movie") {
  const [data, setData] = useState({
    genres: [],
    popularByGenre: {},
    trending: [],
    newReleases: [],
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

        // Fetch popular movies/shows by genre
        const genrePopular = await Promise.all(
          genreList.map(async (genre) => {
            const response = await axios.get(
              `${API_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre.id}&language=en-US&sort_by=popularity.desc`
            );
            return {
              genreId: genre.id,
              genreName: genre.name,
              topPopular: response.data.results.slice(0, 4),
            };
          })
        );

        const popularMap = genrePopular.reduce((acc, curr) => {
          acc[curr.genreId] = curr.topPopular;
          return acc;
        }, {});

        // Fetch trending items
        const trendingResponse = await axios.get(
          `${API_BASE_URL}/trending/${type}/week?api_key=${API_KEY}&language=en-US`
        );

        // Fetch new releases
        const newReleasesEndpoint =
          type === "movie"
            ? `${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`
            : `${API_BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US`;

        const newReleasesResponse = await axios.get(newReleasesEndpoint);

        // Consolidate all data
        setData({
          genres: genreList,
          popularByGenre: popularMap,
          trending: trendingResponse.data.results,
          newReleases: newReleasesResponse.data.results,
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
