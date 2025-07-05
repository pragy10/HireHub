import nodemailer from 'nodemailer';
import config from '../config.js';
import { emailTemplates } from './emailTemplates.js';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS
    }
  });
};

// Generate OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification email
export const sendVerificationEmail = async (email, userName, otp) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"HireHub" <${config.EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Email - HireHub',
      html: emailTemplates.verificationEmail(otp, userName)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, userName, otp) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"HireHub" <${config.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request - HireHub',
      html: emailTemplates.passwordResetEmail(otp, userName)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};

// Send welcome email
export const sendWelcomeEmail = async (email, userName, userRole) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"HireHub" <${config.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to HireHub!',
      html: emailTemplates.welcomeEmail(userName, userRole)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

// Send job application notification
export const sendJobApplicationEmail = async (email, jobTitle, companyName, applicantName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"HireHub" <${config.EMAIL_USER}>`,
      to: email,
      subject: 'Job Application Received - HireHub',
      html: emailTemplates.jobApplicationEmail(jobTitle, companyName, applicantName)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Job application email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending job application email:', error);
    return { success: false, error: error.message };
  }
};

// Send daily job updates email
export const sendDailyJobUpdates = async (email, userName, jobs) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"HireHub" <${config.EMAIL_USER}>`,
      to: email,
      subject: 'Daily Job Updates - HireHub',
      html: emailTemplates.dailyJobUpdates(userName, jobs)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Daily job updates email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending daily job updates email:', error);
    return { success: false, error: error.message };
  }
}; 