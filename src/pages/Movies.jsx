import React, { useState, useEffect } from "react";
import axios from "axios";
import { movie } from "../axios";

function Movies() {
  const [searchMovie, setSearchMovie] = useState("");
  const [dataMovie, setDataMovie] = useState([]);
  const [filteredMovie, setFilteredMovie] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    if (searchMovie) {
      movie
        .get(`?s=${searchMovie}&apikey=${import.meta.env.VITE_MOVIE_API_KEY}`)
        .then((response) => {
          if (response.data.Response === "True") {
            setDataMovie(response.data.Search);
            console.log(response.data);
          } else {
            setError("Bunday kino topilmadi");
          }
        })
        .catch((error) => {
          setError("Xato yuz berdi");
          console.log(error);
        });
    } else {
      setDataMovie([]);
    }
  }, [searchMovie]);

  useEffect(() => {
    const searchLowerCase = searchMovie.toLowerCase();
    const filtered = dataMovie.filter((movie) =>
      movie.Title.toLowerCase().includes(searchLowerCase)
    );
    setFilteredMovie(filtered);
  }, [searchMovie, dataMovie]);

  return (
    <div className="h-screen bg-blue-50 flex items-center flex-col">
      <form className="p-5 flex flex-col items-center gap-8">
        <h1 className="text-sky-900 text-2xl font-semibold mb-1">
          Qidirish uchun kino nomini kiriting:
        </h1>
        <div className="flex flex-col gap-2 items-center">
          <label className="font-medium text-sky-950" htmlFor="input">
            Kino nomini kiriting:
          </label>
          <input
            type="text"
            className="input px-4 py-2 outline-none rounded-xl"
            id="input"
            autoFocus
            value={searchMovie}
            placeholder="Kino nomini kiriting"
            onChange={(e) => setSearchMovie(e.target.value)}
          />
        </div>
      </form>

      <div className="mt-4 w-full flex-wrap flex px-8 gap-4">
        {filteredMovie.length > 0 ? (
          filteredMovie.map((movie, index) => (
            <div
              key={index}
              className="bg-white p-4 flex  items-center mb-4 gap-4 w-[30%] justify-between rounded-xl shadow-md">
              <div>
                <h2 className="font-semibold text-lg text-sky-900">
                  {movie.Title}
                </h2>
                <p className="text-gray-700">{movie.Year}</p>
              </div>
              <img src={movie.Poster} alt={movie.Title} className="w-32 h-48" />
            </div>
          ))
        ) : (
          <p className="text-gray-600">Hech qanday kino topilmadi.</p>
        )}
      </div>
    </div>
  );
}

export default Movies;
