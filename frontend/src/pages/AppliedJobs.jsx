import { useEffect, useState } from "react";
import {
    FaBriefcase,
    FaCalendar,
    FaCheckCircle,
    FaClock,
    FaEye,
    FaHourglassHalf,
    FaMapMarkerAlt,
    FaTimesCircle
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AppliedJobs = () => {
  const { api } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

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

  useEffect(() => {
    fetchAppliedJobs();
  }, [fetchAppliedJobs]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="text-yellow-500" />;
      case "reviewed":
        return <FaEye className="text-blue-500" />;
      case "shortlisted":
        return <FaCheckCircle className="text-green-500" />;
      case "rejected":
        return <FaTimesCircle className="text-red-500" />;
      case "hired":
        return <FaCheckCircle className="text-green-600" />;
      default:
        return <FaHourglassHalf className="text-gray-500" />;
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
      <div className="loading">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
        <p className="text-gray-600">Track the status of your job applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {appliedJobs.length}
            </div>
            <div className="text-gray-600">Total Applications</div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {appliedJobs.filter(job => job.status === "pending").length}
            </div>
            <div className="text-gray-600">Pending Review</div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {appliedJobs.filter(job => job.status === "shortlisted").length}
            </div>
            <div className="text-gray-600">Shortlisted</div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {appliedJobs.filter(job => job.status === "rejected").length}
            </div>
            <div className="text-gray-600">Not Selected</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-secondary"}`}
            >
              All ({appliedJobs.length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`btn btn-sm ${filter === "pending" ? "btn-primary" : "btn-secondary"}`}
            >
              Pending ({appliedJobs.filter(job => job.status === "pending").length})
            </button>
            <button
              onClick={() => setFilter("reviewed")}
              className={`btn btn-sm ${filter === "reviewed" ? "btn-primary" : "btn-secondary"}`}
            >
              Under Review ({appliedJobs.filter(job => job.status === "reviewed").length})
            </button>
            <button
              onClick={() => setFilter("shortlisted")}
              className={`btn btn-sm ${filter === "shortlisted" ? "btn-primary" : "btn-secondary"}`}
            >
              Shortlisted ({appliedJobs.filter(job => job.status === "shortlisted").length})
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={`btn btn-sm ${filter === "rejected" ? "btn-primary" : "btn-secondary"}`}
            >
              Not Selected ({appliedJobs.filter(job => job.status === "rejected").length})
            </button>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((application) => (
            <div key={application._id} className="card">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {application.job?.title}
                      </h3>
                      <span className={`badge ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1">{getStatusText(application.status)}</span>
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{application.job?.company}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {application.job?.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBriefcase />
                        {application.job?.jobType}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendar />
                        Applied {new Date(application.appliedAt).toLocaleDateString()}
                      </span>
                    </div>

                    {application.job?.salary && (
                      <div className="text-green-600 font-semibold mb-3">
                        ${application.job.salary.min?.toLocaleString()} - ${application.job.salary.max?.toLocaleString()}
                      </div>
                    )}

                    {/* Status-specific messages */}
                    {application.status === "pending" && (
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                          Your application is being reviewed by the hiring team. We'll notify you once there's an update.
                        </p>
                      </div>
                    )}

                    {application.status === "reviewed" && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-blue-800 text-sm">
                          Your application has been reviewed. The hiring team is currently evaluating candidates.
                        </p>
                      </div>
                    )}

                    {application.status === "shortlisted" && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-green-800 text-sm">
                          Congratulations! You've been shortlisted for this position. The company will contact you soon for next steps.
                        </p>
                      </div>
                    )}

                    {application.status === "rejected" && (
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-red-800 text-sm">
                          Thank you for your interest. Unfortunately, you were not selected for this position. Keep applying for other opportunities!
                        </p>
                      </div>
                    )}

                    {application.status === "hired" && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-green-800 text-sm font-semibold">
                          🎉 Congratulations! You've been hired for this position!
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link 
                      to={`/jobs/${application.job?._id}`} 
                      className="btn btn-outline btn-sm"
                    >
                      <FaEye className="mr-1" />
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <FaBriefcase className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === "all" ? "No applications yet" : `No ${filter} applications`}
            </h3>
            <p className="text-gray-600 mb-4">
              {filter === "all" 
                ? "Start applying to jobs to see your applications here." 
                : `You don't have any ${filter} applications at the moment.`
              }
            </p>
            {filter === "all" && (
              <Link to="/jobs" className="btn btn-primary">
                Browse Jobs
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Tips Section */}
      {appliedJobs.length > 0 && (
        <div className="mt-8 card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Application Tips</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Follow Up</h3>
                <p className="text-blue-800 text-sm">
                  Consider following up on applications that have been pending for more than a week.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Keep Applying</h3>
                <p className="text-green-800 text-sm">
                  Don't get discouraged by rejections. Keep applying to multiple positions to increase your chances.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs; 