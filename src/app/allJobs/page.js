"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const AllJobs = () => {
  const [user, setUser] = useState();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/user/userdata");
      setUser(response.data.user);
    };
    getData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/job");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchData();
  }, []);

  const handleApply = async (jobId) => {
    try {
      const data = { jobId, userId: user._id };
      const response = await axios.post("/api/applied", data);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="my-4">
      <ul className="space-y-4 text-black">
        {jobs.map((job) => (
          <li key={job._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-xl font-semibold text-indigo-600">
              {job.title}
            </div>
            <div className="text-gray-700">{job.description}</div>
            <div className="flex mt-2">
              <div className="w-1/2">
                <div className="text-gray-500">Location:</div>
                <div className="text-gray-800">{job.location}</div>
              </div>
              <div className="w-1/2">
                <div className="text-gray-500">Salary: (LPA)</div>
                <div className="text-gray-800">Rs.{job.salary}</div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                onClick={() => handleApply(job._id)}
              >
                Apply
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllJobs;
