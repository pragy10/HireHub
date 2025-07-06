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
    FaTimes,
    FaEye,
    FaUsers,
    FaClock,
    FaMoneyBillWave,
    FaStar,
    FaBookmark,
    FaShare,
    FaChartLine,
    FaShieldAlt,
    FaHeart,
    FaCheckCircle,
    FaFileAlt,
    FaUpload
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-indigo-400 animate-pulse mx-auto"></div>
          </div>
          <p className="mt-8 text-xl text-gray-700 font-semibold">Loading job details...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we fetch the information</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-r from-red-200 to-red-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaBriefcase className="text-4xl text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/jobs" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaArrowLeft />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Back Button */}
        <div className="mb-8">
          <Link 
            to="/jobs" 
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200"
          >
            <FaArrowLeft />
            Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Job Header */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <FaBriefcase className="text-2xl text-white" />
                      </div>
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{job.title}</h1>
                        <p className="text-xl text-blue-100">{job.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-blue-100">
                      <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                        <FaMapMarkerAlt />
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                        <FaBriefcase />
                        <span className="font-medium capitalize">{job.jobType}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                        <FaCalendar />
                        <span className="font-medium">
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    {user?.role === "employer" && job.createdBy === user.id && (
                      <div className="flex gap-3">
                        <Link 
                          to={`/jobs/${job._id}/edit`} 
                          className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm"
                        >
                          <FaFileAlt />
                          Edit
                        </Link>
                        <button className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm">
                          <FaTimes />
                          Delete
                        </button>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 backdrop-blur-sm">
                        <FaBookmark className="text-white" />
                      </button>
                      <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 backdrop-blur-sm">
                        <FaShare className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Salary Section */}
                {job.salary && (
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-emerald-600 rounded-xl">
                        <FaMoneyBillWave className="text-white text-xl" />
                      </div>
                      <h3 className="text-lg font-bold text-emerald-900">Salary Range</h3>
                    </div>
                    <p className="text-3xl font-bold text-emerald-600">
                      ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
                      <span className="text-lg font-normal text-emerald-700 ml-2">
                        per {job.salary.period}
                      </span>
                    </p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                    {job.experienceLevel} Level
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium border border-purple-200">
                    {job.jobType}
                  </span>
                  {job.skills?.slice(0, 3).map((skill, index) => (
                    <span key={index} className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Application Section */}
                {user?.role === "jobseeker" && (
                  <div className="border-t border-gray-200 pt-8">
                    {hasApplied ? (
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6">
                        <div className="flex items-center gap-3 text-emerald-700 mb-3">
                          <div className="p-2 bg-emerald-600 rounded-xl">
                            <FaCheckCircle className="text-white" />
                          </div>
                          <span className="text-xl font-bold">Application Submitted</span>
                        </div>
                        <p className="text-emerald-600">
                          Your application has been submitted successfully. We'll notify you of any updates.
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowApplicationForm(true)}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      >
                        Apply for this Position
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Job Description */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <FaFileAlt className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Job Description</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">{job.description}</p>
                </div>
              </div>
            </div>

            {/* Enhanced Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-600 rounded-lg">
                      <FaShieldAlt className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Requirements</h2>
                  </div>
                </div>
                <div className="p-8">
                  <ul className="space-y-4">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="p-1 bg-emerald-100 rounded-full mt-1">
                          <FaCheck className="text-emerald-600 text-sm" />
                        </div>
                        <span className="text-gray-700 text-lg">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Enhanced Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <FaChartLine className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Responsibilities</h2>
                  </div>
                </div>
                <div className="p-8">
                  <ul className="space-y-4">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="p-1 bg-emerald-100 rounded-full mt-1">
                          <FaCheck className="text-emerald-600 text-sm" />
                        </div>
                        <span className="text-gray-700 text-lg">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Enhanced Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-600 rounded-lg">
                      <FaHeart className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Benefits & Perks</h2>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                        <div className="p-1 bg-emerald-100 rounded-full">
                          <FaCheck className="text-emerald-600 text-sm" />
                        </div>
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Enhanced Company Info */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">About the Company</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                    {job.company?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{job.company}</h4>
                    <p className="text-gray-600">
                      {job.createdBy?.company?.size || "Growing company"}
                    </p>
                  </div>
                </div>
                
                {job.createdBy?.company?.website && (
                  <a 
                    href={job.createdBy.company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
                  >
                    <FaGlobe />
                    Visit Company Website
                  </a>
                )}

                {job.createdBy?.company?.description && (
                  <p className="text-gray-600 leading-relaxed">
                    {job.createdBy.company.description}
                  </p>
                )}
              </div>
            </div>

            {/* Enhanced Job Stats */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Job Statistics</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <FaEye className="text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">Views</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{job.views || 0}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-600 rounded-lg">
                        <FaUsers className="text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">Applications</span>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600">{job.applicationsCount || 0}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-600 rounded-lg">
                        <FaClock className="text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">Posted</span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Similar Jobs */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Similar Jobs</h3>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBriefcase className="text-2xl text-orange-600" />
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Similar job opportunities will appear here based on your search history and preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Application Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <FaFileAlt className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Apply for Position</h3>
                      <p className="text-blue-100">{job.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>
              
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                <form onSubmit={handleApply} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Cover Letter *
                    </label>
                    <textarea
                      value={applicationData.coverLetter}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        coverLetter: e.target.value
                      }))}
                      className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Tell us why you're the perfect fit for this position..."
                      rows={8}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Resume *
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setApplicationData(prev => ({
                          ...prev,
                          resume: e.target.files[0]
                        }))}
                        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                        required
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <FaUpload className="text-gray-400" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                      <FaFileAlt className="text-gray-400" />
                      Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-2xl font-semibold transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={applying}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
                    >
                      {applying ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          Submitting...
                        </div>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
