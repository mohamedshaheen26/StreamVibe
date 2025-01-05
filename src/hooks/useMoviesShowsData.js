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

  // Function to fetch total runtime for a single TV show
  const fetchTotalRuntimeForShow = async (showId) => {
    try {
      // Fetch show details to get the number of seasons
      const showDetailsResponse = await axios.get(
        `${API_BASE_URL}/tv/${showId}?api_key=${API_KEY}&language=en-US`
      );
      const numberOfSeasons = showDetailsResponse.data.number_of_seasons;

      let totalRuntime = 0;

      // Fetch episode details for each season and sum the runtime
      for (
        let seasonNumber = 1;
        seasonNumber <= numberOfSeasons;
        seasonNumber++
      ) {
        try {
          const seasonResponse = await axios.get(
            `${API_BASE_URL}/tv/${showId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
          );
          const episodes = seasonResponse.data.episodes;

          // Sum the runtime for all episodes in this season
          episodes.forEach((episode) => {
            if (episode.runtime) {
              totalRuntime += episode.runtime;
            }
          });
        } catch (seasonError) {
          // Skip this season and continue with the next one
          continue;
        }
      }

      return totalRuntime;
    } catch (error) {
      console.error("Error fetching total runtime for show:", error);
      return null;
    }
  };

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

            // Fetch additional details (runtime for movies, number of seasons for TV shows)
            const moviesWithDetails = await Promise.all(
              randomMovies.map(async (movie) => {
                const detailsResponse = await axios.get(
                  `${API_BASE_URL}/${type}/${movie.id}?api_key=${API_KEY}&language=en-US`
                );
                if (type === "tv") {
                  const totalRuntime = await fetchTotalRuntimeForShow(movie.id);
                  return {
                    ...movie,
                    runtime: totalRuntime, // Total runtime for TV shows
                    numberOfSeasons: detailsResponse.data.number_of_seasons, // Add number of seasons
                  };
                } else {
                  return {
                    ...movie,
                    runtime: detailsResponse.data.runtime, // Runtime for movies
                  };
                }
              })
            );

            return {
              id: genre.id,
              name: genre.name,
              topRatedMovies: moviesWithDetails,
            };
          })
        );

        // Fetch top popular movies/shows for each genre
        const popularByGenre = await Promise.all(
          genreList.map(async (genre) => {
            const response = await axios.get(
              `${API_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre.id}&language=en-US&sort_by=popularity.desc&page=1`
            );
            const movies = response.data.results.slice(0, 4); // Top 4 popular

            // Fetch additional details (runtime for movies, number of seasons for TV shows)
            const moviesWithDetails = await Promise.all(
              movies.map(async (movie) => {
                const detailsResponse = await axios.get(
                  `${API_BASE_URL}/${type}/${movie.id}?api_key=${API_KEY}&language=en-US`
                );
                if (type === "tv") {
                  const totalRuntime = await fetchTotalRuntimeForShow(movie.id);
                  return {
                    ...movie,
                    runtime: totalRuntime, // Total runtime for TV shows
                    numberOfSeasons: detailsResponse.data.number_of_seasons, // Add number of seasons
                  };
                } else {
                  return {
                    ...movie,
                    runtime: detailsResponse.data.runtime, // Runtime for movies
                  };
                }
              })
            );

            return {
              id: genre.id,
              name: genre.name,
              topRatedMovies: moviesWithDetails,
            };
          })
        );

        // Fetch trending items
        const trendingResponse = await axios.get(
          `${API_BASE_URL}/trending/${type}/week?api_key=${API_KEY}&language=en-US`
        );
        const trendingTransformed = await Promise.all(
          trendingResponse.data.results.map(async (movie) => {
            const detailsResponse = await axios.get(
              `${API_BASE_URL}/${type}/${movie.id}?api_key=${API_KEY}&language=en-US`
            );

            // Fetch total runtime for TV shows
            let totalRuntime = null;
            if (type === "tv") {
              const numberOfSeasons = detailsResponse.data.number_of_seasons;
              totalRuntime = 0;

              // Fetch episode details for each season and sum the runtime
              for (
                let seasonNumber = 1;
                seasonNumber <= numberOfSeasons;
                seasonNumber++
              ) {
                try {
                  const seasonResponse = await axios.get(
                    `${API_BASE_URL}/tv/${movie.id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
                  );
                  const episodes = seasonResponse.data.episodes;

                  // Sum the runtime for all episodes in this season
                  episodes.forEach((episode) => {
                    if (episode.runtime) {
                      totalRuntime += episode.runtime;
                    }
                  });
                } catch (seasonError) {
                  // Skip this season and continue with the next one
                  continue;
                }
              }
            }

            return {
              topRatedMovies: [
                {
                  ...movie,
                  runtime:
                    type === "movie"
                      ? detailsResponse.data.runtime
                      : totalRuntime, // Add runtime for movies or TV shows
                  numberOfSeasons:
                    type === "tv"
                      ? detailsResponse.data.number_of_seasons
                      : null, // Add number of seasons for TV shows
                },
              ],
            };
          })
        );

        // Fetch new releases
        const newReleasesEndpoint =
          type === "movie"
            ? `${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`
            : `${API_BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US`;
        const newReleasesResponse = await axios.get(newReleasesEndpoint);
        const newReleasesTransformed = await Promise.all(
          newReleasesResponse.data.results.map(async (movie) => {
            if (type === "tv") {
              const detailsResponse = await axios.get(
                `${API_BASE_URL}/tv/${movie.id}?api_key=${API_KEY}&language=en-US`
              );

              // Fetch total runtime for TV shows
              const numberOfSeasons = detailsResponse.data.number_of_seasons;
              let totalRuntime = 0;

              // Fetch episode details for each season and sum the runtime
              for (
                let seasonNumber = 1;
                seasonNumber <= numberOfSeasons;
                seasonNumber++
              ) {
                try {
                  const seasonResponse = await axios.get(
                    `${API_BASE_URL}/tv/${movie.id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
                  );
                  const episodes = seasonResponse.data.episodes;

                  // Sum the runtime for all episodes in this season
                  episodes.forEach((episode) => {
                    if (episode.runtime) {
                      totalRuntime += episode.runtime;
                    }
                  });
                } catch (seasonError) {
                  // Skip this season and continue with the next one
                  continue;
                }
              }

              return {
                topRatedMovies: [
                  {
                    ...movie,
                    runtime: totalRuntime, // Add total runtime for TV shows
                    numberOfSeasons: detailsResponse.data.number_of_seasons, // Add number of seasons
                  },
                ],
              };
            } else {
              // For movies, fetch runtime directly
              const detailsResponse = await axios.get(
                `${API_BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
              );
              return {
                topRatedMovies: [
                  {
                    ...movie,
                    runtime: detailsResponse.data.runtime, // Add runtime for movies
                  },
                ],
              };
            }
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
