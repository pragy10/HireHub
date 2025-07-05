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
    FaUsers
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
        return <FaClock className="text-yellow-500" />;
      case "reviewed":
        return <FaEye className="text-blue-500" />;
      case "shortlisted":
        return <FaCheck className="text-green-500" />;
      case "rejected":
        return <FaTimes className="text-red-500" />;
      case "hired":
        return <FaCheck className="text-green-600" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "reviewed":
        return "badge-info";
      case "shortlisted":
        return "badge-success";
      case "rejected":
        return "badge-danger";
      case "hired":
        return "badge-success";
      default:
        return "badge-info";
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
      <div className="loading">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employer dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Dashboard</h1>
            <p className="text-gray-600">Manage your job postings and applications</p>
          </div>
          <Link to="/post-job" className="btn btn-primary">
            <FaPlus className="mr-2" />
            Post New Job
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalJobs}</div>
            <div className="text-gray-600">Total Jobs</div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.activeJobs}</div>
            <div className="text-gray-600">Active Jobs</div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalApplications}</div>
            <div className="text-gray-600">Total Applications</div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pendingApplications}</div>
            <div className="text-gray-600">Pending Review</div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold">Your Job Postings</h2>
        </div>
        <div className="card-body">
          {jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job) => (
                <div key={job._id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        <span className={`badge ${job.isActive ? 'badge-success' : 'badge-danger'}`}>
                          {job.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{job.company}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaBriefcase />
                          {job.jobType}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCalendar />
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaEye />
                          {job.views || 0} views
                        </span>
                      </div>

                      {job.salary && (
                        <div className="text-green-600 font-semibold mb-4">
                          ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
                        </div>
                      )}

                      {/* Applications Summary */}
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-900">
                            Applications ({job.applications?.length || 0})
                          </h4>
                          <button
                            onClick={() => {
                              setSelectedJob(job);
                              setShowApplications(true);
                            }}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View All
                          </button>
                        </div>
                        
                        <div className="flex gap-4 text-sm">
                          <span className="text-yellow-600">
                            {job.applications?.filter(app => app.status === "pending").length || 0} Pending
                          </span>
                          <span className="text-blue-600">
                            {job.applications?.filter(app => app.status === "reviewed").length || 0} Reviewed
                          </span>
                          <span className="text-green-600">
                            {job.applications?.filter(app => app.status === "shortlisted").length || 0} Shortlisted
                          </span>
                          <span className="text-red-600">
                            {job.applications?.filter(app => app.status === "rejected").length || 0} Rejected
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link 
                        to={`/jobs/${job._id}`} 
                        className="btn btn-outline btn-sm"
                      >
                        <FaEye className="mr-1" />
                        View
                      </Link>
                      <Link 
                        to={`/jobs/${job._id}/edit`} 
                        className="btn btn-outline btn-sm"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="btn btn-danger btn-sm"
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaBriefcase className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No job postings yet</h3>
              <p className="text-gray-600 mb-4">
                Start posting jobs to attract talented candidates to your company.
              </p>
              <Link to="/post-job" className="btn btn-primary">
                <FaPlus className="mr-2" />
                Post Your First Job
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Applications Modal */}
      {showApplications && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Applications for {selectedJob.title}
                </h3>
                <button
                  onClick={() => {
                    setShowApplications(false);
                    setSelectedJob(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="card-body">
              {selectedJob.applications && selectedJob.applications.length > 0 ? (
                <div className="space-y-4">
                  {selectedJob.applications.map((application) => (
                    <div key={application._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {application.applicant?.name}
                          </h4>
                          <p className="text-gray-600">{application.applicant?.email}</p>
                          <p className="text-sm text-gray-500">
                            Applied {new Date(application.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`badge ${getStatusColor(application.status)}`}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1">{getStatusText(application.status)}</span>
                          </span>
                        </div>
                      </div>

                      {application.coverLetter && (
                        <div className="mb-3">
                          <h5 className="font-medium text-gray-900 mb-1">Cover Letter:</h5>
                          <p className="text-gray-700 text-sm">{application.coverLetter}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <select
                          value={application.status}
                          onChange={(e) => handleUpdateApplicationStatus(
                            selectedJob._id, 
                            application._id, 
                            e.target.value
                          )}
                          className="form-input form-select text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                          <option value="hired">Hired</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaUsers className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No applications yet for this job posting.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-8 card">
        <div className="card-header">
          <h2 className="text-xl font-semibold">Employer Tips</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Respond Quickly</h3>
              <p className="text-blue-800 text-sm">
                Respond to applications within 24-48 hours to maintain candidate interest and improve your company's reputation.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Write Clear Job Descriptions</h3>
              <p className="text-green-800 text-sm">
                Detailed and accurate job descriptions attract more qualified candidates and reduce application volume from unqualified applicants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard; 