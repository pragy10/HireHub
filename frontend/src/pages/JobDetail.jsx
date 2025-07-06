import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaArrowLeft,
    FaBriefcase,
    FaBuilding,
    FaCalendar,
    FaCheck,
    FaEye,
    FaFileUpload,
    FaGlobe,
    FaMapMarkerAlt,
    FaTimes,
    FaUsers
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
    resume: null
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
    
    if (!applicationData.coverLetter.trim()) {
      toast.error("Please write a cover letter");
      return;
    }
    
    if (!applicationData.resume) {
      toast.error("Please upload your resume");
      return;
    }

    setApplying(true);

    try {
      const formData = new FormData();
      formData.append("coverLetter", applicationData.coverLetter);
      formData.append("resume", applicationData.resume);

      await api.post(`/jobs/${id}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success("Application submitted successfully!");
      setShowApplicationForm(false);
      setApplicationData({ coverLetter: "", resume: null });
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Job Not Found</h2>
          <p className="text-blue-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition">
            <FaArrowLeft className="mr-2 inline" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/jobs" className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition">
            <FaArrowLeft />
            Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-blue-900 mb-2">{job.title}</h1>
                  <p className="text-xl text-blue-600 mb-4">{job.company}</p>
                </div>
                {user?.role === "employer" && job.createdBy === user.id && (
                  <div className="flex gap-2">
                    <Link to={`/jobs/${job._id}/edit`} className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition">
                      Edit
                    </Link>
                    <button className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition">
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2 text-blue-600">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <FaBriefcase className="text-blue-400" />
                  <span className="capitalize">{job.jobType}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <FaCalendar className="text-blue-400" />
                  <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {job.salary && (
                <div className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-1">Salary Range</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
                    <span className="text-sm font-normal text-blue-700 ml-2">
                      per {job.salary.period}
                    </span>
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                  {job.experienceLevel} Level
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                  {job.jobType}
                </span>
                {job.skills?.slice(0, 3).map((skill, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Application Button */}
              {user?.role === "jobseeker" && (
                <div className="border-t border-blue-100 pt-6">
                  {hasApplied ? (
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
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
                      className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Apply for this Position
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
              <div className="p-6 border-b border-blue-100">
                <h2 className="text-2xl font-bold text-blue-700">Job Description</h2>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-blue-700 leading-relaxed">{job.description}</p>
                </div>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
                <div className="p-6 border-b border-blue-100">
                  <h2 className="text-2xl font-bold text-blue-700">Requirements</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-blue-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
                <div className="p-6 border-b border-blue-100">
                  <h2 className="text-2xl font-bold text-blue-700">Responsibilities</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-blue-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
                <div className="p-6 border-b border-blue-100">
                  <h2 className="text-2xl font-bold text-blue-700">Benefits</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FaCheck className="text-green-500" />
                        <span className="text-blue-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
              <div className="p-6 border-b border-blue-100">
                <h3 className="text-xl font-bold text-blue-700">About the Company</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaBuilding className="text-2xl text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-blue-900">{job.company}</h4>
                    <p className="text-sm text-blue-600">
                      {job.createdBy?.company?.size || "Company size not specified"}
                    </p>
                  </div>
                </div>
                
                {job.createdBy?.company?.website && (
                  <a 
                    href={job.createdBy.company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-3 transition"
                  >
                    <FaGlobe />
                    <span>Visit Website</span>
                  </a>
                )}

                {job.createdBy?.company?.description && (
                  <p className="text-blue-600 text-sm">
                    {job.createdBy.company.description}
                  </p>
                )}
              </div>
            </div>

            {/* Job Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
              <div className="p-6 border-b border-blue-100">
                <h3 className="text-xl font-bold text-blue-700">Job Statistics</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-blue-600">
                      <FaEye />
                      <span>Views</span>
                    </div>
                    <span className="font-semibold text-blue-900">{job.views || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-blue-600">
                      <FaUsers />
                      <span>Applications</span>
                    </div>
                    <span className="font-semibold text-blue-900">{job.applicationsCount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-blue-600">
                      <FaCalendar />
                      <span>Posted</span>
                    </div>
                    <span className="font-semibold text-blue-900">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
              <div className="p-6 border-b border-blue-100">
                <h3 className="text-xl font-bold text-blue-700">Similar Jobs</h3>
              </div>
              <div className="p-6">
                <p className="text-blue-600 text-sm">
                  Similar job opportunities will appear here based on your search history and preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-blue-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-blue-700">Apply for {job.title}</h3>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="text-blue-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleApply} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Cover Letter</label>
                  <textarea
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData(prev => ({
                      ...prev,
                      coverLetter: e.target.value
                    }))}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Tell us why you're interested in this position..."
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Resume</label>
                  <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center hover:border-blue-400 transition">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        resume: e.target.files[0]
                      }))}
                      className="hidden"
                      id="resume-upload"
                      required
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <FaFileUpload className="text-2xl text-blue-400 mx-auto mb-2" />
                      <p className="text-blue-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-blue-400 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                    </label>
                  </div>
                  {applicationData.resume && (
                    <p className="text-sm text-blue-600 mt-2">
                      Selected: {applicationData.resume.name}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={applying}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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