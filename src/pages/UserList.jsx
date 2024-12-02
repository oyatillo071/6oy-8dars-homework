import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsonplaceholder } from "../axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    jsonplaceholder
      .get("users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
    };
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  return (
    <div className="h-screen bg-blue-50 flex items-center flex-col">
      <form
        className="p-5 flex flex-col w-full  items-center gap-8   bg-blue-50"
        onSubmit={handleSubmit}>
        <h2 className="text-sky-900 text-xl font-semibold mb-2">
          Yangi foydalanuvchi qo'shish
        </h2>
        <div className="flex flex-col gap-2 items-center">
          <label className="font-medium text-sky-950" htmlFor="name">
            Ism:
          </label>
          <input
            type="text"
            id="name"
            className="input px-4 py-2 bg-white outline-none rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ismingizni kiriting"
          />
        </div>
        <div className="flex flex-col gap-2  items-center">
          <label className="font-medium text-sky-950" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="input px-4 py-2 bg-white outline-none rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email manzilingizni kiriting"
          />
        </div>
        <button
          type="submit"
          className="mt-1 px-6 py-2 bg-blue-500 text-white rounded-xl">
          Foydalanuvchi qo'shish
        </button>
      </form>

      <h1 className="text-sky-900 text-2xl font-semibold mb-4">
        Foydalanuvchilar ro'yxati
      </h1>
      <ul className="w-full px-8">
        {users.map((user, index) => (
          <li key={index} className="bg-white p-4 mb-4 rounded-xl shadow-md">
            <h2 className="font-semibold text-lg text-sky-900">{user.name}</h2>
            <p className="text-gray-700">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
