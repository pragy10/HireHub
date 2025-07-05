// Email templates for HireHub

export const emailTemplates = {
  // Email verification template
  verificationEmail: (otp, userName) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification - HireHub</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .otp-box { background: #fff; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
        .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 HireHub</h1>
          <p>Email Verification</p>
        </div>
        <div class="content">
          <h2>Hello ${userName}!</h2>
          <p>Thank you for registering with HireHub. To complete your registration, please verify your email address using the OTP below:</p>
          
          <div class="otp-box">
            <p><strong>Your Verification Code:</strong></p>
            <div class="otp-code">${otp}</div>
            <p><small>This code will expire in 10 minutes</small></p>
          </div>
          
          <p>If you didn't create an account with HireHub, please ignore this email.</p>
          
          <p>Best regards,<br>The HireHub Team</p>
        </div>
        <div class="footer">
          <p>© 2024 HireHub. All rights reserved.</p>
          <p>This is an automated email, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Password reset template
  passwordResetEmail: (otp, userName) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset - HireHub</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .otp-box { background: #fff; border: 2px dashed #ff6b6b; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
        .otp-code { font-size: 32px; font-weight: bold; color: #ff6b6b; letter-spacing: 5px; }
        .button { display: inline-block; background: #ff6b6b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 HireHub</h1>
          <p>Password Reset Request</p>
        </div>
        <div class="content">
          <h2>Hello ${userName}!</h2>
          <p>We received a request to reset your password. Use the OTP below to verify your identity and set a new password:</p>
          
          <div class="otp-box">
            <p><strong>Your Reset Code:</strong></p>
            <div class="otp-code">${otp}</div>
            <p><small>This code will expire in 10 minutes</small></p>
          </div>
          
          <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
          
          <p>Best regards,<br>The HireHub Team</p>
        </div>
        <div class="footer">
          <p>© 2024 HireHub. All rights reserved.</p>
          <p>This is an automated email, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Job application notification
  jobApplicationEmail: (jobTitle, companyName, applicantName) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Job Application Received - HireHub</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .job-details { background: #fff; border: 1px solid #ddd; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 HireHub</h1>
          <p>Application Received</p>
        </div>
        <div class="content">
          <h2>Hello ${applicantName}!</h2>
          <p>Thank you for your interest in the position. We have received your application and will review it shortly.</p>
          
          <div class="job-details">
            <h3>Application Details:</h3>
            <p><strong>Position:</strong> ${jobTitle}</p>
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Status:</strong> Under Review</p>
          </div>
          
          <p>We will contact you within 5-7 business days with an update on your application status.</p>
          
          <p>Best regards,<br>The HireHub Team</p>
        </div>
        <div class="footer">
          <p>© 2024 HireHub. All rights reserved.</p>
          <p>This is an automated email, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Welcome email
  welcomeEmail: (userName, userRole) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to HireHub</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .welcome-box { background: #fff; border: 1px solid #ddd; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to HireHub!</h1>
          <p>Your account has been successfully verified</p>
        </div>
        <div class="content">
          <h2>Hello ${userName}!</h2>
          <p>Welcome to HireHub! Your email has been successfully verified and your account is now active.</p>
          
          <div class="welcome-box">
            <h3>What's Next?</h3>
            ${userRole === 'jobseeker' ? `
              <ul>
                <li>Complete your profile with skills and experience</li>
                <li>Browse and apply to job opportunities</li>
                <li>Track your application status</li>
                <li>Connect with employers</li>
              </ul>
            ` : `
              <ul>
                <li>Complete your company profile</li>
                <li>Post job openings</li>
                <li>Review applications</li>
                <li>Connect with talented candidates</li>
              </ul>
            `}
          </div>
          
          <p>Ready to get started? Log in to your account and explore all the features HireHub has to offer!</p>
          
          <p>Best regards,<br>The HireHub Team</p>
        </div>
        <div class="footer">
          <p>© 2024 HireHub. All rights reserved.</p>
          <p>This is an automated email, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Daily job updates email
  dailyJobUpdates: (userName, jobs) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Daily Job Updates - HireHub</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .job-card { background: #fff; border: 1px solid #ddd; padding: 20px; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .job-title { color: #667eea; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .company-name { color: #666; font-weight: bold; }
        .job-details { margin: 10px 0; }
        .job-details span { background: #f0f0f0; padding: 4px 8px; border-radius: 4px; margin-right: 8px; font-size: 12px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .stats { background: #fff; border: 1px solid #ddd; padding: 15px; margin: 20px 0; border-radius: 8px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Daily Job Updates</h1>
          <p>New opportunities waiting for you!</p>
        </div>
        <div class="content">
          <h2>Hello ${userName}!</h2>
          <p>Here are the latest job opportunities that match your profile. Don't miss out on these great positions!</p>
          
          <div class="stats">
            <h3>📊 Today's Summary</h3>
            <p><strong>${jobs.length}</strong> new jobs posted today</p>
            <p>Based on your skills and preferences</p>
          </div>
          
          ${jobs.map(job => `
            <div class="job-card">
              <div class="job-title">${job.title}</div>
              <div class="company-name">${job.company}</div>
              <div class="job-details">
                <span>📍 ${job.location}</span>
                <span>💰 ${job.salary}</span>
                <span>⏰ ${job.jobType}</span>
                <span>📅 ${job.experienceLevel}</span>
              </div>
              <p style="margin: 10px 0; color: #666;">${job.description.substring(0, 150)}...</p>
              <a href="http://localhost:5174/jobs/${job._id}" class="button">View Job</a>
            </div>
          `).join('')}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:5174/jobs" class="button">View All Jobs</a>
          </div>
          
          <p><strong>💡 Pro Tip:</strong> Keep your profile updated to receive more relevant job recommendations!</p>
          
          <p>Best regards,<br>The HireHub Team</p>
        </div>
        <div class="footer">
          <p>© 2024 HireHub. All rights reserved.</p>
          <p>You can unsubscribe from these emails in your profile settings.</p>
        </div>
      </div>
    </body>
    </html>
  `
}; 