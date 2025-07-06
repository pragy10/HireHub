import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaDownload,
  FaEdit,
  FaFileAlt,
  FaFileUpload,
  FaPlus,
  FaSave,
  FaTimes,
  FaTrash
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
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [userResume, setUserResume] = useState(null);

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
      
      // Set resume data if it exists
      if (userData.resume && userData.resume.filename) {
        setUserResume(userData.resume);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    setResumeUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      
      const response = await api.post("/users/upload-resume", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setUserResume(response.data.resume);
      setResumeFile(null);
      toast.success("Resume uploaded successfully!");
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error(error.response?.data?.message || "Failed to upload resume");
    } finally {
      setResumeUploading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Profile Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-8 rounded-2xl mb-8 shadow-lg flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg text-blue-600 text-4xl font-bold">
            {user?.name?.[0] || "U"}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">{user?.name}</h1>
            <p className="text-blue-100 text-lg capitalize">{user?.role}</p>
          </div>
        </div>
        <div className="flex-1 flex justify-end gap-3">
          {editing ? (
            <>
              <button
                onClick={() => setEditing(false)}
                className="bg-blue-100 text-blue-600 px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-200 transition"
              >
                <FaTimes className="mr-2 inline" /> Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-60"
              >
                <FaSave className="mr-2 inline" /> {loading ? "Saving..." : "Save Changes"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-50 transition"
            >
              <FaEdit className="mr-2 inline" /> Edit Profile
            </button>
          )}
        </div>
      </div>
      <div className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
          <div className="p-6 border-b border-blue-100">
            <h2 className="text-xl font-bold text-blue-700">Basic Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="block text-sm font-medium text-blue-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-blue-50"
                  disabled={!editing}
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-blue-700 mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-blue-50"
                  disabled
                />
                <p className="text-sm text-blue-400 mt-1">Email cannot be changed</p>
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-blue-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-blue-50"
                  disabled={!editing}
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-blue-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-blue-50"
                  disabled={!editing}
                />
              </div>
            </div>
            <div className="form-group mt-6">
              <label className="block text-sm font-medium text-blue-700 mb-2">Bio</label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-blue-50"
                rows={4}
                disabled={!editing}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>
        {/* Resume/CV Upload */}
        {user?.role === "jobseeker" && (
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
            <div className="p-6 border-b border-blue-100">
              <h2 className="text-xl font-bold text-blue-700">Resume/CV</h2>
            </div>
            <div className="p-6">
              {userResume ? (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <FaFileAlt className="text-blue-600 text-xl" />
                    <div>
                      <p className="font-medium text-blue-900">{userResume.filename}</p>
                      <p className="text-sm text-blue-700">Uploaded on {new Date(userResume.uploadedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.open(userResume.url, '_blank')}
                      className="px-3 py-1 border border-blue-200 rounded-lg text-sm text-blue-600 hover:bg-blue-100 transition"
                    >
                      <FaDownload className="mr-1 inline" /> Download
                    </button>
                    {editing && (
                      <button
                        onClick={() => setUserResume(null)}
                        className="px-3 py-1 border border-red-200 rounded-lg text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <FaTrash className="mr-1 inline" /> Remove
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaFileAlt className="text-4xl text-blue-200 mx-auto mb-4" />
                  <p className="text-blue-400 mb-4">No resume uploaded yet</p>
                  {editing && (
                    <div className="max-w-md mx-auto">
                      <label className="block w-full p-4 border-2 border-dashed border-blue-200 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setResumeFile(e.target.files[0])}
                          className="hidden"
                        />
                        <div className="text-center">
                          <FaFileUpload className="text-2xl text-blue-400 mx-auto mb-2" />
                          <p className="text-sm text-blue-600">Click to upload or drag and drop</p>
                          <p className="text-xs text-blue-400 mt-1">PDF, DOC, DOCX (max 5MB)</p>
                        </div>
                      </label>
                      {resumeFile && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-900">Selected: {resumeFile.name}</p>
                          <button
                            onClick={handleResumeUpload}
                            disabled={resumeUploading}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                          >
                            {resumeUploading ? "Uploading..." : "Upload Resume"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {/* Skills */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
          <div className="p-6 border-b border-blue-100">
            <h2 className="text-xl font-bold text-blue-700">Skills</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {profileData.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
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
                  className="flex-1 px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <button
                  onClick={addSkill}
                  className="px-3 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <FaPlus />
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Experience */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
          <div className="p-6 border-b border-blue-100">
            <h2 className="text-xl font-bold text-blue-700">Experience</h2>
          </div>
          <div className="p-6">
            {profileData.experience.map((exp, index) => (
              <div key={index} className="border-b border-blue-100 pb-4 mb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-blue-900">{exp.title}</h3>
                    <p className="text-blue-600">{exp.company}</p>
                    <p className="text-sm text-blue-400">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
                    {exp.description && (
                      <p className="text-blue-700 mt-2">{exp.description}</p>
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
                <h3 className="font-semibold mb-3 text-blue-700">Add Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={newExperience.title}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, title: e.target.value }))}
                    className="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                    className="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={newExperience.startDate}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
                    className="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={newExperience.endDate}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
                    className="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
                  <label className="text-sm text-blue-700">Currently working here</label>
                </div>
                <textarea
                  placeholder="Description"
                  value={newExperience.description}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent mt-2"
                  rows={3}
                />
                <button
                  onClick={addExperience}
                  className="px-3 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors mt-2"
                >
                  <FaPlus className="mr-1" /> Add Experience
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Education */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
          <div className="p-6 border-b border-blue-100">
            <h2 className="text-xl font-bold text-blue-700">Education</h2>
          </div>
          <div className="p-6">
            {profileData.education.map((edu, index) => (
              <div key={index} className="border-b border-blue-100 pb-4 mb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-blue-900">{edu.degree}</h3>
                    <p className="text-blue-600">{edu.institution}</p>
                    <p className="text-blue-400">{edu.field}</p>
                    <p className="text-sm text-blue-400">{edu.startDate} - {edu.current ? "Present" : edu.endDate}</p>
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
                <h3 className="font-semibold mb-3 text-blue-700">Add Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                    className="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={newEducation.institution}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                    className="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={newEducation.field}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, field: e.target.value }))}
                    className="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={newEducation.startDate}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, startDate: e.target.value }))}
                    className="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={newEducation.endDate}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, endDate: e.target.value }))}
                    className="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
                  <label className="text-sm text-blue-700">Currently studying</label>
                </div>
                <button
                  onClick={addEducation}
                  className="px-3 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors mt-2"
                >
                  <FaPlus className="mr-1" /> Add Education
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Company Information (for employers) */}
        {user?.role === "employer" && (
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
            <div className="p-6 border-b border-blue-100">
              <h2 className="text-xl font-bold text-blue-700">Company Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="block text-sm font-medium text-blue-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company.name"
                    value={profileData.company.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-blue-50"
                    disabled={!editing}
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-blue-700 mb-2">Company Size</label>
                  <select
                    name="company.size"
                    value={profileData.company.size}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-blue-50"
                    disabled={!editing}
                  >
                    <option value="">Select size</option>
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size} employees</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-blue-700 mb-2">Industry</label>
                  <input
                    type="text"
                    name="company.industry"
                    value={profileData.company.industry}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-blue-50"
                    disabled={!editing}
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-blue-700 mb-2">Founded Year</label>
                  <input
                    type="number"
                    name="company.founded"
                    value={profileData.company.founded}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-blue-50"
                    disabled={!editing}
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label className="block text-sm font-medium text-blue-700 mb-2">Website</label>
                  <input
                    type="url"
                    name="company.website"
                    value={profileData.company.website}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-blue-50"
                    disabled={!editing}
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label className="block text-sm font-medium text-blue-700 mb-2">Company Description</label>
                  <textarea
                    name="company.description"
                    value={profileData.company.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-blue-50"
                    rows={4}
                    disabled={!editing}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 