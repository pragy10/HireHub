import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaArrowLeft,
    FaBriefcase,
    FaBuilding,
    FaCalendar,
    FaCheck,
    FaGlobe,
    FaMapMarkerAlt,
    FaTimes
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const JobDetail = () => {
  const { id } = useParams();
  const { user, api } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    resume: ""
  });

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data.job);
    } catch (error) {
      console.error("Error fetching job details:", error);
      toast.error("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setApplying(true);

    try {
      await api.post(`/jobs/${id}/apply`, applicationData);
      toast.success("Application submitted successfully!");
      setShowApplicationForm(false);
      fetchJobDetails(); // Refresh to update application status
    } catch (error) {
      const message = error.response?.data?.message || "Failed to submit application";
      toast.error(message);
    } finally {
      setApplying(false);
    }
  };

  const hasApplied = job?.applications?.some(app => 
    app.applicant === user?.id
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
        <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <Link to="/jobs" className="btn btn-primary">
          <FaArrowLeft className="mr-2" />
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/jobs" className="btn btn-outline">
          <FaArrowLeft className="mr-2" />
          Back to Jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Job Header */}
          <div className="card mb-6">
            <div className="card-body">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <p className="text-xl text-gray-600 mb-4">{job.company}</p>
                </div>
                {user?.role === "employer" && job.createdBy === user.id && (
                  <div className="flex gap-2">
                    <Link to={`/jobs/${job._id}/edit`} className="btn btn-outline btn-sm">
                      Edit
                    </Link>
                    <button className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span className="text-gray-600">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-gray-400" />
                  <span className="text-gray-600 capitalize">{job.jobType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-gray-400" />
                  <span className="text-gray-600">
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {job.salary && (
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-green-900 mb-1">Salary Range</h3>
                  <p className="text-2xl font-bold text-green-600">
                    ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
                    <span className="text-sm font-normal text-green-700 ml-2">
                      per {job.salary.period}
                    </span>
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="badge badge-info capitalize">{job.experienceLevel} Level</span>
                <span className="badge badge-info capitalize">{job.jobType}</span>
                {job.skills?.slice(0, 3).map((skill, index) => (
                  <span key={index} className="badge badge-success">{skill}</span>
                ))}
              </div>

              {/* Application Button */}
              {user?.role === "jobseeker" && (
                <div className="border-t pt-6">
                  {hasApplied ? (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <FaCheck />
                        <span className="font-semibold">Application Submitted</span>
                      </div>
                      <p className="text-green-600 text-sm mt-1">
                        Your application has been submitted successfully. We'll notify you of any updates.
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowApplicationForm(true)}
                      className="btn btn-primary btn-lg"
                    >
                      Apply for this Position
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="card mb-6">
            <div className="card-header">
              <h2 className="text-xl font-semibold">Job Description</h2>
            </div>
            <div className="card-body">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-xl font-semibold">Requirements</h2>
              </div>
              <div className="card-body">
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-xl font-semibold">Responsibilities</h2>
              </div>
              <div className="card-body">
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold">Benefits</h2>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Company Info */}
          <div className="card mb-6">
            <div className="card-header">
              <h3 className="text-lg font-semibold">About the Company</h3>
            </div>
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <FaBuilding className="text-2xl text-blue-600" />
                <div>
                  <h4 className="font-semibold">{job.company}</h4>
                  <p className="text-sm text-gray-600">
                    {job.createdBy?.company?.size || "Company size not specified"}
                  </p>
                </div>
              </div>
              
              {job.createdBy?.company?.website && (
                <a 
                  href={job.createdBy.company.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-3"
                >
                  <FaGlobe />
                  <span>Visit Website</span>
                </a>
              )}

              {job.createdBy?.company?.description && (
                <p className="text-gray-600 text-sm">
                  {job.createdBy.company.description}
                </p>
              )}
            </div>
          </div>

          {/* Job Stats */}
          <div className="card mb-6">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Job Statistics</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold">{job.views || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-semibold">{job.applicationsCount || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-semibold">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Jobs */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Similar Jobs</h3>
            </div>
            <div className="card-body">
              <p className="text-gray-600 text-sm">
                Similar job opportunities will appear here based on your search history and preferences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Apply for {job.title}</h3>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleApply}>
                <div className="form-group">
                  <label className="form-label">Cover Letter</label>
                  <textarea
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData(prev => ({
                      ...prev,
                      coverLetter: e.target.value
                    }))}
                    className="form-input form-textarea"
                    placeholder="Tell us why you're interested in this position..."
                    rows={6}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Resume</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setApplicationData(prev => ({
                      ...prev,
                      resume: e.target.files[0]
                    }))}
                    className="form-input"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="btn btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={applying}
                    className="btn btn-primary flex-1"
                  >
                    {applying ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail; 