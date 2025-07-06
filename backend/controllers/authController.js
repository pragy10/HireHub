import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/User.js";
import { generateOTP, sendVerificationEmail } from "../utils/emailService.js";

const generateToken = (id, role) =>
  jwt.sign({ id, role }, config.JWT_SECRET, { expiresIn: "1d" });

export const register = async (req, res) => {
  try {
  const { name, email, password, role } = req.body;
    
    // Check if user already exists
  const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ 
        success: false,
        message: "Email already registered" 
      });
    }

    // Hash password
  const hashed = await bcrypt.hash(password, 10);

    // Generate OTP for email verification
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = new User({
      name,
      email,
      password: hashed,
      role: role || "jobseeker",
      emailVerificationOTP: otp,
      emailVerificationExpires: otpExpires
    });

    await user.save();

    // Send verification email
    const emailResult = await sendVerificationEmail(email, name, otp);
    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error);
      // Don't fail registration if email sending fails
      // User can request resend later
      
      // In development, log the OTP for testing
      if (process.env.NODE_ENV === 'development') {
        console.log('🔑 Development OTP for testing:', otp);
        console.log('📧 Email verification skipped in development mode');
      }
    }

    // Generate JWT token (temporary until email verification)
    const token = generateToken(user._id, user.role);

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

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: "Invalid credentials" });

  res.json({
    token: generateToken(user._id, user.role),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

export const logout = async (req, res) => {
  // Frontend handles logout by clearing token
  res.json({ msg: "Logged out" });
};
