import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { API_BASE_URL, API_KEY } from "../config";

import { ThreeDots } from "react-loader-spinner";

const GenrePage = () => {
  const { id, type } = useParams(); // Get `id` and `type` from the URL
  const [data, setData] = useState([]); // Store movies or shows
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(true);

  console.log(id, type);

  useEffect(() => {
    const fetchGenreName = async () => {
      try {
        // Fetch genre name based on the type (movies or shows)
        const endpoint = type === "movies" ? "movie" : "tv";
        const response = await axios.get(
          `${API_BASE_URL}/genre/${endpoint}/list`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        const genre = response.data.genres.find((e) => e.id === parseInt(id));
        setGenreName(genre ? genre.name : "Unknown Genre");
      } catch (error) {
        console.error("Error fetching genre name:", error);
      }
    };

    const fetchData = async () => {
      try {
        // Fetch movies or shows based on the type
        const endpoint = type === "movies" ? "movie" : "tv";
        const response = await axios.get(
          `${API_BASE_URL}/discover/${endpoint}`,
          {
            params: {
              api_key: API_KEY,
              with_genres: id,
            },
          }
        );
        setData(response.data.results);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenreName();
    fetchData();
  }, [id, type]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='movies-shows-page'>
      <div className='container'>
        <div className='movies__shows' data-genre={`${genreName} Movies`}>
          {loading ? (
            <ThreeDots
              visible={true}
              height='80'
              width='80'
              color='#e50000'
              radius='9'
              ariaLabel='three-dots-loading'
              wrapperClass='three-dots-loader'
            />
          ) : (
            <div className='movies-grid'>
              {data.map((movie) => (
                <a href='#'>
                  <div
                    key={movie.id}
                    className='movie-card'
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w200${movie.poster_path})`,
                    }}
                  >
                    <div className='movie-content'>
                      <span class='rate'>
                        <i class='fa-solid fa-star'></i>
                        {movie.vote_average.toFixed(1)}
                      </span>
                      <span className='playicon'>
                        <i className='fas fa-circle-play'></i>
                      </span>
                      <div>
                        <h4 class='title'>{movie.title}</h4>
                        <h5 class='description'>{movie.overview}</h5>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
