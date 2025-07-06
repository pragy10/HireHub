import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaBriefcase,
    FaCalendar,
    FaCheck,
    FaClock,
    FaEdit,
    FaEye,
    FaMapMarkerAlt,
    FaPlus,
    FaTimes,
    FaTrash,
    FaUsers,
    FaChartLine,
    FaBuilding,
    FaRocket,
    FaArrowUp,
    FaUserTie,
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf,
    FaStar,
    FaArrowRight,
    FaLightbulb,
    FaFilter,
    FaDownload
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EmployerDashboard = () => {
  const { api } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplications, setShowApplications] = useState(false);

  useEffect(() => {
    fetchEmployerJobs();
  }, []);

  const fetchEmployerJobs = async () => {
    try {
      const response = await api.get("/jobs/employer/jobs");
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching employer jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await api.delete(`/jobs/${jobId}`);
        toast.success("Job deleted successfully!");
        fetchEmployerJobs();
      } catch (error) {
        toast.error("Failed to delete job");
      }
    }
  };

  const handleUpdateApplicationStatus = async (jobId, applicationId, status) => {
    try {
      await api.put("/jobs/application/status", {
        jobId,
        applicationId,
        status
      });
      toast.success("Application status updated!");
      fetchEmployerJobs();
    } catch (error) {
      toast.error("Failed to update application status");
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
        return "Pending";
      case "reviewed":
        return "Reviewed";
      case "shortlisted":
        return "Shortlisted";
      case "rejected":
        return "Rejected";
      case "hired":
        return "Hired";
      default:
        return "Unknown";
    }
  };

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(job => job.isActive).length,
    totalApplications: jobs.reduce((sum, job) => sum + (job.applications?.length || 0), 0),
    pendingApplications: jobs.reduce((sum, job) => 
      sum + (job.applications?.filter(app => app.status === "pending").length || 0), 0
    )
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-indigo-400 animate-pulse mx-auto"></div>
          </div>
          <p className="mt-8 text-xl text-gray-700 font-semibold">Loading employer dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing your recruitment center</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-8 md:p-12 mb-10 overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 translate-y-20"></div>
            <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white rounded-full"></div>
          </div>
          
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <FaBuilding className="text-2xl text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Employer Dashboard
                  </h1>
                  <p className="text-blue-100 text-lg">
                    Manage your job postings and discover exceptional talent
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  Recruitment Center
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <FaStar className="text-yellow-300" />
                  Premium Employer
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <Link 
                to="/post-job" 
                className="inline-flex items-center gap-3 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaPlus className="text-xl" />
                Post New Job
              </Link>
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
                    {stats.totalJobs}
                  </div>
                  <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <FaArrowUp />
                    All time
                  </div>
                </div>
              </div>
              <div className="text-gray-700 font-semibold">Total Jobs Posted</div>
              <div className="text-xs text-gray-500 mt-1">Your job listings</div>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-emerald-100 rounded-2xl group-hover:scale-110 transition-transform">
                  <FaRocket className="text-emerald-600 text-2xl" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">
                    {stats.activeJobs}
                  </div>
                  <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <FaArrowUp />
                    Currently live
                  </div>
                </div>
              </div>
              <div className="text-gray-700 font-semibold">Active Jobs</div>
              <div className="text-xs text-gray-500 mt-1">Accepting applications</div>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-purple-100 rounded-2xl group-hover:scale-110 transition-transform">
                  <FaUsers className="text-purple-600 text-2xl" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {stats.totalApplications}
                  </div>
                  <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <FaArrowUp />
                    Total received
                  </div>
                </div>
              </div>
              <div className="text-gray-700 font-semibold">Total Applications</div>
              <div className="text-xs text-gray-500 mt-1">All positions</div>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-amber-100 rounded-2xl group-hover:scale-110 transition-transform">
                  <FaClock className="text-amber-600 text-2xl" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-amber-600 mb-1">
                    {stats.pendingApplications}
                  </div>
                  <div className="text-xs text-red-600 font-medium flex items-center gap-1">
                    <FaClock />
                    Needs attention
                  </div>
                </div>
              </div>
              <div className="text-gray-700 font-semibold">Pending Review</div>
              <div className="text-xs text-gray-500 mt-1">Awaiting your response</div>
            </div>
          </div>
        </div>

        {/* Enhanced Jobs List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FaChartLine className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Job Postings</h2>
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-200">
                  <FaFilter />
                  Filter
                </button>
                <button className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-200">
                  <FaDownload />
                  Export
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            {jobs.length > 0 ? (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <div key={job._id} className="group bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        {/* Job Title and Status */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              job.isActive 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                              {job.isActive ? '🟢 Active' : '🔴 Inactive'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Company */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold">
                            {job.company?.charAt(0) || 'C'}
                          </div>
                          <p className="text-lg font-semibold text-gray-700">{job.company}</p>
                        </div>
                        
                        {/* Job Details */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                            <FaMapMarkerAlt className="text-gray-500" />
                            <span className="font-medium">{job.location}</span>
                          </span>
                          <span className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                            <FaBriefcase className="text-gray-500" />
                            <span className="font-medium">{job.jobType}</span>
                          </span>
                          <span className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                            <FaCalendar className="text-gray-500" />
                            <span className="font-medium">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                          </span>
                          <span className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-lg text-blue-700">
                            <FaEye className="text-blue-500" />
                            <span className="font-medium">{job.views || 0} views</span>
                          </span>
                        </div>

                        {/* Salary */}
                        {job.salary && (
                          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 rounded-xl border border-emerald-200">
                            <span className="text-emerald-600 font-bold text-lg">
                              ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
                            </span>
                            <span className="text-emerald-600 text-sm">per year</span>
                          </div>
                        )}

                        {/* Enhanced Applications Summary */}
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                              <FaUsers className="text-blue-600" />
                              Applications ({job.applications?.length || 0})
                            </h4>
                            <button
                              onClick={() => {
                                setSelectedJob(job);
                                setShowApplications(true);
                              }}
                              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                              View All Applications
                              <FaArrowRight />
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-xl p-4 text-center border border-amber-200">
                              <div className="text-2xl font-bold text-amber-600 mb-1">
                                {job.applications?.filter(app => app.status === "pending").length || 0}
                              </div>
                              <div className="text-xs text-amber-700 font-medium">Pending</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center border border-blue-200">
                              <div className="text-2xl font-bold text-blue-600 mb-1">
                                {job.applications?.filter(app => app.status === "reviewed").length || 0}
                              </div>
                              <div className="text-xs text-blue-700 font-medium">Reviewed</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center border border-emerald-200">
                              <div className="text-2xl font-bold text-emerald-600 mb-1">
                                {job.applications?.filter(app => app.status === "shortlisted").length || 0}
                              </div>
                              <div className="text-xs text-emerald-700 font-medium">Shortlisted</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center border border-red-200">
                              <div className="text-2xl font-bold text-red-600 mb-1">
                                {job.applications?.filter(app => app.status === "rejected").length || 0}
                              </div>
                              <div className="text-xs text-red-700 font-medium">Rejected</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex xl:flex-col gap-3">
                        <Link 
                          to={`/jobs/${job._id}`} 
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <FaEye />
                          View Job
                        </Link>
                        <Link 
                          to={`/jobs/${job._id}/edit`} 
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <FaEdit />
                          Edit Job
                        </Link>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-200 to-indigo-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaBriefcase className="text-4xl text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No job postings yet</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Start your recruitment journey by posting your first job and attract top talent to your company.
                  </p>
                  <Link 
                    to="/post-job" 
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FaPlus />
                    Post Your First Job
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Applications Modal */}
        {showApplications && selectedJob && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <FaUsers className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Applications</h3>
                      <p className="text-blue-100">{selectedJob.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowApplications(false);
                      setSelectedJob(null);
                    }}
                    className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>
              
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                {selectedJob.applications && selectedJob.applications.length > 0 ? (
                  <div className="space-y-6">
                    {selectedJob.applications.map((application) => (
                      <div key={application._id} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                          <div className="flex-1 space-y-4">
                            {/* Applicant Info */}
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                {application.applicant?.name?.charAt(0) || 'A'}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl font-bold text-gray-900 mb-1">
                                  {application.applicant?.name}
                                </h4>
                                <p className="text-gray-600 mb-2">{application.applicant?.email}</p>
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                  <FaCalendar />
                                  Applied {new Date(application.appliedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadge(application.status)}`}>
                                  {getStatusIcon(application.status)}
                                  {getStatusText(application.status)}
                                </span>
                              </div>
                            </div>

                            {/* Cover Letter */}
                            {application.coverLetter && (
                              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                  <FaUserTie className="text-blue-600" />
                                  Cover Letter
                                </h5>
                                <p className="text-gray-700 leading-relaxed">{application.coverLetter}</p>
                              </div>
                            )}
                          </div>

                          {/* Status Update */}
                          <div className="flex-shrink-0">
                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Update Status
                              </label>
                              <select
                                value={application.status}
                                onChange={(e) => handleUpdateApplicationStatus(
                                  selectedJob._id, 
                                  application._id, 
                                  e.target.value
                                )}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              >
                                <option value="pending">Pending</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="rejected">Rejected</option>
                                <option value="hired">Hired</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaUsers className="text-4xl text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">No applications yet</h3>
                    <p className="text-gray-600">This job posting hasn't received any applications yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Tips Section */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Employer Success Tips</h2>
                <p className="text-emerald-100">Best practices for effective recruitment</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <FaClock />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2 text-lg">Respond Quickly</h3>
                    <p className="text-blue-800 mb-3">
                      Respond to applications within 24-48 hours to maintain candidate interest and improve your company's reputation.
                    </p>
                    <div className="text-xs text-blue-600 font-medium">
                      ✓ Set up notifications ✓ Review daily ✓ Send acknowledgments
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="group p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <FaEdit />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900 mb-2 text-lg">Write Clear Job Descriptions</h3>
                    <p className="text-emerald-800 mb-3">
                      Detailed and accurate job descriptions attract more qualified candidates and reduce unqualified applications.
                    </p>
                    <div className="text-xs text-emerald-600 font-medium">
                      ✓ Clear requirements ✓ Company culture ✓ Growth opportunities
                    </div>
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

export default EmployerDashboard;
