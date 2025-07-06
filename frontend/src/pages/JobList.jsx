import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaBriefcase,
    FaClock,
    FaFilter,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaSearch,
    FaStar,
    FaTimes,
    FaChevronDown,
    FaChevronUp,
    FaSort,
    FaBookmark,
    FaEye,
    FaBuilding,
    FaUsers,
    FaGlobe,
    FaArrowUp,
    FaArrowRight,
    FaHeart,
    FaShare,
    FaCheckCircle,
    FaLightbulb,
    FaRocket
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const JobList = () => {
  const { user, api } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    minSalary: "",
    maxSalary: ""
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  const jobTypes = ["full-time", "part-time", "contract", "internship", "freelance"];
  const experienceLevels = ["entry", "mid", "senior", "executive"];

  useEffect(() => {
    fetchJobs();
  }, [filters, sortBy, sortOrder, pagination.currentPage]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 12,
        sortBy,
        sortOrder,
        ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value))
      });

      const response = await api.get(`/jobs?${params}`);
      setJobs(response.data.jobs || []);
      setPagination({
        currentPage: parseInt(response.data.currentPage) || 1,
        totalPages: response.data.totalPages || 1,
        total: response.data.total || 0
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      jobType: "",
      experienceLevel: "",
      minSalary: "",
      maxSalary: ""
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return "Competitive salary";
    const min = salary.min?.toLocaleString();
    const max = salary.max?.toLocaleString();
    return `$${min} - $${max}`;
  };

  const getJobTypeColor = (type) => {
    const colors = {
      "full-time": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "part-time": "bg-blue-100 text-blue-800 border-blue-200",
      "contract": "bg-purple-100 text-purple-800 border-purple-200",
      "internship": "bg-amber-100 text-amber-800 border-amber-200",
      "freelance": "bg-orange-100 text-orange-800 border-orange-200"
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getExperienceColor = (level) => {
    const colors = {
      "entry": "bg-blue-100 text-blue-800 border-blue-200",
      "mid": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "senior": "bg-purple-100 text-purple-800 border-purple-200",
      "executive": "bg-red-100 text-red-800 border-red-200"
    };
    return colors[level] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-indigo-400 animate-pulse mx-auto"></div>
          </div>
          <p className="mt-8 text-xl text-gray-700 font-semibold">Loading job opportunities...</p>
          <p className="text-sm text-gray-500 mt-2">Discovering amazing careers for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Logo/Brand */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl backdrop-blur-sm mb-8">
              <FaRocket className="text-3xl text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Dream Career
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover thousands of opportunities from world-class companies and take your career to the next level
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="relative max-w-3xl mx-auto mb-8">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 text-xl" />
              </div>
              <input
                type="text"
                placeholder="Search by job title, company, or keywords..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-16 pr-6 py-6 rounded-3xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-2xl backdrop-blur-sm bg-white/95"
              />
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-blue-200">
              <div className="flex items-center gap-2">
                <FaCheckCircle />
                <span className="text-sm font-medium">{pagination.total}+ Active Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBuilding />
                <span className="text-sm font-medium">500+ Companies</span>
              </div>
              <div className="flex items-center gap-2">
                <FaArrowUp />
                <span className="text-sm font-medium">Updated Daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaBriefcase className="text-2xl text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{pagination.total}</div>
              <div className="text-gray-700 font-semibold">Total Jobs</div>
              <div className="text-xs text-gray-500 mt-1">Available now</div>
            </div>
          </div>
          
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaCheckCircle className="text-2xl text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {jobs.filter(job => job.jobType === "full-time").length}
              </div>
              <div className="text-gray-700 font-semibold">Full-time</div>
              <div className="text-xs text-gray-500 mt-1">Permanent roles</div>
            </div>
          </div>
          
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaBuilding className="text-2xl text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {new Set(jobs.map(job => job.company)).size}
              </div>
              <div className="text-gray-700 font-semibold">Companies</div>
              <div className="text-xs text-gray-500 mt-1">Hiring actively</div>
            </div>
          </div>
          
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaGlobe className="text-2xl text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {jobs.filter(job => job.jobType === "remote" || job.location.toLowerCase().includes("remote")).length}
              </div>
              <div className="text-gray-700 font-semibold">Remote</div>
              <div className="text-xs text-gray-500 mt-1">Work anywhere</div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FaFilter className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Smart Filters</h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaFilter />
                  {showFilters ? "Hide" : "Show"} Filters
                  {showFilters ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-6 py-3 rounded-2xl font-medium transition-all duration-200"
                >
                  <FaTimes />
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Location</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="City, State, or Remote"
                      value={filters.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Job Type</label>
                  <div className="relative">
                    <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={filters.jobType}
                      onChange={(e) => handleFilterChange("jobType", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                    >
                      <option value="">All Types</option>
                      {jobTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Experience Level</label>
                  <div className="relative">
                    <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={filters.experienceLevel}
                      onChange={(e) => handleFilterChange("experienceLevel", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                    >
                      <option value="">All Levels</option>
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)} Level
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Salary Range</label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minSalary}
                      onChange={(e) => handleFilterChange("minSalary", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxSalary}
                      onChange={(e) => handleFilterChange("maxSalary", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Sort Options */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaSort className="text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">Sort by:</span>
                </div>
                <button
                  onClick={() => handleSort("createdAt")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    sortBy === "createdAt" 
                      ? "bg-blue-100 text-blue-700 border border-blue-200" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FaClock />
                  Date {sortBy === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                  onClick={() => handleSort("salary.min")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    sortBy === "salary.min" 
                      ? "bg-blue-100 text-blue-700 border border-blue-200" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FaMoneyBillWave />
                  Salary {sortBy === "salary.min" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Showing <span className="font-bold text-blue-600">{jobs.length}</span> of <span className="font-bold text-blue-600">{pagination.total}</span> jobs
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Jobs Grid */}
        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBriefcase className="text-4xl text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No jobs found</h3>
              <p className="text-gray-600 text-lg mb-6">
                Try adjusting your filters or search terms to discover more opportunities
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaTimes />
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div key={job._id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
                <div className="p-8">
                  {/* Job Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {job.company?.charAt(0) || 'C'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                        </h3>
                        <p className="text-gray-600 font-semibold">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <FaHeart />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                        <FaShare />
                      </button>
                    </div>
                  </div>

                  {/* Job Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getJobTypeColor(job.jobType)}`}>
                      {job.jobType?.replace('-', ' ')}
                    </span>
                    {job.experienceLevel && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getExperienceColor(job.experienceLevel)}`}>
                        {job.experienceLevel} level
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      New
                    </span>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <FaMapMarkerAlt className="text-gray-500 text-sm" />
                      </div>
                      <span className="font-medium">{job.location}</span>
                    </div>
                    
                    {job.salary && (
                      <div className="flex items-center text-gray-600">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                          <FaMoneyBillWave className="text-emerald-500 text-sm" />
                        </div>
                        <span className="font-medium text-emerald-600">{formatSalary(job.salary)}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-gray-600">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <FaClock className="text-blue-500 text-sm" />
                      </div>
                      <span className="font-medium">{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Job Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {job.description?.substring(0, 150)}...
                  </p>

                  {/* Job Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaEye className="text-blue-400 mr-2" />
                      <span className="font-medium">{job.views || 0} views</span>
                    </div>
                    <Link
                      to={`/jobs/${job._id}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      View Details
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
                  disabled={pagination.currentPage === 1}
                  className="px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setPagination(prev => ({ ...prev, currentPage: page }))}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        pagination.currentPage === page
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.min(pagination.totalPages, prev.currentPage + 1) }))}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Job Search Tips</h2>
                <p className="text-emerald-100">Maximize your success with these expert recommendations</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <FaSearch />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2 text-lg">Use Specific Keywords</h3>
                    <p className="text-blue-800">
                      Include specific skills, job titles, and technologies in your search to find the most relevant opportunities.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <FaBookmark />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900 mb-2 text-lg">Save Interesting Jobs</h3>
                    <p className="text-emerald-800">
                      Bookmark jobs that interest you and apply when you have time to craft a thoughtful application.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
