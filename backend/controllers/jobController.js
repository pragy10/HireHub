import Job from "../models/Jobs.js";
import User from "../models/User.js";

// Create a new job posting
export const createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      createdBy: req.user.id
    };
    
    const job = new Job(jobData);
    await job.save();
    
    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating job",
      error: error.message
    });
  }
};

// Get all jobs with filtering and pagination
export const getAllJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      location,
      jobType,
      experienceLevel,
      minSalary,
      maxSalary,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    const query = { isActive: true };
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    
    // Filter by job type
    if (jobType) {
      query.jobType = jobType;
    }
    
    // Filter by experience level
    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }
    
    // Filter by salary range
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = parseInt(minSalary);
      if (maxSalary) query.salary.$lte = parseInt(maxSalary);
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const jobs = await Job.find(query)
      .populate("createdBy", "name company.name")
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message
    });
  }
};

// Get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("createdBy", "name company.name company.description company.website")
      .populate("applications.applicant", "name email avatar");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Increment view count
    job.views += 1;
    await job.save();

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching job",
      error: error.message
    });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Check if user is the creator or admin
    if (job.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this job"
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating job",
      error: error.message
    });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Check if user is the creator or admin
    if (job.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this job"
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting job",
      error: error.message
    });
  }
};

// Apply for a job
export const applyForJob = async (req, res) => {
  try {
    const { coverLetter, resume } = req.body;
    const jobId = req.params.id;
    const userId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Check if user has already applied
    const alreadyApplied = job.applications.find(
      app => app.applicant.toString() === userId
    );

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job"
      });
    }

    // Add application
    job.applications.push({
      applicant: userId,
      coverLetter,
      resume
    });
    job.applicationsCount += 1;
    await job.save();

    // Update user's applied jobs
    await User.findByIdAndUpdate(userId, {
      $push: {
        appliedJobs: {
          job: jobId,
          status: "pending"
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Application submitted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error applying for job",
      error: error.message
    });
  }
};

// Get jobs posted by employer
export const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id })
      .populate("applications.applicant", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching employer jobs",
      error: error.message
    });
  }
};

// Update application status (for employers)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { jobId, applicationId, status } = req.body;
    
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Check if user is the job creator
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this application"
      });
    }

    const application = job.applications.id(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    application.status = status;
    await job.save();

    // Update user's applied jobs status
    await User.updateOne(
      { _id: application.applicant, "appliedJobs.job": jobId },
      { $set: { "appliedJobs.$.status": status } }
    );

    res.status(200).json({
      success: true,
      message: "Application status updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating application status",
      error: error.message
    });
  }
};
