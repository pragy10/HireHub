import cron from 'node-cron';
import Job from '../models/Jobs.js';
import User from '../models/User.js';
import { sendDailyJobUpdates } from './emailService.js';

// Schedule daily job updates email (runs at 9:00 AM every day)
export const scheduleDailyJobUpdates = () => {
  cron.schedule('0 9 * * *', async () => {
    console.log('🕘 Running daily job updates scheduler...');
    
    try {
      // Get all job seekers who have email notifications enabled
      const jobSeekers = await User.find({
        role: 'jobseeker',
        isEmailVerified: true,
        isActive: true,
        'preferences.emailNotifications': true
      });

      console.log(`📧 Found ${jobSeekers.length} job seekers to send updates to`);

      // Get jobs posted in the last 24 hours
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const recentJobs = await Job.find({
        createdAt: { $gte: yesterday },
        isActive: true
      }).limit(10); // Limit to 10 most recent jobs

      console.log(`💼 Found ${recentJobs.length} recent jobs to share`);

      if (recentJobs.length === 0) {
        console.log('📭 No recent jobs found, skipping email updates');
        return;
      }

      // Send emails to each job seeker
      let successCount = 0;
      let errorCount = 0;

      for (const user of jobSeekers) {
        try {
          // Filter jobs based on user preferences (if they have skills defined)
          let relevantJobs = recentJobs;
          
          if (user.skills && user.skills.length > 0) {
            // Filter jobs that match user skills
            relevantJobs = recentJobs.filter(job => {
              const jobSkills = job.requiredSkills || [];
              return user.skills.some(skill => 
                jobSkills.some(jobSkill => 
                  jobSkill.toLowerCase().includes(skill.toLowerCase()) ||
                  skill.toLowerCase().includes(jobSkill.toLowerCase())
                )
              );
            });
          }

          // If no relevant jobs found, send all recent jobs
          if (relevantJobs.length === 0) {
            relevantJobs = recentJobs.slice(0, 5); // Send top 5 jobs
          }

          // Send daily update email
          const result = await sendDailyJobUpdates(
            user.email,
            user.name,
            relevantJobs
          );

          if (result.success) {
            successCount++;
            console.log(`✅ Email sent to ${user.email}`);
          } else {
            errorCount++;
            console.log(`❌ Failed to send email to ${user.email}: ${result.error}`);
          }

          // Add a small delay to avoid overwhelming the email service
          await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
          errorCount++;
          console.log(`❌ Error sending email to ${user.email}: ${error.message}`);
        }
      }

      console.log(`📊 Daily job updates completed:`);
      console.log(`   ✅ Successfully sent: ${successCount}`);
      console.log(`   ❌ Failed: ${errorCount}`);

    } catch (error) {
      console.error('❌ Error in daily job updates scheduler:', error);
    }
  }, {
    scheduled: true,
    timezone: "UTC"
  });

  console.log('⏰ Daily job updates scheduler started (runs at 9:00 AM UTC)');
};

// Manual trigger for testing
export const triggerDailyJobUpdates = async () => {
  console.log('🔄 Manually triggering daily job updates...');
  
  try {
    const jobSeekers = await User.find({
      role: 'jobseeker',
      isEmailVerified: true,
      isActive: true
    }).limit(5); // Limit for testing

    const recentJobs = await Job.find({
      isActive: true
    }).limit(5);

    for (const user of jobSeekers) {
      const result = await sendDailyJobUpdates(
        user.email,
        user.name,
        recentJobs
      );
      
      if (result.success) {
        console.log(`✅ Test email sent to ${user.email}`);
      } else {
        console.log(`❌ Failed to send test email to ${user.email}`);
      }
    }

    console.log('✅ Manual daily job updates completed');
  } catch (error) {
    console.error('❌ Error in manual daily job updates:', error);
  }
}; 