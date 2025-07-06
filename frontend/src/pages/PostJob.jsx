import { useState } from "react";
import toast from "react-hot-toast";
import {
    FaPlus,
    FaTimes,
    FaBriefcase,
    FaBuilding,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaFileAlt,
    FaCheckCircle,
    FaUsers,
    FaGift,
    FaCog,
    FaRocket,
    FaCalendar,
    FaLightbulb,
    FaArrowLeft,
    FaSave
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PostJob = () => {
  const { api } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    jobType: "full-time",
    experienceLevel: "entry",
    salary: {
      min: "",
      max: "",
      currency: "USD",
      period: "yearly"
    },
    requirements: [""],
    responsibilities: [""],
    benefits: [""],
    skills: [""],
    applicationDeadline: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean up empty array items
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim()),
        responsibilities: formData.responsibilities.filter(resp => resp.trim()),
        benefits: formData.benefits.filter(benefit => benefit.trim()),
        skills: formData.skills.filter(skill => skill.trim())
      };

      await api.post("/jobs", cleanedData);
      toast.success("Job posted successfully!");
      navigate("/employer-dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to post job";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const jobTypes = ["full-time", "part-time", "contract", "internship", "freelance"];
  const experienceLevels = ["entry", "mid", "senior", "executive"];
  const salaryPeriods = ["hourly", "monthly", "yearly"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  <FaRocket className="text-2xl text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Post a New Job
                  </h1>
                  <p className="text-blue-100 text-lg">
                    Create a compelling job posting to attract exceptional talent
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  Easy Setup
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <FaCheckCircle className="text-green-300" />
                  Premium Visibility
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <button
                onClick={() => navigate("/employer-dashboard")}
                className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 backdrop-blur-sm"
              >
                <FaArrowLeft />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Enhanced Basic Information */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FaBriefcase className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Job Title *</label>
                  <div className="relative">
                    <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="e.g., Senior Software Engineer"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Company Name *</label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Location *</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="e.g., San Francisco, CA or Remote"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Job Type *</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                    required
                  >
                    {jobTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Experience Level *</label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                    required
                  >
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)} Level
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Application Deadline</label>
                  <div className="relative">
                    <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Salary Information */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600 rounded-lg">
                  <FaMoneyBillWave className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Salary Information</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Minimum Salary</label>
                  <input
                    type="number"
                    name="salary.min"
                    value={formData.salary.min}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="50000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Maximum Salary</label>
                  <input
                    type="number"
                    name="salary.max"
                    value={formData.salary.max}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="80000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Salary Period</label>
                  <select
                    name="salary.period"
                    value={formData.salary.period}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                  >
                    {salaryPeriods.map(period => (
                      <option key={period} value={period}>
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Job Description */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <FaFileAlt className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Job Description *</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-2">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Provide a detailed description of the role, responsibilities, and what makes this position exciting..."
                  rows={8}
                  required
                />
              </div>
            </div>
          </div>

          {/* Enhanced Requirements */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-600 rounded-lg">
                  <FaCheckCircle className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Requirements</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="e.g., 3+ years of experience in React"
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("requirements", index)}
                        className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-all duration-200"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("requirements")}
                  className="inline-flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  Add Requirement
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Responsibilities */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-600 rounded-lg">
                  <FaUsers className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Responsibilities</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => handleArrayChange("responsibilities", index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="e.g., Lead development of new features"
                    />
                    {formData.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("responsibilities", index)}
                        className="p-3 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-xl transition-all duration-200"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("responsibilities")}
                  className="inline-flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  Add Responsibility
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Benefits */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-600 rounded-lg">
                  <FaGift className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Benefits & Perks</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleArrayChange("benefits", index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="e.g., Health insurance, 401k matching"
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("benefits", index)}
                        className="p-3 bg-teal-100 hover:bg-teal-200 text-teal-600 rounded-xl transition-all duration-200"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("benefits")}
                  className="inline-flex items-center gap-2 bg-teal-100 hover:bg-teal-200 text-teal-700 px-4 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  Add Benefit
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Skills */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-600 rounded-lg">
                  <FaCog className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Required Skills</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleArrayChange("skills", index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="e.g., JavaScript, React, Node.js"
                    />
                    {formData.skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("skills", index)}
                        className="p-3 bg-violet-100 hover:bg-violet-200 text-violet-600 rounded-xl transition-all duration-200"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("skills")}
                  className="inline-flex items-center gap-2 bg-violet-100 hover:bg-violet-200 text-violet-700 px-4 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  <FaPlus />
                  Add Skill
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Submit Section */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaLightbulb className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Ready to attract top talent?</h3>
                  <p className="text-gray-600">Your job posting will be visible to thousands of qualified candidates.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/employer-dashboard")}
                  className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Publishing Job...
                    </>
                  ) : (
                    <>
                      <FaRocket />
                      Publish Job Posting
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl">
                  <FaLightbulb className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Job Posting Tips</h2>
                  <p className="text-emerald-100">Best practices to attract the right candidates</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                      <FaFileAlt />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900 mb-2 text-lg">Write Clear Descriptions</h3>
                      <p className="text-blue-800">
                        Be specific about the role, responsibilities, and what makes your company unique. Clear job descriptions attract better candidates.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                      <FaMoneyBillWave />
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-900 mb-2 text-lg">Include Salary Information</h3>
                      <p className="text-emerald-800">
                        Jobs with salary information receive 30% more applications. Be transparent about compensation to attract serious candidates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
