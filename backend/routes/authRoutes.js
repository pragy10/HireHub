import express from "express";
import {
    forgotPassword,
    login,
    register,
    resendVerificationEmail,
    resetPassword,
    verifyEmail
} from "../controllers/userController.js";

const router = express.Router();

// 📌 POST /api/auth/register
router.post("/register", register);

// 📌 POST /api/auth/login
router.post("/login", login);

// 📌 POST /api/auth/verify-email
router.post("/verify-email", verifyEmail);

// 📌 POST /api/auth/resend-verification
router.post("/resend-verification", resendVerificationEmail);

// 📌 POST /api/auth/forgot-password
router.post("/forgot-password", forgotPassword);

// 📌 POST /api/auth/reset-password
router.post("/reset-password", resetPassword);

// 📌 GET /api/auth/logout (optional, frontend just clears token)
router.get("/logout", (req, res) => {
  // You could blacklist token or handle on client side
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
