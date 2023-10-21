"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/user/logout");
      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navigation bar */}
      <header className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold font-serif">Job Board</h1>
          <button
            onClick={handleLogout}
            className="text-sm bg-white text-indigo-800 rounded-lg hover:bg-indigo-100 p-2  font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-4">
        {/* Add your main content here */}
      </div>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Your App. All rights reserved.</p>
        </div>
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Home;
