import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../config";
import { ThreeDots } from "react-loader-spinner";

const GenrePage = () => {
  const { id, type } = useParams();
  const [data, setData] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const isMovies = type === "movies";

  useEffect(() => {
    const fetchGenreName = async () => {
      try {
        const endpoint = isMovies ? "movie" : "tv";
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
        const endpoint = isMovies ? "movie" : "tv";
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
              page: page * 5 - 4,
            },
          }),
          axios.get(`${API_BASE_URL}/discover/${endpoint}`, {
            params: {
              api_key: API_KEY,
              with_genres: id,
              page: page * 5 - 3,
            },
          }),
          axios.get(`${API_BASE_URL}/discover/${endpoint}`, {
            params: {
              api_key: API_KEY,
              with_genres: id,
              page: page * 5 - 2,
            },
          }),
          axios.get(`${API_BASE_URL}/discover/${endpoint}`, {
            params: {
              api_key: API_KEY,
              with_genres: id,
              page: page * 5 - 1,
            },
          }),
          axios.get(`${API_BASE_URL}/discover/${endpoint}`, {
            params: {
              api_key: API_KEY,
              with_genres: id,
              page: page * 5,
            },
          }),
        ]);

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
        setIsPaginationLoading(false);
      }
    };

    fetchGenreName();
    fetchData();
  }, [id, type, page, isMovies]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = async () => {
    if (page < totalPages) {
      setIsPaginationLoading(true);
      setPage((prevPage) => prevPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className='movies-shows-page'>
      <div className='container'>
        <div
          className='movies__shows'
          data-genre={`${genreName} ${isMovies ? "Movies" : "TV Shows"}`}
        >
          {loading || isPaginationLoading ? (
            <div className='loader-container'>
              <ThreeDots
                visible={true}
                height='80'
                width='80'
                color='#e50000'
                radius='9'
                ariaLabel='three-dots-loading'
                wrapperClass='three-dots-loader'
              />
            </div>
          ) : (
            <>
              <div className='movies-grid'>
                {data.map((item) => (
                  <Link
                    to={`/movies&shows/genre/${id}/${
                      isMovies ? "movie" : "tv"
                    }/${item.id}`}
                    key={item.id}
                  >
                    <div
                      className='movie-card'
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.poster_path})`,
                      }}
                    >
                      <div className='movie-content'>
                        <span className='rate'>
                          <i className='fa-solid fa-star'></i>
                          {item.vote_average.toFixed(1)}
                        </span>
                        <span className='playicon'>
                          <i className='fas fa-circle-play'></i>
                        </span>
                        <div>
                          <h4 className='title'>{item.title || item.name}</h4>
                          <h5 className='description'>{item.overview}</h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <nav
                aria-label='Page navigation'
                className='d-flex justify-content-center mt-5'
              >
                <ul className='pagination'>
                  <li className='page-item'>
                    <button
                      className='page-link cursor-pointer'
                      type='button'
                      aria-label='Page Button'
                      onClick={handlePreviousPage}
                      disabled={page === 1 || isPaginationLoading}
                    >
                      <i className='fas fa-angle-double-left'></i>
                    </button>
                  </li>
                  <li className='page-item text-white d-flex align-items-center p-1'>
                    <span>
                      Page {page} of {totalPages}
                    </span>
                  </li>
                  <li className='page-item'>
                    <button
                      className='page-link cursor-pointer'
                      type='button'
                      aria-label='Page Button'
                      onClick={handleNextPage}
                      disabled={page === totalPages || isPaginationLoading}
                    >
                      <i className='fas fa-angle-double-right'></i>
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
