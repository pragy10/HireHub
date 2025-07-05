import { useState } from "react";
import toast from "react-hot-toast";
import {
    FaPlus,
    FaTimes
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
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
        <p className="text-gray-600">Create a compelling job posting to attract top talent</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Basic Information</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Senior Software Engineer"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your company name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., San Francisco, CA or Remote"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job Type *</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="form-input form-select"
                  required
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Experience Level *</label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="form-input form-select"
                  required
                >
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Application Deadline</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Salary Information */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Salary Information</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-group">
                <label className="form-label">Minimum Salary</label>
                <input
                  type="number"
                  name="salary.min"
                  value={formData.salary.min}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="50000"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Maximum Salary</label>
                <input
                  type="number"
                  name="salary.max"
                  value={formData.salary.max}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="80000"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Salary Period</label>
                <select
                  name="salary.period"
                  value={formData.salary.period}
                  onChange={handleChange}
                  className="form-input form-select"
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

        {/* Job Description */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Job Description *</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Provide a detailed description of the role, responsibilities, and what makes this position exciting..."
                rows={8}
                required
              />
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Requirements</h2>
          </div>
          <div className="card-body">
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                  className="form-input flex-1"
                  placeholder="e.g., 3+ years of experience in React"
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("requirements", index)}
                    className="btn btn-danger btn-sm"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("requirements")}
              className="btn btn-outline btn-sm"
            >
              <FaPlus className="mr-1" />
              Add Requirement
            </button>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Responsibilities</h2>
          </div>
          <div className="card-body">
            {formData.responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => handleArrayChange("responsibilities", index, e.target.value)}
                  className="form-input flex-1"
                  placeholder="e.g., Lead development of new features"
                />
                {formData.responsibilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("responsibilities", index)}
                    className="btn btn-danger btn-sm"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("responsibilities")}
              className="btn btn-outline btn-sm"
            >
              <FaPlus className="mr-1" />
              Add Responsibility
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Benefits</h2>
          </div>
          <div className="card-body">
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange("benefits", index, e.target.value)}
                  className="form-input flex-1"
                  placeholder="e.g., Health insurance, 401k matching"
                />
                {formData.benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("benefits", index)}
                    className="btn btn-danger btn-sm"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("benefits")}
              className="btn btn-outline btn-sm"
            >
              <FaPlus className="mr-1" />
              Add Benefit
            </button>
          </div>
        </div>

        {/* Skills */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Required Skills</h2>
          </div>
          <div className="card-body">
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleArrayChange("skills", index, e.target.value)}
                  className="form-input flex-1"
                  placeholder="e.g., JavaScript, React, Node.js"
                />
                {formData.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("skills", index)}
                    className="btn btn-danger btn-sm"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("skills")}
              className="btn btn-outline btn-sm"
            >
              <FaPlus className="mr-1" />
              Add Skill
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/employer-dashboard")}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
          >
            {loading ? "Posting Job..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob; 