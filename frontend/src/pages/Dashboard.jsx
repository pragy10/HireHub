import { useEffect, useState } from "react";
import {
    FaBell,
    FaBriefcase,
    FaCalendar,
    FaChartLine,
    FaEye,
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
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [api, user.role]);

  if (loading) {
    return (
      <div className="loading">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-blue-100">
              {user.role === "jobseeker" 
                ? "Ready to find your next opportunity?" 
                : "Ready to find your next great hire?"
              }
            </p>
          </div>
          <div className="hidden md:block">
            <FaBell className="text-3xl text-blue-200" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {user.role === "jobseeker" ? stats.totalJobs : stats.totalJobs}
            </div>
            <div className="text-gray-600">
              {user.role === "jobseeker" ? "Available Jobs" : "Posted Jobs"}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.appliedJobs}
            </div>
            <div className="text-gray-600">
              {user.role === "jobseeker" ? "Applied Jobs" : "Applications"}
            </div>
          </div>
        </div>

        {user.role === "jobseeker" && (
          <div className="card">
            <div className="card-body text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stats.savedJobs}
              </div>
              <div className="text-gray-600">Saved Jobs</div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {stats.profileViews}
            </div>
            <div className="text-gray-600">Profile Views</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {user.role === "jobseeker" ? (
          <>
            <Link to="/jobs" className="card hover:shadow-lg transition-shadow">
              <div className="card-body text-center">
                <FaSearch className="text-4xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Find Jobs</h3>
                <p className="text-gray-600">Browse and search for new opportunities</p>
              </div>
            </Link>

            <Link to="/applied-jobs" className="card hover:shadow-lg transition-shadow">
              <div className="card-body text-center">
                <FaBriefcase className="text-4xl text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Applied Jobs</h3>
                <p className="text-gray-600">Track your job applications</p>
              </div>
            </Link>

            <Link to="/profile" className="card hover:shadow-lg transition-shadow">
              <div className="card-body text-center">
                <FaUser className="text-4xl text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Update Profile</h3>
                <p className="text-gray-600">Keep your profile up to date</p>
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to="/post-job" className="card hover:shadow-lg transition-shadow">
              <div className="card-body text-center">
                <FaPlus className="text-4xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Post a Job</h3>
                <p className="text-gray-600">Create a new job posting</p>
              </div>
            </Link>

            <Link to="/employer-dashboard" className="card hover:shadow-lg transition-shadow">
              <div className="card-body text-center">
                <FaChartLine className="text-4xl text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Manage Jobs</h3>
                <p className="text-gray-600">View and manage your job postings</p>
              </div>
            </Link>

            <Link to="/profile" className="card hover:shadow-lg transition-shadow">
              <div className="card-body text-center">
                <FaUser className="text-4xl text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Company Profile</h3>
                <p className="text-gray-600">Update your company information</p>
              </div>
            </Link>
          </>
        )}
      </div>

      {/* Recent Jobs Section */}
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {user.role === "jobseeker" ? "Recent Job Openings" : "Recent Applications"}
            </h2>
            <Link 
              to={user.role === "jobseeker" ? "/jobs" : "/employer-dashboard"} 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>
        </div>
        <div className="card-body">
          {recentJobs.length > 0 ? (
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendar />
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link 
                      to={`/jobs/${job._id}`} 
                      className="btn btn-outline btn-sm"
                    >
                      <FaEye className="mr-1" />
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaBriefcase className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {user.role === "jobseeker" 
                  ? "No recent jobs found. Start searching for opportunities!" 
                  : "No recent applications. Post a job to get started!"
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 card">
        <div className="card-header">
          <h2 className="text-xl font-semibold">Tips for Success</h2>
        </div>
        <div className="card-body">
          {user.role === "jobseeker" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Complete Your Profile</h3>
                <p className="text-blue-800 text-sm">A complete profile increases your chances of getting hired by 40%.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Apply Early</h3>
                <p className="text-green-800 text-sm">Jobs posted in the last 24 hours receive 3x more applications.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Write Clear Job Descriptions</h3>
                <p className="text-blue-800 text-sm">Detailed job descriptions attract 50% more qualified candidates.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Respond Quickly</h3>
                <p className="text-green-800 text-sm">Responding within 24 hours improves candidate experience significantly.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
  