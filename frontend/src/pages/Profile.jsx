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
    FaUser,
    FaBriefcase,
    FaGraduationCap,
    FaBuilding,
    FaGlobe,
    FaCalendar,
    FaCheckCircle,
    FaStar,
    FaAward,
    FaRocket,
    FaLightbulb,
    FaChartLine,
    FaUserTie
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
                  <FaUserTie className="text-2xl text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    My Profile
                  </h1>
                  <p className="text-blue-100 text-lg">
                    Manage your personal and professional information
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium capitalize">
                  {user?.role} Account
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <FaCheckCircle className="text-green-300" />
                  Verified Profile
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              {editing ? (
                <>
                  <button
                    onClick={() => setEditing(false)}
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 backdrop-blur-sm"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                  >
                    <FaSave />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Basic Information */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <FaUser className="text-white text-lg" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-100"
                        disabled={!editing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={user?.email}
                        className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl bg-gray-100 text-gray-500"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Phone</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-100"
                        disabled={!editing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Location</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-100"
                        disabled={!editing}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-100 resize-none"
                    rows={4}
                    disabled={!editing}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Skills */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-8 py-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600 rounded-lg">
                    <FaRocket className="text-white text-lg" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-3 mb-6">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200">
                      {skill}
                      {editing && (
                        <button
                          onClick={() => removeSkill(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <FaTimes size={12} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                
                {editing && (
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Add a skill"
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    />
                    <button
                      onClick={addSkill}
                      className="px-6 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl font-medium transition-all duration-200"
                    >
                      <FaPlus />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Experience */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <FaBriefcase className="text-white text-lg" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {profileData.experience.map((exp, index) => (
                    <div key={index} className="relative bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <FaBriefcase className="text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.title}</h3>
                              <p className="text-lg font-semibold text-gray-700 mb-2">{exp.company}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                <FaCalendar className="text-gray-500" />
                                <span>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                              </div>
                              {exp.description && (
                                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        {editing && (
                          <button
                            onClick={() => removeExperience(index)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {editing && (
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Add Experience</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={newExperience.title}
                          onChange={(e) => setNewExperience(prev => ({ ...prev, title: e.target.value }))}
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={newExperience.company}
                          onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                        />
                        <input
                          type="date"
                          placeholder="Start Date"
                          value={newExperience.startDate}
                          onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                        />
                        <input
                          type="date"
                          placeholder="End Date"
                          value={newExperience.endDate}
                          onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-200"
                          disabled={newExperience.current}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={newExperience.current}
                          onChange={(e) => setNewExperience(prev => ({ ...prev, current: e.target.checked }))}
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label className="text-sm font-medium text-gray-700">Currently working here</label>
                      </div>
                      <textarea
                        placeholder="Description"
                        value={newExperience.description}
                        onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                        rows={3}
                      />
                      <button
                        onClick={addExperience}
                        className="inline-flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 px-6 py-3 rounded-xl font-medium transition-all duration-200"
                      >
                        <FaPlus />
                        Add Experience
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Education */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-8 py-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-600 rounded-lg">
                    <FaGraduationCap className="text-white text-lg" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {profileData.education.map((edu, index) => (
                    <div key={index} className="relative bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl p-6 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <FaGraduationCap className="text-orange-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h3>
                              <p className="text-lg font-semibold text-gray-700 mb-1">{edu.institution}</p>
                              <p className="text-gray-600 mb-2">{edu.field}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaCalendar className="text-gray-500" />
                                <span>{edu.startDate} - {edu.current ? "Present" : edu.endDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {editing && (
                          <button
                            onClick={() => removeEducation(index)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {editing && (
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Add Education</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Degree"
                          value={newEducation.degree}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Institution"
                          value={newEducation.institution}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Field of Study"
                          value={newEducation.field}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, field: e.target.value }))}
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                        />
                        <input
                          type="date"
                          placeholder="Start Date"
                          value={newEducation.startDate}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, startDate: e.target.value }))}
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                        />
                        <input
                          type="date"
                          placeholder="End Date"
                          value={newEducation.endDate}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, endDate: e.target.value }))}
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-200"
                          disabled={newEducation.current}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={newEducation.current}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, current: e.target.checked }))}
                          className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label className="text-sm font-medium text-gray-700">Currently studying</label>
                      </div>
                      <button
                        onClick={addEducation}
                        className="inline-flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-700 px-6 py-3 rounded-xl font-medium transition-all duration-200"
                      >
                        <FaPlus />
                        Add Education
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Company Information (for employers) */}
            {user?.role === "employer" && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-600 rounded-lg">
                      <FaBuilding className="text-white text-lg" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Company Name</label>
                      <div className="relative">
                        <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="company.name"
                          value={profileData.company.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-100"
                          disabled={!editing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Company Size</label>
                      <select
                        name="company.size"
                        value={profileData.company.size}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-100 appearance-none"
                        disabled={!editing}
                      >
                        <option value="">Select size</option>
                        {companySizes.map(size => (
                          <option key={size} value={size}>{size} employees</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Industry</label>
                      <input
                        type="text"
                        name="company.industry"
                        value={profileData.company.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-100"
                        disabled={!editing}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Founded Year</label>
                      <input
                        type="number"
                        name="company.founded"
                        value={profileData.company.founded}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-100"
                        disabled={!editing}
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Website</label>
                      <div className="relative">
                        <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="url"
                          name="company.website"
                          value={profileData.company.website}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-100"
                          disabled={!editing}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Company Description</label>
                      <textarea
                        name="company.description"
                        value={profileData.company.description}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50 focus:bg-white disabled:bg-gray-100 resize-none"
                        rows={4}
                        disabled={!editing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Enhanced Profile Summary */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Profile Summary</h3>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <FaUser className="text-3xl text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                      <FaCheckCircle className="text-white text-sm" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{profileData.name}</h4>
                  <p className="text-gray-600 capitalize font-medium">{user?.role}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-blue-600 text-sm" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{user?.email}</span>
                  </div>
                  {profileData.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <FaPhone className="text-emerald-600 text-sm" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{profileData.phone}</span>
                    </div>
                  )}
                  {profileData.location && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FaMapMarkerAlt className="text-purple-600 text-sm" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{profileData.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600 rounded-lg">
                    <FaChartLine className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Quick Stats</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <FaRocket className="text-white text-sm" />
                      </div>
                      <span className="text-gray-700 font-medium">Skills</span>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600">{profileData.skills.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <FaBriefcase className="text-white text-sm" />
                      </div>
                      <span className="text-gray-700 font-medium">Experience</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">{profileData.experience.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                        <FaGraduationCap className="text-white text-sm" />
                      </div>
                      <span className="text-gray-700 font-medium">Education</span>
                    </div>
                    <span className="text-2xl font-bold text-orange-600">{profileData.education.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Tips */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FaLightbulb className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Profile Tips</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Complete Your Profile</h4>
                    <p className="text-blue-800 text-sm">A complete profile increases your visibility by 40%.</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-2">Add Skills</h4>
                    <p className="text-emerald-800 text-sm">Showcase your expertise to attract better opportunities.</p>
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

export default Profile;
