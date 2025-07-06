import bcrypt from "bcryptjs";
import cloudinary from 'cloudinary';
import fs from 'fs';
import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/User.js";
import { generateOTP, sendPasswordResetEmail, sendVerificationEmail, sendWelcomeEmail } from "../utils/emailService.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, config.JWT_SECRET, { expiresIn: "1d" });
};

// Register user with email verification
export const register = async (req, res) => {
  try {
  const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP for email verification
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "jobseeker",
      emailVerificationOTP: otp,
      emailVerificationExpires: otpExpires
    });

    await user.save();

    // Send verification email
    const emailResult = await sendVerificationEmail(email, name, otp);
    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error);
    }

    // Generate JWT token (temporary until email verification)
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      config.JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please check your email for verification.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message
    });
  }
};

// Verify email with OTP
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified"
      });
    }

    if (user.emailVerificationOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    if (new Date() > user.emailVerificationExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired"
      });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationOTP = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(email, user.name, user.role);

    res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying email",
      error: error.message
    });
  }
};

// Resend verification email
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified"
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.emailVerificationOTP = otp;
    user.emailVerificationExpires = otpExpires;
    await user.save();

    // Send verification email
    const emailResult = await sendVerificationEmail(email, user.name, otp);
    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error);
      
      // In development, log the OTP for testing
      if (process.env.NODE_ENV === 'development') {
        console.log('🔑 Development OTP for resend:', otp);
        console.log('📧 Email verification skipped in development mode');
      }
      
      return res.status(500).json({
        success: false,
        message: "Failed to send verification email"
      });
    }

    res.status(200).json({
      success: true,
      message: "Verification email sent successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending verification email",
      error: error.message
    });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Generate OTP for password reset
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.passwordResetOTP = otp;
    user.passwordResetExpires = otpExpires;
    await user.save();

    // Send password reset email
    const emailResult = await sendPasswordResetEmail(email, user.name, otp);
    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to send password reset email"
      });
    }

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending password reset email",
      error: error.message
    });
  }
};

// Reset password with OTP
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.passwordResetOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    if (new Date() > user.passwordResetExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired"
      });
    }

    // Hash new password
  const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.passwordResetOTP = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error resetting password",
      error: error.message
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
  const { email, password } = req.body;

    // Check if user exists
  const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email before logging in",
        requiresVerification: true
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      config.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message
    });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("appliedJobs.job", "title company location");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    
    // Don't allow password update through this route
    delete updates.password;
    delete updates.email; // Email should be updated separately for security

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message
    });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error changing password",
      error: error.message
    });
  }
};

// Get user's applied jobs
export const getAppliedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "appliedJobs.job",
        select: "title company location salary jobType experienceLevel createdAt"
      });

    res.status(200).json({
      success: true,
      appliedJobs: user.appliedJobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching applied jobs",
      error: error.message
    });
  }
};

// Upload resume
export const uploadResume = async (req, res) => {
  try {
    if (!req.files || !req.files.resume) {
      return res.status(400).json({
        success: false,
        message: "No resume file uploaded"
      });
    }

    const resumeFile = req.files.resume;
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resumeFile.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only PDF, DOC, and DOCX files are allowed."
      });
    }
    // Validate file size (5MB)
    if (resumeFile.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size too large. Maximum size is 5MB."
      });
    }
    // Save file temporarily
    const tempPath = `./uploads/${Date.now()}_${resumeFile.name}`;
    await resumeFile.mv(tempPath);
    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload(tempPath, {
      folder: 'hirehub-resumes',
      resource_type: 'raw',
      use_filename: true,
      unique_filename: false
    });
    // Remove temp file
    fs.unlinkSync(tempPath);
    // Store file information in database
    const resumeData = {
      filename: resumeFile.name,
      size: resumeFile.size,
      mimetype: resumeFile.mimetype,
      url: result.secure_url,
      cloudinary_id: result.public_id,
      uploadedAt: new Date()
    };
    await User.findByIdAndUpdate(req.user.id, {
      resume: resumeData
    });
    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: resumeData
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading resume",
      error: error.message
    });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only."
      });
    }

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only."
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message
    });
  }
};
