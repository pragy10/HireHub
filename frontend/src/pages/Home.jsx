import { useEffect, useState } from "react";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaRocket,
    FaSearch,
    FaShieldAlt,
    FaUsers,
    FaStar,
    FaArrowRight,
    FaCheckCircle,
    FaBuilding,
    FaGlobe,
    FaArrowUp,
    FaHeart,
    FaLightbulb,
    FaPlay,
    FaChartLine
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, api } = useAuth();
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalCompanies: 0,
    totalUsers: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent jobs
        const jobsResponse = await api.get("/jobs?limit=6");
        setRecentJobs(jobsResponse.data.jobs || []);
        
        // For demo purposes, set some stats
        setStats({
          totalJobs: 1250,
          totalCompanies: 450,
          totalUsers: 8500
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  const features = [
    {
      icon: <FaSearch className="text-4xl text-blue-600" />,
      title: "Smart Job Search",
      description: "Find the perfect job with our AI-powered search and advanced filtering options.",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: <FaBriefcase className="text-4xl text-emerald-600" />,
      title: "Easy Application",
      description: "Apply to multiple jobs with just a few clicks using your optimized profile.",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100"
    },
    {
      icon: <FaUsers className="text-4xl text-purple-600" />,
      title: "Company Insights",
      description: "Get detailed company profiles, culture insights, and employee reviews.",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      icon: <FaRocket className="text-4xl text-orange-600" />,
      title: "Fast Hiring",
      description: "Get hired quickly with our streamlined application and interview process.",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100"
    },
    {
      icon: <FaShieldAlt className="text-4xl text-red-600" />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security and privacy measures.",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-indigo-400 animate-pulse mx-auto"></div>
          </div>
          <p className="mt-8 text-xl text-gray-700 font-semibold">Loading HireHub...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing your career journey</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            {/* Logo/Brand */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl backdrop-blur-sm mb-8">
              <FaBriefcase className="text-3xl text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Dream Job
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Connect with top companies and unlock opportunities worldwide. Your next career breakthrough starts here.
            </p>
            
            {/* Enhanced CTA Buttons */}
            {!user && (
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link 
                  to="/register" 
                  className="group inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                >
                  <FaRocket className="group-hover:animate-bounce" />
                  Get Started Free
                </Link>
                <Link 
                  to="/jobs" 
                  className="group inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm"
                >
                  <FaSearch />
                  Browse Jobs
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
            
            {user && (
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link 
                  to="/jobs" 
                  className="group inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                >
                  <FaSearch className="group-hover:animate-pulse" />
                  Find Perfect Jobs
                </Link>
                {user.role === "employer" && (
                  <Link 
                    to="/post-job" 
                    className="group inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm"
                  >
                    <FaBriefcase />
                    Post a Job
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            )}
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-blue-200">
              <div className="flex items-center gap-2">
                <FaCheckCircle />
                <span className="text-sm font-medium">100% Free to Start</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt />
                <span className="text-sm font-medium">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar />
                <span className="text-sm font-medium">Trusted by 8,500+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              Join a thriving community of professionals and companies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaBriefcase className="text-2xl text-blue-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">
                  {stats.totalJobs.toLocaleString()}+
                </div>
                <div className="text-gray-700 font-semibold text-lg">Active Jobs</div>
                <div className="text-sm text-gray-500 mt-2">Updated daily</div>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaBuilding className="text-2xl text-emerald-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-3">
                  {stats.totalCompanies.toLocaleString()}+
                </div>
                <div className="text-gray-700 font-semibold text-lg">Companies</div>
                <div className="text-sm text-gray-500 mt-2">Hiring actively</div>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaUsers className="text-2xl text-purple-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-3">
                  {stats.totalUsers.toLocaleString()}+
                </div>
                <div className="text-gray-700 font-semibold text-lg">Job Seekers</div>
                <div className="text-sm text-gray-500 mt-2">Success stories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6">
              <FaLightbulb className="text-2xl text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">HireHub</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide cutting-edge tools and resources to accelerate your career journey and connect you with opportunities that matter.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.bgColor} rounded-bl-3xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                <div className="relative">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Recent Jobs Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Latest <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Opportunities</span>
              </h2>
              <p className="text-xl text-gray-600">
                Fresh job openings from top companies worldwide
              </p>
            </div>
            <Link 
              to="/jobs" 
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mt-6 md:mt-0"
            >
              View All Jobs
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <div key={job._id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
                  <div className="p-8">
                    {/* Company Avatar */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                        {job.company?.charAt(0) || 'C'}
                      </div>
                      <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                        New
                      </div>
                    </div>
                    
                    {/* Job Info */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-lg font-semibold text-gray-700 mb-4">{job.company}</p>
                    
                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <FaMapMarkerAlt className="text-gray-500" />
                      <span className="font-medium">{job.location}</span>
                    </div>
                    
                    {/* Salary */}
                    {job.salary && (
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-3 mb-6">
                        <div className="text-emerald-600 font-bold text-lg">
                          ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
                        </div>
                        <div className="text-emerald-600 text-sm">per year</div>
                      </div>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.jobType}
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.experienceLevel}
                      </span>
                    </div>
                    
                    {/* Action Button */}
                    <Link 
                      to={`/jobs/${job._id}`} 
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      View Details
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBriefcase className="text-4xl text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Jobs Available</h3>
                <p className="text-gray-600 text-lg">
                  Check back soon for new opportunities!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl backdrop-blur-sm mb-8">
            <FaRocket className="text-3xl text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Launch Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Career Journey?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto">
            Join thousands of professionals who have discovered their dream careers through HireHub. Your success story starts today.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/register" 
                className="group inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                <FaRocket className="group-hover:animate-bounce" />
                Create Free Account
              </Link>
              <Link 
                to="/jobs" 
                className="group inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm"
              >
                <FaSearch />
                Explore Opportunities
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
          
          {/* Success Metrics */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">24hrs</div>
              <div className="text-blue-200">Average Response</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">4.9★</div>
              <div className="text-blue-200">User Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
