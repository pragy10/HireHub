import { useEffect, useState } from "react";
import {
    FaBriefcase,
    FaCalendar,
    FaCheckCircle,
    FaClock,
    FaEye,
    FaHourglassHalf,
    FaMapMarkerAlt,
    FaTimesCircle,
    FaChartLine,
    FaFilter,
    FaStar
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AppliedJobs = () => {
  const { api } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const response = await api.get("/users/applied-jobs");
      setAppliedJobs(response.data.appliedJobs || []);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="text-amber-500" />;
      case "reviewed":
        return <FaEye className="text-blue-500" />;
      case "shortlisted":
        return <FaCheckCircle className="text-emerald-500" />;
      case "rejected":
        return <FaTimesCircle className="text-red-500" />;
      case "hired":
        return <FaStar className="text-yellow-500" />;
      default:
        return <FaHourglassHalf className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "reviewed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shortlisted":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "hired":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "reviewed":
        return "Under Review";
      case "shortlisted":
        return "Shortlisted";
      case "rejected":
        return "Not Selected";
      case "hired":
        return "Hired";
      default:
        return "Unknown";
    }
  };

  const filteredJobs = appliedJobs.filter(job => {
    if (filter === "all") return true;
    return job.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-blue-400 animate-pulse mx-auto"></div>
          </div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading your applications...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <FaChartLine className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
            My Applications
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track and manage your job applications with real-time status updates
          </p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-3xl opacity-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaBriefcase className="text-blue-600 text-xl" />
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {appliedJobs.length}
                </div>
              </div>
              <div className="text-gray-600 font-medium">Total Applications</div>
              <div className="text-xs text-gray-500 mt-1">All time</div>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-bl-3xl opacity-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <FaClock className="text-amber-600 text-xl" />
                </div>
                <div className="text-3xl font-bold text-amber-600">
                  {appliedJobs.filter(job => job.status === "pending").length}
                </div>
              </div>
              <div className="text-gray-600 font-medium">Pending Review</div>
              <div className="text-xs text-gray-500 mt-1">Awaiting response</div>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-bl-3xl opacity-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <FaCheckCircle className="text-emerald-600 text-xl" />
                </div>
                <div className="text-3xl font-bold text-emerald-600">
                  {appliedJobs.filter(job => job.status === "shortlisted").length}
                </div>
              </div>
              <div className="text-gray-600 font-medium">Shortlisted</div>
              <div className="text-xs text-gray-500 mt-1">Great progress!</div>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-bl-3xl opacity-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <FaTimesCircle className="text-red-600 text-xl" />
                </div>
                <div className="text-3xl font-bold text-red-600">
                  {appliedJobs.filter(job => job.status === "rejected").length}
                </div>
              </div>
              <div className="text-gray-600 font-medium">Not Selected</div>
              <div className="text-xs text-gray-500 mt-1">Keep trying!</div>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaFilter className="text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Filter Applications</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                filter === "all" 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              All ({appliedJobs.length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                filter === "pending" 
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg transform scale-105" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              Pending ({appliedJobs.filter(job => job.status === "pending").length})
            </button>
            <button
              onClick={() => setFilter("reviewed")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                filter === "reviewed" 
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              Under Review ({appliedJobs.filter(job => job.status === "reviewed").length})
            </button>
            <button
              onClick={() => setFilter("shortlisted")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                filter === "shortlisted" 
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg transform scale-105" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              Shortlisted ({appliedJobs.filter(job => job.status === "shortlisted").length})
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                filter === "rejected" 
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              Not Selected ({appliedJobs.filter(job => job.status === "rejected").length})
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((application) => (
              <div key={application._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      {/* Job Title and Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {application.job?.title}
                        </h3>
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadge(application.status)}`}>
                          {getStatusIcon(application.status)}
                          {getStatusText(application.status)}
                        </span>
                      </div>
                      
                      {/* Company */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {application.job?.company?.charAt(0)}
                        </div>
                        <p className="text-lg font-semibold text-gray-700">{application.job?.company}</p>
                      </div>
                      
                      {/* Job Details */}
                      <div className="flex flex-wrap items-center gap-6 text-gray-600">
                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                          <FaMapMarkerAlt className="text-gray-500" />
                          <span className="font-medium">{application.job?.location}</span>
                        </span>
                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                          <FaBriefcase className="text-gray-500" />
                          <span className="font-medium">{application.job?.jobType}</span>
                        </span>
                        <span className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                          <FaCalendar className="text-gray-500" />
                          <span className="font-medium">Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
                        </span>
                      </div>

                      {/* Salary */}
                      {application.job?.salary && (
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 rounded-xl border border-emerald-200">
                          <span className="text-emerald-600 font-bold text-lg">
                            ${application.job.salary.min?.toLocaleString()} - ${application.job.salary.max?.toLocaleString()}
                          </span>
                          <span className="text-emerald-600 text-sm">per year</span>
                        </div>
                      )}

                      {/* Status Messages */}
                      {application.status === "pending" && (
                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 p-4 rounded-xl">
                          <div className="flex items-start gap-3">
                            <FaClock className="text-amber-600 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-amber-800 font-medium">Application Under Review</p>
                              <p className="text-amber-700 text-sm mt-1">
                                Your application is being reviewed by the hiring team. We'll notify you once there's an update.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {application.status === "reviewed" && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-xl">
                          <div className="flex items-start gap-3">
                            <FaEye className="text-blue-600 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-blue-800 font-medium">Application Reviewed</p>
                              <p className="text-blue-700 text-sm mt-1">
                                Your application has been reviewed. The hiring team is currently evaluating candidates.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {application.status === "shortlisted" && (
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-4 rounded-xl">
                          <div className="flex items-start gap-3">
                            <FaCheckCircle className="text-emerald-600 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-emerald-800 font-medium">🎉 Congratulations! You're Shortlisted</p>
                              <p className="text-emerald-700 text-sm mt-1">
                                You've been shortlisted for this position. The company will contact you soon for next steps.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {application.status === "rejected" && (
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 p-4 rounded-xl">
                          <div className="flex items-start gap-3">
                            <FaTimesCircle className="text-red-600 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-red-800 font-medium">Application Not Selected</p>
                              <p className="text-red-700 text-sm mt-1">
                                Thank you for your interest. Unfortunately, you were not selected for this position. Keep applying for other opportunities!
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {application.status === "hired" && (
                        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 p-4 rounded-xl">
                          <div className="flex items-start gap-3">
                            <FaStar className="text-yellow-600 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-yellow-800 font-bold">🎉 Congratulations! You've Been Hired!</p>
                              <p className="text-yellow-700 text-sm mt-1">
                                Welcome to the team! You've successfully been hired for this position.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <Link 
                        to={`/jobs/${application.job?._id}`} 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <FaEye />
                        View Job Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBriefcase className="text-4xl text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {filter === "all" ? "No applications yet" : `No ${filter} applications`}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {filter === "all" 
                    ? "Start your job search journey by applying to positions that match your skills." 
                    : `You don't have any ${filter} applications at the moment.`
                  }
                </p>
                {filter === "all" && (
                  <Link 
                    to="/jobs" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FaBriefcase />
                    Browse Available Jobs
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Tips Section */}
        {appliedJobs.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FaChartLine className="text-white" />
                </div>
                Application Success Tips
              </h2>
              <p className="text-blue-100 mt-2">Maximize your chances of landing your dream job</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                      <FaEye />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900 mb-2 text-lg">Follow Up Strategically</h3>
                      <p className="text-blue-800">
                        Send a polite follow-up email 1-2 weeks after applying. Show continued interest and ask about the timeline.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                      <FaBriefcase />
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-900 mb-2 text-lg">Keep Applying</h3>
                      <p className="text-emerald-800">
                        Don't put all your eggs in one basket. Apply to multiple positions to increase your chances of success.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
