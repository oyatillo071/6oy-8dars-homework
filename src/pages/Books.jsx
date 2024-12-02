import React, { useState, useEffect } from "react";
import axios from "axios";

function BookList() {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setBooks(
          response.data.map((user) => ({
            title: `Kitob ${user.id}`,
            author: user.name,
            status: "O'qilmagan",
          }))
        );
      })
      .catch((error) => {
        console.error("Xato yuz berdi:", error);
      });
  }, []);

  const handleAddBook = () => {
    const newBook = {
      title: bookTitle,
      author: author,
      status: "O'qilmagan",
    };
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setBookTitle("");
    setAuthor("");
  };

  const handleToggleStatus = (index) => {
    const updatedBooks = books.map((book, i) =>
      i === index
        ? {
            ...book,
            status: book.status === "O'qilgan" ? "O'qilmagan" : "O'qilgan",
          }
        : book
    );
    setBooks(updatedBooks);
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  return (
    <div className="h-screen bg-blue-50 flex items-center flex-col">
      <h1 className="text-sky-900 text-2xl font-semibold mb-4">
        Kitoblar ro'yxati
      </h1>

      <form className="p-5 flex flex-col items-center gap-8">
        <div className="flex flex-col gap-2 items-center">
          <label className="font-medium text-sky-950" htmlFor="bookTitle">
            Kitob nomi:
          </label>
          <input
            type="text"
            id="bookTitle"
            className="input px-4 py-2 outline-none rounded-xl"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            placeholder="Kitob nomini kiriting"
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <label className="font-medium text-sky-950" htmlFor="author">
            Muallif ismi:
          </label>
          <input
            type="text"
            id="author"
            className="input px-4 py-2 outline-none rounded-xl"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Muallif ismini kiriting"
          />
        </div>
        <button
          type="button"
          onClick={handleAddBook}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl">
          Kitob qo'shish
        </button>
      </form>

      <ul className="w-full px-8">
        {books.map((book, index) => (
          <li
            key={index}
            className={`p-4 mb-4 rounded-xl shadow-md ${
              book.status === "O'qilgan" ? "bg-green-500" : "bg-red-500"
            }`}>
            <h2 className="font-semibold text-lg text-white">{book.title}</h2>
            <p className="text-white">{book.author}</p>
            <button
              onClick={() => handleToggleStatus(index)}
              className="mt-2 px-4 py-1 bg-gray-300 text-black rounded-xl">
              {book.status}
            </button>
            <button
              onClick={() => handleDeleteBook(index)}
              className="ml-4 px-4 py-1 bg-red-500 text-white rounded-xl">
              O'chirish
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
