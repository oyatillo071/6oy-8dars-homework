import axios from "axios";

export const weather = axios.create({
  // https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY}
  baseURL: "https://api.openweathermap.org",
});

export const jsonplaceholder = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const books = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes?q=",
});

export const movie = axios.create({
  baseURL: "http://www.omdbapi.com/",
});
