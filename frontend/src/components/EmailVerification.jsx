import { useState } from "react";
import toast from "react-hot-toast";
import { 
  FaEnvelope, 
  FaKey, 
  FaSpinner,
  FaShieldAlt,
  FaCheckCircle,
  FaClock,
  FaRedo,
  FaExclamationTriangle,
  FaLock,
  FaEye
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const EmailVerification = ({ email, onVerificationComplete }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { api } = useAuth();

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      // Use temporary token for verification
      const tempToken = localStorage.getItem("tempToken");
      const response = await api.post("/auth/verify-email", {
        email,
        otp: otp.trim()
      }, {
        headers: {
          Authorization: `Bearer ${tempToken}`
        }
      });

      if (response.data.success) {
        // Move from temp storage to permanent storage
        const tempUser = JSON.parse(localStorage.getItem("tempUser"));
        localStorage.setItem("token", tempToken);
        localStorage.setItem("user", JSON.stringify(tempUser));
        localStorage.removeItem("tempToken");
        localStorage.removeItem("tempUser");
        
        toast.success("Email verified successfully!");
        onVerificationComplete();
      }
    } catch (error) {
      const message = error.response?.data?.message || "Verification failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      const tempToken = localStorage.getItem("tempToken");
      const response = await api.post("/auth/resend-verification", { email }, {
        headers: {
          Authorization: `Bearer ${tempToken}`
        }
      });
      
      if (response.data.success) {
        toast.success("Verification email sent successfully!");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to resend email";
      toast.error(message);
    } finally {
      setResendLoading(false);
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
              <FaEnvelope className="text-3xl text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
              <FaShieldAlt className="text-white text-xs" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3">
            Verify Your Email
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            We've sent a secure verification code to
          </p>
          <p className="text-blue-600 font-semibold text-lg bg-blue-50 px-4 py-2 rounded-xl inline-block">
            {email}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Progress Indicator */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1">
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center text-emerald-600">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-sm" />
                  </div>
                  <span className="ml-2 text-sm font-medium">Account Created</span>
                </div>
                <div className="w-8 h-1 bg-emerald-200 rounded-full"></div>
                <div className="flex items-center text-blue-600">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <span className="ml-2 text-sm font-medium">Verify Email</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleVerifyEmail} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">
                  Enter Verification Code
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
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !otp.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    Verifying your email...
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="mr-3 text-lg" />
                    Verify Email Address
                  </>
                )}
              </button>
            </form>

            {/* Resend Section */}
            <div className="mt-8 text-center">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <p className="text-gray-600 mb-4">
                  Didn't receive the code?
                </p>
                <button
                  onClick={handleResendOTP}
                  disabled={resendLoading}
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {resendLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
                      Sending new code...
                    </>
                  ) : (
                    <>
                      <FaRedo />
                      Resend Verification Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Help Section */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FaEye className="text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Check Your Email</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <FaEnvelope className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-900 font-medium">Look for an email from HireHub</p>
                  <p className="text-blue-700 text-sm">Check your inbox for our verification message</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                <FaExclamationTriangle className="text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-yellow-900 font-medium">Check your spam folder</p>
                  <p className="text-yellow-700 text-sm">Sometimes emails end up in spam or junk folders</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-200">
                <FaClock className="text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-red-900 font-medium">Code expires in 10 minutes</p>
                  <p className="text-red-700 text-sm">Request a new code if this one expires</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <FaShieldAlt className="text-emerald-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-emerald-900 mb-1">Secure Verification</h4>
              <p className="text-xs text-emerald-800">
                This verification step ensures the security of your account and protects your personal information. 
                Never share your verification code with anyone.
              </p>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <FaLock className="text-blue-600" />
            </div>
            <p className="text-xs text-gray-600 font-medium">Secure Account</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <FaCheckCircle className="text-emerald-600" />
            </div>
            <p className="text-xs text-gray-600 font-medium">Verified Profile</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <FaShieldAlt className="text-purple-600" />
            </div>
            <p className="text-xs text-gray-600 font-medium">Protected Data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
