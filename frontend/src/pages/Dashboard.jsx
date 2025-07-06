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
    FaUser,
    FaArrowUp,
    FaRocket,
    FaStar,
    FaHeart,
    FaBuilding,
    FaUsers,
    FaLightbulb,
    FaArrowRight
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-indigo-400 animate-pulse mx-auto"></div>
          </div>
          <p className="mt-8 text-xl text-gray-700 font-semibold">Loading your dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing your personalized experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Section */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-8 md:p-12 mb-10 overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 translate-y-20"></div>
            <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white rounded-full"></div>
          </div>
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <FaRocket className="text-2xl text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Welcome back, {user.name}! 👋
                  </h1>
                  <p className="text-blue-100 text-lg">
                    {user.role === "jobseeker" 
                      ? "Ready to discover your next career opportunity?" 
                      : "Ready to find exceptional talent for your team?"
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  {user.role === "jobseeker" ? "Job Seeker" : "Employer"}
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <FaStar className="text-yellow-300" />
                  Premium Member
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <FaBell className="text-3xl text-white animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-blue-100 rounded-2xl group-hover:scale-110 transition-transform">
                  <FaBriefcase className="text-blue-600 text-2xl" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {user.role === "jobseeker" ? stats.totalJobs.toLocaleString() : stats.totalJobs}
                  </div>
                  <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <FaArrowUp />
                    +12% this month
                  </div>
                </div>
              </div>
              <div className="text-gray-700 font-semibold">
                {user.role === "jobseeker" ? "Available Jobs" : "Posted Jobs"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {user.role === "jobseeker" ? "Across all categories" : "Active listings"}
              </div>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-emerald-100 rounded-2xl group-hover:scale-110 transition-transform">
                  <FaChartLine className="text-emerald-600 text-2xl" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">
                    {stats.appliedJobs}
                  </div>
                  <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <FaArrowUp />
                    +25% this week
                  </div>
                </div>
              </div>
              <div className="text-gray-700 font-semibold">
                {user.role === "jobseeker" ? "Applied Jobs" : "Applications Received"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {user.role === "jobseeker" ? "This month" : "Pending review"}
              </div>
            </div>
          </div>

          {user.role === "jobseeker" && (
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-purple-100 rounded-2xl group-hover:scale-110 transition-transform">
                    <FaHeart className="text-purple-600 text-2xl" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {stats.savedJobs}
                    </div>
                    <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <FaArrowUp />
                      +5 this week
                    </div>
                  </div>
                </div>
                <div className="text-gray-700 font-semibold">Saved Jobs</div>
                <div className="text-xs text-gray-500 mt-1">Your wishlist</div>
              </div>
            </div>
          )}

          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-orange-100 rounded-2xl group-hover:scale-110 transition-transform">
                  <FaUsers className="text-orange-600 text-2xl" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {stats.profileViews}
                  </div>
                  <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <FaArrowUp />
                    +8% this week
                  </div>
                </div>
              </div>
              <div className="text-gray-700 font-semibold">Profile Views</div>
              <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <FaRocket className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.role === "jobseeker" ? (
              <>
                <Link to="/jobs" className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <FaSearch className="text-3xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Find Jobs</h3>
                    <p className="text-gray-600 mb-4">Discover thousands of opportunities tailored to your skills</p>
                    <div className="flex items-center justify-center text-blue-600 font-medium group-hover:gap-3 transition-all">
                      Get Started <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                <Link to="/applied-jobs" className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <FaBriefcase className="text-3xl text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Applied Jobs</h3>
                    <p className="text-gray-600 mb-4">Track your applications and monitor their progress</p>
                    <div className="flex items-center justify-center text-emerald-600 font-medium group-hover:gap-3 transition-all">
                      View Status <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                <Link to="/profile" className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <FaUser className="text-3xl text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Update Profile</h3>
                    <p className="text-gray-600 mb-4">Keep your profile current to attract top employers</p>
                    <div className="flex items-center justify-center text-purple-600 font-medium group-hover:gap-3 transition-all">
                      Edit Profile <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/post-job" className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <FaPlus className="text-3xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Post a Job</h3>
                    <p className="text-gray-600 mb-4">Create compelling job postings to attract top talent</p>
                    <div className="flex items-center justify-center text-blue-600 font-medium group-hover:gap-3 transition-all">
                      Create Posting <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                <Link to="/employer-dashboard" className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <FaChartLine className="text-3xl text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Manage Jobs</h3>
                    <p className="text-gray-600 mb-4">Monitor applications and manage your job listings</p>
                    <div className="flex items-center justify-center text-emerald-600 font-medium group-hover:gap-3 transition-all">
                      View Dashboard <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                <Link to="/profile" className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <FaBuilding className="text-3xl text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Company Profile</h3>
                    <p className="text-gray-600 mb-4">Showcase your company culture and values</p>
                    <div className="flex items-center justify-center text-purple-600 font-medium group-hover:gap-3 transition-all">
                      Update Profile <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Enhanced Recent Jobs Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FaBriefcase className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.role === "jobseeker" ? "Latest Job Opportunities" : "Recent Applications"}
                </h2>
              </div>
              <Link 
                to={user.role === "jobseeker" ? "/jobs" : "/employer-dashboard"} 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View All <FaArrowRight />
              </Link>
            </div>
          </div>
          
          <div className="p-8">
            {recentJobs.length > 0 ? (
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job._id} className="group flex flex-col lg:flex-row lg:items-center justify-between p-6 border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {job.company?.charAt(0) || 'J'}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                            {job.title}
                          </h3>
                          <p className="text-lg font-semibold text-gray-700 mb-3">{job.company}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                              <FaMapMarkerAlt className="text-gray-500" />
                              <span className="font-medium">{job.location}</span>
                            </span>
                            <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                              <FaCalendar className="text-gray-500" />
                              <span className="font-medium">{new Date(job.createdAt).toLocaleDateString()}</span>
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-medium">
                              New
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-4 lg:mt-0">
                      <Link 
                        to={`/jobs/${job._id}`} 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <FaEye />
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBriefcase className="text-4xl text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {user.role === "jobseeker" 
                    ? "No recent jobs available" 
                    : "No recent applications"
                  }
                </h3>
                <p className="text-gray-600 text-lg">
                  {user.role === "jobseeker" 
                    ? "Check back soon for new opportunities that match your profile!" 
                    : "Post your first job to start receiving applications!"
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Tips Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Success Tips</h2>
                <p className="text-emerald-100">Expert advice to accelerate your journey</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            {user.role === "jobseeker" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                      <FaUser />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900 mb-2 text-lg">Complete Your Profile</h3>
                      <p className="text-blue-800 mb-3">A complete profile increases your chances of getting hired by 40%.</p>
                      <div className="text-xs text-blue-600 font-medium">
                        ✓ Add professional photo ✓ Update skills ✓ Add work experience
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                      <FaRocket />
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-900 mb-2 text-lg">Apply Early</h3>
                      <p className="text-emerald-800 mb-3">Jobs posted in the last 24 hours receive 3x more applications.</p>
                      <div className="text-xs text-emerald-600 font-medium">
                        ✓ Set job alerts ✓ Check daily ✓ Apply within 48 hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                      <FaBuilding />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900 mb-2 text-lg">Write Clear Job Descriptions</h3>
                      <p className="text-blue-800 mb-3">Detailed job descriptions attract 50% more qualified candidates.</p>
                      <div className="text-xs text-blue-600 font-medium">
                        ✓ Clear requirements ✓ Company culture ✓ Growth opportunities
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                      <FaUsers />
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-900 mb-2 text-lg">Respond Quickly</h3>
                      <p className="text-emerald-800 mb-3">Responding within 24 hours improves candidate experience significantly.</p>
                      <div className="text-xs text-emerald-600 font-medium">
                        ✓ Set notifications ✓ Quick responses ✓ Clear communication
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
