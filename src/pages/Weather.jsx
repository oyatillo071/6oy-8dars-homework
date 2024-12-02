import React, { useEffect, useState } from "react";
import { weather } from "../axios";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [convertClick, setConvertClick] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  function resetForm() {
    setInputValue("");
    setResult("");
    setError("");
    setData(null);
  }

  useEffect(() => {
    setError("");
    const city = inputValue.replace("/", "").trim();
    if (!city) {
      setError("Shahar nomini to'g'ri kiriting!");
      return;
    }
    weather
      .get(
        `data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      )
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Shahar topilmadi yoki xatolik yuz berdi!");
      });
  }, [convertClick]);

  return (
    <div className=" h-screen bg-blue-50 flex items-center flex-col">
      <form className="p-5 flex flex-col items-center gap-8">
        <h1 className="text-sky-900 text-2xl font-semibold mb-1">
          Bu Ob Havo ilovasi
        </h1>
        <div className="flex flex-col gap-2 items-center">
          <label className="font-medium text-sky-950" htmlFor="input">
            Qiymat kiriting:
          </label>
          <input
            type="text"
            className="input px-4 py-2 outline-none rounded-xl"
            id="input"
            autoFocus
            value={inputValue}
            placeholder="Shahar kiriting:"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center gap-4 ">
          <button
            className="btn bg-white px-4 py-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              setConvertClick((prev) => prev + 1);
            }}>
            Qidirish
          </button>

          <button
            className="btn bg-red-500 text-white px-4 py-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              resetForm();
            }}>
            Reset
          </button>
        </div>
      </form>
      {error && <p className="text-red-600 font-medium">{error}</p>}
      {data && (
        <div className="bg-white p-4 flex items-start rounded justify-between pr-5 shadow-md w-96 mt-4">
          <div>
            <h2 className="text-xl font-bold">{data.name}</h2>
            <p>Temperatura: {(data.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Max-Temperatura: {(data.main.temp_max - 273.15).toFixed(2)}°C</p>
            <p>Min-Temperatura: {(data.main.temp_min - 273.15).toFixed(2)}°C</p>
            <p>Havo Namligi: {data.main.humidity}%</p>
            <p>Shamol Tezligi: {data.wind.speed} m/s</p>
            <p>
              Quyosh chiqishi:{" "}
              {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p>
              Quyosh botishi:{" "}
              {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
          <img
            className="rounded-[50%] w-10 h-10"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
}

export default Home;
