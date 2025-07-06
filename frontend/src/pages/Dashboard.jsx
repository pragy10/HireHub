import { useEffect, useState } from "react";
import {
  FaBell,
  FaBriefcase,
  FaChartLine,
  FaMapMarkerAlt,
  FaPlus,
  FaSearch,
  FaUser
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, api } = useAuth();
  const [stats, setStats] = useState({
    totalJobs: 0,
    appliedJobs: 0,
    savedJobs: 0,
    profileViews: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch recent jobs
        const jobsResponse = await api.get("/jobs?limit=5");
        setRecentJobs(jobsResponse.data.jobs || []);
        
        // For demo purposes, set some stats
        if (user.role === "jobseeker") {
          setStats({
            totalJobs: 1250,
            appliedJobs: 8,
            savedJobs: 12,
            profileViews: 15
          });
        } else {
          setStats({
            totalJobs: 25,
            appliedJobs: 45,
            savedJobs: 0,
            profileViews: 120
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Show demo data when API fails
        setRecentJobs([
          {
            _id: "demo-job-1",
            title: "Senior React Developer",
            company: "TechCorp Inc.",
            location: "San Francisco, CA",
            jobType: "full-time",
            experienceLevel: "senior"
          },
          {
            _id: "demo-job-2",
            title: "Product Manager",
            company: "Innovation Labs",
            location: "New York, NY",
            jobType: "full-time",
            experienceLevel: "mid"
          },
          {
            _id: "demo-job-3",
            title: "UX Designer",
            company: "Creative Studio",
            location: "Remote",
            jobType: "contract",
            experienceLevel: "senior"
          }
        ]);
        
        // Set demo stats
        if (user.role === "jobseeker") {
          setStats({
            totalJobs: 1250,
            appliedJobs: 8,
            savedJobs: 12,
            profileViews: 15
          });
        } else {
          setStats({
            totalJobs: 25,
            appliedJobs: 45,
            savedJobs: 0,
            profileViews: 120
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [api, user.role]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-8 rounded-2xl mb-8 shadow-lg flex flex-col items-center justify-center gap-6 w-full">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-blue-100 text-lg">
            {user.role === "jobseeker" ? "Ready to find your next opportunity?" : "Ready to find your next great hire?"}
          </p>
        </div>
        <div className="flex items-center gap-4 justify-center mt-4">
          <Link to="/profile" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-50 transition">Update Profile</Link>
          <FaBell className="text-3xl text-blue-200" />
        </div>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full justify-items-center">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 flex flex-col items-center">
          <FaBriefcase className="text-3xl text-blue-600 mb-2" />
          <div className="text-3xl font-bold text-blue-700 mb-1">{stats.totalJobs}</div>
          <div className="text-gray-600">{user.role === "jobseeker" ? "Available Jobs" : "Posted Jobs"}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 flex flex-col items-center">
          <FaChartLine className="text-3xl text-blue-400 mb-2" />
          <div className="text-3xl font-bold text-blue-700 mb-1">{stats.appliedJobs}</div>
          <div className="text-gray-600">{user.role === "jobseeker" ? "Applied Jobs" : "Applications"}</div>
        </div>
        {user.role === "jobseeker" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 flex flex-col items-center">
            <FaSearch className="text-3xl text-blue-400 mb-2" />
            <div className="text-3xl font-bold text-blue-700 mb-1">{stats.savedJobs}</div>
            <div className="text-gray-600">Saved Jobs</div>
          </div>
        )}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 flex flex-col items-center">
          <FaUser className="text-3xl text-blue-400 mb-2" />
          <div className="text-3xl font-bold text-blue-700 mb-1">{stats.profileViews}</div>
          <div className="text-gray-600">Profile Views</div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full justify-items-center">
        {user.role === "jobseeker" ? (
          <>
            <Link to="/jobs" className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center w-full max-w-xs mx-auto">
              <FaSearch className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Find Jobs</h3>
              <p className="text-gray-600">Browse and search for new opportunities</p>
            </Link>
            <Link to="/applied-jobs" className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center w-full max-w-xs mx-auto">
              <FaBriefcase className="text-4xl text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Applied Jobs</h3>
              <p className="text-gray-600">Track your job applications</p>
            </Link>
            <Link to="/profile" className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center w-full max-w-xs mx-auto">
              <FaUser className="text-4xl text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Update Profile</h3>
              <p className="text-gray-600">Keep your profile up to date</p>
            </Link>
          </>
        ) : (
          <>
            <Link to="/post-job" className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center w-full max-w-xs mx-auto">
              <FaPlus className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Post a Job</h3>
              <p className="text-gray-600">Create a new job posting</p>
            </Link>
            <Link to="/employer-dashboard" className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center w-full max-w-xs mx-auto">
              <FaChartLine className="text-4xl text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Manage Jobs</h3>
              <p className="text-gray-600">View and manage your job postings</p>
            </Link>
            <Link to="/profile" className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center w-full max-w-xs mx-auto">
              <FaUser className="text-4xl text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Company Profile</h3>
              <p className="text-gray-600">Update your company information</p>
            </Link>
          </>
        )}
      </div>
      {/* Recent Jobs Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Recent Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {recentJobs.length > 0 ? recentJobs.map((job) => (
            <div key={job._id} className="bg-blue-50 rounded-xl p-6 flex flex-col gap-2 shadow hover:shadow-xl border border-blue-100 transition-all duration-300 items-center">
              <div className="flex items-center gap-3 mb-2 justify-center">
                <FaBriefcase className="text-blue-600 text-2xl" />
                <div>
                  <h3 className="font-bold text-blue-700 text-lg">{job.title}</h3>
                  <p className="text-blue-400 text-sm">{job.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-500 text-sm mb-2 justify-center">
                <FaMapMarkerAlt />
                <span>{job.location}</span>
              </div>
              <div className="flex gap-2 flex-wrap mb-2 justify-center">
                <span className="bg-white border border-blue-200 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">{job.jobType}</span>
                <span className="bg-white border border-blue-200 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">{job.experienceLevel}</span>
              </div>
              <Link to={`/jobs/${job._id}`} className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-700 transition">View Details</Link>
            </div>
          )) : (
            <div className="col-span-full text-center py-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <FaBriefcase className="text-4xl text-blue-200 mx-auto mb-4" />
                <p className="text-blue-400 text-lg">No jobs available at the moment.</p>
                <p className="text-blue-300 text-sm mt-2">Check back soon for new opportunities!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
  