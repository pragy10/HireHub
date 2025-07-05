import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaEdit,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhone,
    FaPlus,
    FaSave,
    FaTimes,
    FaTrash,
    FaUser
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, updateProfile, api } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
    skills: user?.skills || [],
    experience: user?.experience || [],
    education: user?.education || [],
    company: user?.company || {
      name: "",
      description: "",
      website: "",
      size: "",
      industry: "",
      founded: ""
    }
  });

  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    current: false,
    description: ""
  });
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      const userData = response.data.user;
      setProfileData({
        name: userData.name || "",
        phone: userData.phone || "",
        location: userData.location || "",
        bio: userData.bio || "",
        skills: userData.skills || [],
        experience: userData.experience || [],
        education: userData.education || [],
        company: userData.company || {
          name: "",
          description: "",
          website: "",
          size: "",
          industry: "",
          founded: ""
        }
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(profileData);
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      setProfileData(prev => ({
        ...prev,
        experience: [...prev.experience, { ...newExperience }]
      }));
      setNewExperience({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        current: false,
        description: ""
      });
    }
  };

  const removeExperience = (index) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setProfileData(prev => ({
        ...prev,
        education: [...prev.education, { ...newEducation }]
      }));
      setNewEducation({
        degree: "",
        institution: "",
        field: "",
        startDate: "",
        endDate: "",
        current: false
      });
    }
  };

  const removeEducation = (index) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];

  return (
    <div className="fade-in">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your personal and professional information</p>
          </div>
          <div className="flex gap-3">
            {editing ? (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className="btn btn-secondary"
                >
                  <FaTimes className="mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  <FaSave className="mr-2" />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="btn btn-primary"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold">Basic Information</h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="form-input"
                    disabled={!editing}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={user?.email}
                    className="form-input"
                    disabled
                  />
                  <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="form-input"
                    disabled={!editing}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    className="form-input"
                    disabled={!editing}
                  />
                </div>
              </div>

              <div className="form-group mt-6">
                <label className="form-label">Bio</label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  className="form-input form-textarea"
                  rows={4}
                  disabled={!editing}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold">Skills</h2>
            </div>
            <div className="card-body">
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.skills.map((skill, index) => (
                  <span key={index} className="badge badge-success">
                    {skill}
                    {editing && (
                      <button
                        onClick={() => removeSkill(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <FaTimes size={12} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              
              {editing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="form-input flex-1"
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <button
                    onClick={addSkill}
                    className="btn btn-outline btn-sm"
                  >
                    <FaPlus />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Experience */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold">Experience</h2>
            </div>
            <div className="card-body">
              {profileData.experience.map((exp, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                      {exp.description && (
                        <p className="text-gray-700 mt-2">{exp.description}</p>
                      )}
                    </div>
                    {editing && (
                      <button
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {editing && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Add Experience</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={newExperience.title}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, title: e.target.value }))}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                      className="form-input"
                    />
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={newExperience.startDate}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
                      className="form-input"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={newExperience.endDate}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
                      className="form-input"
                      disabled={newExperience.current}
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      checked={newExperience.current}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, current: e.target.checked }))}
                      className="rounded"
                    />
                    <label className="text-sm">Currently working here</label>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={newExperience.description}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                    className="form-input form-textarea mt-2"
                    rows={3}
                  />
                  <button
                    onClick={addExperience}
                    className="btn btn-outline btn-sm mt-2"
                  >
                    <FaPlus className="mr-1" />
                    Add Experience
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold">Education</h2>
            </div>
            <div className="card-body">
              {profileData.education.map((edu, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-gray-500">{edu.field}</p>
                      <p className="text-sm text-gray-500">
                        {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                      </p>
                    </div>
                    {editing && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {editing && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Add Education</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={newEducation.field}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, field: e.target.value }))}
                      className="form-input"
                    />
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={newEducation.startDate}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, startDate: e.target.value }))}
                      className="form-input"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={newEducation.endDate}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, endDate: e.target.value }))}
                      className="form-input"
                      disabled={newEducation.current}
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      checked={newEducation.current}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, current: e.target.checked }))}
                      className="rounded"
                    />
                    <label className="text-sm">Currently studying</label>
                  </div>
                  <button
                    onClick={addEducation}
                    className="btn btn-outline btn-sm mt-2"
                  >
                    <FaPlus className="mr-1" />
                    Add Education
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Company Information (for employers) */}
          {user?.role === "employer" && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold">Company Information</h2>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      name="company.name"
                      value={profileData.company.name}
                      onChange={handleChange}
                      className="form-input"
                      disabled={!editing}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Company Size</label>
                    <select
                      name="company.size"
                      value={profileData.company.size}
                      onChange={handleChange}
                      className="form-input form-select"
                      disabled={!editing}
                    >
                      <option value="">Select size</option>
                      {companySizes.map(size => (
                        <option key={size} value={size}>{size} employees</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Industry</label>
                    <input
                      type="text"
                      name="company.industry"
                      value={profileData.company.industry}
                      onChange={handleChange}
                      className="form-input"
                      disabled={!editing}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Founded Year</label>
                    <input
                      type="number"
                      name="company.founded"
                      value={profileData.company.founded}
                      onChange={handleChange}
                      className="form-input"
                      disabled={!editing}
                    />
                  </div>

                  <div className="form-group md:col-span-2">
                    <label className="form-label">Website</label>
                    <input
                      type="url"
                      name="company.website"
                      value={profileData.company.website}
                      onChange={handleChange}
                      className="form-input"
                      disabled={!editing}
                    />
                  </div>

                  <div className="form-group md:col-span-2">
                    <label className="form-label">Company Description</label>
                    <textarea
                      name="company.description"
                      value={profileData.company.description}
                      onChange={handleChange}
                      className="form-input form-textarea"
                      rows={4}
                      disabled={!editing}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Profile Summary */}
          <div className="card mb-6">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Profile Summary</h3>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaUser className="text-3xl text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">{profileData.name}</h4>
                <p className="text-gray-600 capitalize">{user?.role}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <FaEnvelope className="text-gray-400" />
                  <span className="text-gray-600">{user?.email}</span>
                </div>
                {profileData.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <FaPhone className="text-gray-400" />
                    <span className="text-gray-600">{profileData.phone}</span>
                  </div>
                )}
                {profileData.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span className="text-gray-600">{profileData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Quick Stats</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Skills</span>
                  <span className="font-semibold">{profileData.skills.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold">{profileData.experience.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Education</span>
                  <span className="font-semibold">{profileData.education.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 