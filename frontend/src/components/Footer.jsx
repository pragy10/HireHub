import { 
  FaBriefcase, 
  FaEnvelope, 
  FaFacebook, 
  FaLinkedin, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaTwitter,
  FaRocket,
  FaUsers,
  FaBuilding,
  FaGlobe,
  FaHeart,
  FaArrowUp,
  FaInstagram,
  FaYoutube,
  FaShieldAlt,
  FaStar
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Enhanced Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaBriefcase className="text-white text-xl" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                HireHub
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md text-lg leading-relaxed">
              Connecting talented professionals with amazing opportunities worldwide. 
              Find your dream job or hire the perfect candidate with HireHub's innovative platform.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-blue-400 mb-1">10K+</div>
                <div className="text-xs text-gray-400">Active Jobs</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-emerald-400 mb-1">5K+</div>
                <div className="text-xs text-gray-400">Companies</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-purple-400 mb-1">50K+</div>
                <div className="text-xs text-gray-400">Users</div>
              </div>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="group w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
              >
                <FaLinkedin className="text-white group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="group w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
              >
                <FaTwitter className="text-white group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="group w-12 h-12 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
              >
                <FaFacebook className="text-white group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="group w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
              >
                <FaInstagram className="text-white group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="group w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
              >
                <FaYoutube className="text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                <FaRocket className="text-white text-sm" />
              </div>
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
            </div>
            <ul className="space-y-4">
              <li>
                <a 
                  href="/jobs" 
                  className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/5"
                >
                  <FaBriefcase className="text-blue-400 group-hover:scale-110 transition-transform" />
                  Find Jobs
                </a>
              </li>
              <li>
                <a 
                  href="/post-job" 
                  className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/5"
                >
                  <FaUsers className="text-emerald-400 group-hover:scale-110 transition-transform" />
                  Post a Job
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/5"
                >
                  <FaBuilding className="text-purple-400 group-hover:scale-110 transition-transform" />
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/5"
                >
                  <FaEnvelope className="text-orange-400 group-hover:scale-110 transition-transform" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Enhanced Contact Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <FaEnvelope className="text-white text-sm" />
              </div>
              <h3 className="text-xl font-bold text-white">Contact Us</h3>
            </div>
            <div className="space-y-4">
              <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs font-medium">Email</div>
                  <a href="mailto:hirehub.off@gmail.com" className="text-white font-medium hover:text-blue-400 transition-colors">
                    hirehub.off@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs font-medium">Phone</div>
                  <a href="tel:+15551234567" className="text-white font-medium hover:text-emerald-400 transition-colors">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
              
              <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs font-medium">Location</div>
                  <span className="text-white font-medium">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get the latest job opportunities and career insights delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <p className="text-gray-400 flex items-center gap-2">
                © 2025 HireHub. Made with <FaHeart className="text-red-400" /> for career success.
              </p>
              <div className="flex items-center gap-2 text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span className="text-gray-300 text-sm ml-2">4.9/5 User Rating</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              <a 
                href="/privacy" 
                className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2"
              >
                <FaShieldAlt className="text-blue-400" />
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="/cookies" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
              
              {/* Scroll to Top Button */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
              >
                <FaArrowUp className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
