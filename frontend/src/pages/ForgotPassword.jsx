import { useState } from "react";
import toast from "react-hot-toast";
import { 
  FaEnvelope, 
  FaEye, 
  FaEyeSlash, 
  FaKey, 
  FaSpinner, 
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaArrowLeft,
  FaUserShield
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { api } = useAuth();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/forgot-password", { email });
      
      if (response.data.success) {
        toast.success("Password reset email sent successfully!");
        setOtpSent(true);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send reset email";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!otp.trim() || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/reset-password", {
        email,
        otp: otp.trim(),
        newPassword
      });

      if (response.data.success) {
        toast.success("Password reset successfully!");
        // Reset form
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setOtpSent(false);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to reset password";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <FaShieldAlt className="text-3xl text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
              <FaLock className="text-white text-xs" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3">
            Reset Your Password
          </h2>
          <p className="text-lg text-gray-600 max-w-sm mx-auto">
            {otpSent 
              ? "Enter the verification code and create your new secure password"
              : "Don't worry, we'll help you get back into your account securely"
            }
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Progress Indicator */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1">
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-center space-x-4">
                <div className={`flex items-center ${!otpSent ? 'text-blue-600' : 'text-emerald-600'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${!otpSent ? 'bg-blue-100' : 'bg-emerald-100'}`}>
                    {!otpSent ? <FaEnvelope className="text-sm" /> : <FaCheckCircle className="text-sm" />}
                  </div>
                  <span className="ml-2 text-sm font-medium">Email</span>
                </div>
                <div className={`w-8 h-1 rounded-full ${otpSent ? 'bg-emerald-200' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center ${otpSent ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${otpSent ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <FaUserShield className="text-sm" />
                  </div>
                  <span className="ml-2 text-sm font-medium">Reset</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    We'll send a verification code to this email address
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-3 text-lg" />
                      Sending Code...
                    </>
                  ) : (
                    <>
                      <FaEnvelope className="mr-3 text-lg" />
                      Send Verification Code
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">
                    Verification Code
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaKey className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500 text-center text-xl tracking-[0.5em] font-mono"
                      placeholder="000000"
                      maxLength="6"
                      pattern="[0-9]{6}"
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mt-3">
                    <p className="text-sm text-blue-800 flex items-center">
                      <FaEnvelope className="mr-2 text-blue-600" />
                      Code sent to <span className="font-semibold ml-1">{email}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700">
                    New Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin mr-3 text-lg" />
                        Resetting Password...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="mr-3 text-lg" />
                        Reset Password
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center"
                  >
                    <FaArrowLeft className="mr-3" />
                    Back to Email Step
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-gray-600 mb-4">
              Remember your password?
            </p>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              Back to Sign In
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <FaShieldAlt className="text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Security Notice</h4>
              <p className="text-xs text-blue-800">
                For your security, the verification code will expire in 10 minutes. 
                Make sure to use a strong password with at least 8 characters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
