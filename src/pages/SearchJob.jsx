import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsonplaceholder } from "../axios";

function SearchJob() {
  const [searchJobValue, setSearchJobValue] = useState("");
  const [dataJob, setDataJob] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    jsonplaceholder
      .get("posts")
      .then((response) => {
        setDataJob(response.data);
      })
      .catch((error) => {
        setError("Bunday qiymat topilmadi");
      });
  }, []);

  useEffect(() => {
    const searchLowerCase = searchJobValue.toLowerCase();
    const filtered = dataJob.filter((job) =>
      job.title.toLowerCase().includes(searchLowerCase)
    );
    setFilteredJobs(filtered);
  }, [searchJobValue, dataJob]);
  return (
    <div className="h-screen bg-blue-50 flex items-center flex-col">
      <form className="p-5 flex flex-col items-center gap-8">
        <h1 className="text-sky-900 text-2xl font-semibold mb-1">
          Bu ish qidiruv
        </h1>
        <div className="flex flex-col gap-2 items-center">
          <label className="font-medium text-sky-950" htmlFor="input">
            Ish nomini kiriting:
          </label>
          <input
            type="text"
            className="input px-4 py-2 outline-none rounded-xl"
            id="input"
            autoFocus
            value={searchJobValue}
            placeholder="Ish nomini kiriting::"
            onChange={(e) => setSearchJobValue(e.target.value)}
          />
        </div>
      </form>

      {error && <p className="text-red-600 font-medium">{error}</p>}

      <div className="mt-4 w-full px-8">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-4 mb-4 rounded-xl shadow-md">
              <h2 className="font-semibold text-lg text-sky-900">
                {job.title}
              </h2>
              <p className="text-gray-700">{job.body}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Hech qanday ish topilmadi.</p>
        )}
      </div>
    </div>
  );
}

export default SearchJob;
