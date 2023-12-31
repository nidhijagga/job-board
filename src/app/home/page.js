"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import JobPosted from '../jobPosted/page';
import AddJob from '../addJob/page';
import AllJobs from '../allJobs/page';
import JobApplied from '../jobApplied/page';

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [viewAddJob, setViewAddJob] = useState(true); // Set the default view to "Add Job"
  const [viewAllJobs, setViewAllJobs] = useState(false); // Initially, "All Jobs" view is hidden
  const [viewJobsApplied, setViewJobsApplied] = useState(false); // Initially, "Jobs Applied" view is hidden

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/user/logout');
      toast.success(response.data.message);
      router.push('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/user/userdata');
      setUser(response.data.user);
    };
    getData();
  }, []);

  const handleToggleView = (addJobView, allJobsView, jobsAppliedView) => {
    setViewAddJob(addJobView);
    setViewAllJobs(allJobsView);
    setViewJobsApplied(jobsAppliedView);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navigation bar */}
      <header className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold font-serif mr-4">Job Board</h1>
            {user && user.role === 'job-provider' && (
              <>
                <button
                  className={`text-sm bg-white text-indigo-800 rounded-lg hover-bg-indigo-100 p-2 font-semibold cursor-pointer mr-2 ${
                    !viewAddJob ? 'opacity-50' : ''
                  }`}
                  onClick={() => handleToggleView(true, false, false)}
                  disabled={viewAddJob}
                >
                  Add Job
                </button>
                <button
                  className={`text-sm bg-white text-indigo-800 rounded-lg hover-bg-indigo-100 p-2 font-semibold cursor-pointer`}
                  onClick={() => handleToggleView(false, false, false)}
                  disabled={!viewAddJob}
                >
                  Job Posted
                </button>
              </>
            )}
            {user && user.role === 'job-seeker' && (
              <div>
                <button
                  className={`text-sm bg-white text-indigo-800 rounded-lg hover-bg-indigo-100 p-2 font-semibold cursor-pointer mr-2 ${
                    !viewAllJobs ? 'opacity-50' : ''
                  }`}
                  onClick={() => handleToggleView(false, true, false)}
                  disabled={viewAllJobs}
                >
                  All Jobs
                </button>
                <button
                  className={`text-sm bg-white text-indigo-800 rounded-lg hover-bg-indigo-100 p-2 font-semibold cursor-pointer ${
                    !viewJobsApplied ? 'opacity-50' : ''
                  }`}
                  onClick={() => handleToggleView(false, false, true)}
                  disabled={viewJobsApplied}
                >
                  Jobs Applied
                </button>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="text-sm bg-white text-indigo-800 rounded-lg hover-bg-indigo-100 p-2 font-semibold ml-2 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-4">
        {user && user.role === 'job-provider' ? (
          viewAddJob ? <AddJob /> : <JobPosted />
        ) : user && user.role === 'job-seeker' ? (
          // Display different components based on the selected view
          viewAllJobs ? <AllJobs /> : viewJobsApplied ? <JobApplied/> : <p>Default View</p>
        ) : (
          <p>Default View for Other Users</p>
        )}
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

