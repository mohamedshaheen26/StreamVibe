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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
        const [
          page1Response,
          page2Response,
          page3Response,
          page4Response,
          page5Response,
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/discover/${endpoint}`, {
            params: {
              api_key: API_KEY,
              with_genres: id,
              page: page * 5 - 4, // Fetch the first page of 20 results
            },
          }),
          axios.get(`${API_BASE_URL}/discover/${endpoint}`, {
            params: {
              api_key: API_KEY,
              with_genres: id,
              page: page * 5 - 3, // Fetch the second page of 20 results
            },
          }),
          axios.get(`${API_BASE_URL}/discover/${endpoint}`, {
            params: {
              api_key: API_KEY,
              with_genres: id,
              page: page * 5 - 3, // Fetch the third page of 20 results
            },
          }),
          axios.get(`${API_BASE_URL}/discover/${endpoint}`, {
            params: {
              api_key: API_KEY,
              with_genres: id,
              page: page * 5 - 1, // Fetch the third page of 20 results
            },
          }),
          axios.get(`${API_BASE_URL}/discover/${endpoint}`, {
            params: {
              api_key: API_KEY,
              with_genres: id,
              page: page * 5, // Fetch the third page of 20 results
            },
          }),
        ]);

        // Combine the results from all three pages
        const combinedResults = [
          ...page1Response.data.results,
          ...page2Response.data.results,
          ...page3Response.data.results,
          ...page4Response.data.results,
          ...page5Response.data.results,
        ];
        setData(combinedResults);
        setTotalPages(Math.ceil(page1Response.data.total_pages / 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenreName();
    fetchData();
  }, [id, type, page]);

  console.log(data);

  if (loading) return <p>Loading...</p>;

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1); // Go to the previous page
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1); // Go to the next page
    }
  };

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
            <>
              <div className='movies-grid'>
                {data.map((item) => (
                  <a href='#'>
                    <div
                      key={item.id}
                      className='movie-card'
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w200${item.poster_path})`,
                      }}
                    >
                      <div className='movie-content'>
                        <span class='rate'>
                          <i class='fa-solid fa-star'></i>
                          {item.vote_average.toFixed(1)}
                        </span>
                        <span className='playicon'>
                          <i className='fas fa-circle-play'></i>
                        </span>
                        <div>
                          <h4 class='title'>{item.title || item.name}</h4>
                          <h5 class='description'>{item.overview}</h5>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <nav
                aria-label='Page navigation'
                class='d-flex justify-content-center mt-5'
              >
                <ul class='pagination'>
                  <li class='page-item'>
                    <button
                      class='page-link cursor-pointer'
                      type='button'
                      aria-label='Page Button'
                      onClick={handlePreviousPage}
                      disabled={page === 1}
                    >
                      <i class='fas fa-angle-double-left'></i>
                    </button>
                  </li>
                  <li class='page-item text-white d-flex align-items-center p-1'>
                    <span>
                      Page {page} of {totalPages}
                    </span>
                  </li>
                  <li class='page-item'>
                    <button
                      class='page-link cursor-pointer'
                      type='button'
                      aria-label='Page Button'
                      onClick={handleNextPage}
                      disabled={page === totalPages}
                    >
                      <i class='fas fa-angle-double-right'></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
