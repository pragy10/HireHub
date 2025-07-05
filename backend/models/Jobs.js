import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [String],
  responsibilities: [String],
  salary: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: "USD" },
    period: { type: String, enum: ["hourly", "monthly", "yearly"], default: "yearly" }
  },
  location: { type: String, required: true },
  jobType: { 
    type: String, 
    enum: ["full-time", "part-time", "contract", "internship", "freelance"],
    default: "full-time"
  },
  experienceLevel: {
    type: String,
    enum: ["entry", "mid", "senior", "executive"],
    default: "entry"
  },
  skills: [String],
  benefits: [String],
  applicationDeadline: Date,
  isActive: { type: Boolean, default: true },
  applications: [{
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    appliedAt: { type: Date, default: Date.now },
    status: { 
      type: String, 
      enum: ["pending", "reviewed", "shortlisted", "rejected", "hired"],
      default: "pending"
    },
    coverLetter: String,
    resume: String
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  views: { type: Number, default: 0 },
  applicationsCount: { type: Number, default: 0 }
}, { timestamps: true });

// Index for search functionality
jobSchema.index({ title: 'text', company: 'text', description: 'text', location: 'text' });

export default mongoose.model("Job", jobSchema);
