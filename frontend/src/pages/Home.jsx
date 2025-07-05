import { useEffect, useState } from "react";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaRocket,
    FaSearch,
    FaShieldAlt,
    FaUsers
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, api } = useAuth();
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalCompanies: 0,
    totalUsers: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent jobs
        const jobsResponse = await api.get("/jobs?limit=6");
        setRecentJobs(jobsResponse.data.jobs || []);
        
        // For demo purposes, set some stats
        setStats({
          totalJobs: 1250,
          totalCompanies: 450,
          totalUsers: 8500
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  const features = [
    {
      icon: <FaSearch className="text-3xl text-blue-600" />,
      title: "Smart Job Search",
      description: "Find the perfect job with our advanced search and filtering options."
    },
    {
      icon: <FaBriefcase className="text-3xl text-green-600" />,
      title: "Easy Application",
      description: "Apply to multiple jobs with just a few clicks using your profile."
    },
    {
      icon: <FaUsers className="text-3xl text-purple-600" />,
      title: "Company Profiles",
      description: "Learn about companies before applying with detailed company profiles."
    },
    {
      icon: <FaRocket className="text-3xl text-orange-600" />,
      title: "Fast Hiring",
      description: "Get hired quickly with our streamlined application process."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-red-600" />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security measures."
    }
  ];

  if (loading) {
    return (
      <div className="loading">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Connect with top companies and opportunities worldwide
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link 
                to="/jobs" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Browse Jobs
              </Link>
            </div>
          )}
          
          {user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/jobs" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Find Jobs
              </Link>
              {user.role === "employer" && (
                <Link 
                  to="/post-job" 
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Post a Job
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalJobs}+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalCompanies}+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalUsers}+</div>
              <div className="text-gray-600">Job Seekers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose HireHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the tools and resources you need to succeed in your career journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Recent Job Openings
            </h2>
            <Link 
              to="/jobs" 
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Jobs →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <div key={job._id} className="card job-card">
                  <div className="card-body">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">{job.company}</p>
                    <div className="job-location">
                      <FaMapMarkerAlt />
                      <span>{job.location}</span>
                    </div>
                    {job.salary && (
                      <div className="job-salary">
                        ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
                      </div>
                    )}
                    <div className="job-tags">
                      <span className="job-tag">{job.jobType}</span>
                      <span className="job-tag">{job.experienceLevel}</span>
                    </div>
                    <div className="job-actions">
                      <Link 
                        to={`/jobs/${job._id}`} 
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">
                  No jobs available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of professionals who have found their dream jobs on HireHub
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Create Account
              </Link>
              <Link 
                to="/jobs" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Browse Jobs
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home; 