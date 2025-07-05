import { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaKey, FaSpinner } from "react-icons/fa";
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
      const response = await api.post("/auth/verify-email", {
        email,
        otp: otp.trim()
      });

      if (response.data.success) {
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
      const response = await api.post("/auth/resend-verification", { email });
      
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <FaEnvelope className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification code to <strong>{email}</strong>
          </p>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleVerifyEmail} className="space-y-6">
              <div className="form-group">
                <label htmlFor="otp" className="form-label">
                  Enter Verification Code
                </label>
                <div className="relative">
                  <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-input pl-10 text-center text-lg tracking-widest"
                    placeholder="000000"
                    maxLength="6"
                    pattern="[0-9]{6}"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !otp.trim()}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResendOTP}
                  disabled={resendLoading}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  {resendLoading ? (
                    <>
                      <FaSpinner className="animate-spin inline mr-1" />
                      Sending...
                    </>
                  ) : (
                    "Resend Code"
                  )}
                </button>
              </p>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                📧 Check your email
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Look for an email from HireHub</li>
                <li>• Check your spam folder if you don't see it</li>
                <li>• The code expires in 10 minutes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 