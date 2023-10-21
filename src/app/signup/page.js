"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
const Signup = () => {
  const router = useRouter();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [role, setRole] = useState("job-provider");

  const handleSignup = async (e) => {
    e.preventDefault();
    const username = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Check if any of the input fields are empty, and if so, show an error toast.
    if (!username || !email || !password) {
      toast.error("Fill in all details");
      return; // Exit the function to prevent the API request.
    }

    const res = await axios.post("/api/user/signup", {
      username,
      email,
      password,
      role,
    });
    if (res.data.message == "User Registered") {
      toast.success(res.data.message);
      router.push("/login");
    } else {
      toast.error(res.data.message || res.data.error);
      userNameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value="";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-indigo-600 mb-4">Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              UserName
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded-lg text-gray-900"
              placeholder="Enter your username"
              ref={userNameRef}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-lg text-gray-900"
              placeholder="Enter your email"
              ref={emailRef}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-lg text-gray-900"
              placeholder="Enter your password"
              ref={passwordRef}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-lg pb-2">I am :</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="job-provider"
                  checked={role === "job-provider"}
                  onChange={() => setRole("job-provider")}
                />
                <span className="text-gray-900 font-semibold">
                  Job Provider
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="job-seeker"
                  checked={role === "job-seeker"}
                  onChange={() => setRole("job-seeker")}
                />
                <span className="text-gray-900 font-semibold">Job Seeker</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600">
            Login
          </Link>
        </p>
      </div>
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

export default Signup;
