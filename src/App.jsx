import React from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import Movies from "./pages/Movies";
import UserList from "./pages/UserList";
import Books from "./pages/Books";
import SearchJob from "./pages/SearchJob";
import Weather from "./pages/Weather";

import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div>
      <header className="flex h-10 py-4 items-center bg-teal-800 gap-4 mx-auto px-auto justify-center ">
        <NavLink to="/Movies">Movies</NavLink>
        <NavLink to="/Books">Books</NavLink>
        <NavLink to="/SearchJob">SearchJob</NavLink>
        <NavLink to="/UserList">UserList</NavLink>
        <NavLink to="/Weather">Weather</NavLink>
      </header>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/books" element={<Books />} />
        <Route path="/searchJob" element={<SearchJob />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
