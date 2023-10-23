"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const AddJob = () => {
  const [user, setUser] = useState();

  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/user/userdata");
      setUser(response.data.user);
    };
    getData();
  }, []);

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { userId: user._id, ...newJob };
      const response = await axios.post("/api/job", data);
      console.log("Job added:", response.data);

      //   // Clear the form after successful submission
      setNewJob({
        title: "",
        description: "",
        location: "",
        salary: "",
      });
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div className="dashboard-container p-4">
      <div className="my-4">
        <h3 className="text-xl font-semibold mb-2 text-black">Add a Job</h3>
        <form onSubmit={handleJobSubmit}>
          <div className="flex flex-col w-1/3">
            <input
              type="text"
              placeholder="Company Name"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              className="w-full p-2 border rounded-lg mb-2 text-black"
            />
            <textarea
              placeholder="Job Description"
              value={newJob.description}
              onChange={(e) =>
                setNewJob({ ...newJob, description: e.target.value })
              }
              className="w-full p-2 border rounded-lg mb-2 text-black"
            />
            <input
              type="text"
              placeholder="Job Location"
              value={newJob.location}
              onChange={(e) =>
                setNewJob({ ...newJob, location: e.target.value })
              }
              className="w-full p-2 border rounded-lg mb-2 text-black"
            />
            <input
              type="number"
              placeholder="Job Salary (LPA)"
              value={newJob.salary}
              onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
              className="w-full p-2 border rounded-lg mb-2 text-black"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
