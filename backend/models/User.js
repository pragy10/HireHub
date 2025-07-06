import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["employer", "jobseeker", "admin"],
    default: "jobseeker"
  },
  
  // Email verification fields
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationOTP: String,
  emailVerificationExpires: Date,
  passwordResetOTP: String,
  passwordResetExpires: Date,
  
  // Profile information
  avatar: String,
  phone: String,
  location: String,
  bio: String,
  
  // For job seekers
  resume: {
    filename: String,
    originalName: String,
    size: Number,
    mimetype: String,
    url: String,
    uploadedAt: Date
  },
  skills: [String],
  experience: [{
    title: String,
    company: String,
    startDate: Date,
    endDate: Date,
    current: { type: Boolean, default: false },
    description: String
  }],
  education: [{
    degree: String,
    institution: String,
    field: String,
    startDate: Date,
    endDate: Date,
    current: { type: Boolean, default: false }
  }],
  appliedJobs: [{
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    appliedAt: { type: Date, default: Date.now },
    status: { 
      type: String, 
      enum: ["pending", "reviewed", "shortlisted", "rejected", "hired"],
      default: "pending"
    }
  }],
  
  // For employers
  company: {
    name: String,
    description: String,
    website: String,
    logo: String,
    size: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "500+"]
    },
    industry: String,
    founded: Number
  },
  
  // Common fields
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  preferences: {
    jobAlerts: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true }
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
