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
  FaUsers,
  FaBuilding,
  FaGlobe,
  FaArrowUp,
  FaArrowRight,
  FaCheckCircle,
  FaLightbulb,
  FaRocket,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaEye,
  FaHeart,
  FaShare
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const RecruitmentJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    salary: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const { api } = useAuth();

  useEffect(() => {
    fetchRecruitmentJobs();
  }, []);

  const fetchRecruitmentJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/jobs");
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load recruitment jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
                         job.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesJobType = !filters.jobType || job.jobType === filters.jobType;
    const matchesExperience = !filters.experienceLevel || job.experienceLevel === filters.experienceLevel;
    const matchesSalary = !filters.salary || job.salary.includes(filters.salary);

    return matchesSearch && matchesLocation && matchesJobType && matchesExperience && matchesSalary;
  });

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      jobType: "",
      experienceLevel: "",
      salary: ""
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-indigo-400 animate-pulse mx-auto"></div>
          </div>
          <p className="mt-8 text-xl text-gray-700 font-semibold">Loading recruitment opportunities...</p>
          <p className="text-sm text-gray-500 mt-2">Discovering amazing career opportunities for you</p>
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
              <FaUsers className="text-3xl text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Recruitment
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover the latest recruitment positions from top companies worldwide and advance your career in talent acquisition
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="relative max-w-3xl mx-auto mb-8">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 text-xl" />
              </div>
              <input
                type="text"
                placeholder="Search for recruitment jobs, companies, or keywords..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-16 pr-6 py-6 rounded-3xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-2xl backdrop-blur-sm bg-white/95"
              />
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-blue-200">
              <div className="flex items-center gap-2">
                <FaCheckCircle />
                <span className="text-sm font-medium">{jobs.length}+ Active Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBuilding />
                <span className="text-sm font-medium">{new Set(jobs.map(job => job.company)).size}+ Companies</span>
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
              <div className="text-3xl font-bold text-blue-600 mb-2">{jobs.length}</div>
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
                {jobs.filter(job => job.jobType === "Full-time").length}
              </div>
              <div className="text-gray-700 font-semibold">Full-time</div>
              <div className="text-xs text-gray-500 mt-1">Permanent roles</div>
            </div>
          </div>
          
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaGlobe className="text-2xl text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {jobs.filter(job => job.jobType === "Remote").length}
              </div>
              <div className="text-gray-700 font-semibold">Remote</div>
              <div className="text-xs text-gray-500 mt-1">Work anywhere</div>
            </div>
          </div>
          
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaBuilding className="text-2xl text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {new Set(jobs.map(job => job.company)).size}
              </div>
              <div className="text-gray-700 font-semibold">Companies</div>
              <div className="text-xs text-gray-500 mt-1">Hiring actively</div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Location</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="City, Country"
                      value={filters.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Job Type</label>
                  <select
                    value={filters.jobType}
                    onChange={(e) => handleFilterChange("jobType", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Experience</label>
                  <select
                    value={filters.experienceLevel}
                    onChange={(e) => handleFilterChange("experienceLevel", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                  >
                    <option value="">All Levels</option>
                    <option value="Entry">Entry Level</option>
                    <option value="Mid">Mid Level</option>
                    <option value="Senior">Senior Level</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Salary</label>
                  <select
                    value={filters.salary}
                    onChange={(e) => handleFilterChange("salary", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                  >
                    <option value="">All Salaries</option>
                    <option value="$30k">$30k+</option>
                    <option value="$50k">$50k+</option>
                    <option value="$75k">$75k+</option>
                    <option value="$100k">$100k+</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-2xl font-medium transition-all duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              {filteredJobs.length} Recruitment Jobs Found
            </h3>
            <div className="text-sm text-gray-600 font-medium">
              Showing latest opportunities
            </div>
          </div>
        </div>

        {/* Enhanced Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-4xl text-gray-500" />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
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
                          {job.title}
                        </h3>
                        <p className="text-lg font-semibold text-blue-600 mb-2">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <FaStar />
                        <span className="text-sm text-gray-600 font-medium">4.5</span>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <FaHeart />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                        <FaShare />
                      </button>
                    </div>
                  </div>

                  {/* Job Tags */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium border border-blue-200">
                      <FaMapMarkerAlt />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-2 rounded-full text-sm font-medium border border-emerald-200">
                      <FaMoneyBillWave />
                      {job.salary}
                    </span>
                    <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium border border-purple-200">
                      <FaClock />
                      {job.jobType}
                    </span>
                    <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-2 rounded-full text-sm font-medium border border-orange-200">
                      <FaBriefcase />
                      {job.experienceLevel}
                    </span>
                  </div>

                  {/* Job Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {job.description.substring(0, 150)}...
                  </p>

                  {/* Job Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="text-sm text-gray-500 font-medium">
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                    <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                      <FaEye />
                      View Details
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
                <h2 className="text-2xl font-bold text-white">Recruitment Career Tips</h2>
                <p className="text-emerald-100">Expert advice for landing your dream recruitment role</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <FaUsers />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2 text-lg">Build Your Network</h3>
                    <p className="text-blue-800">
                      Connect with HR professionals and industry leaders. Networking is crucial in recruitment careers.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <FaRocket />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900 mb-2 text-lg">Develop People Skills</h3>
                    <p className="text-emerald-800">
                      Focus on communication, empathy, and relationship-building skills essential for recruitment success.
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

export default RecruitmentJobs;
