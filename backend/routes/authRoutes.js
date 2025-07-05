import express from "express";
import {
    login,
    logout,
    register
} from "../controllers/authController.js";
import {
    forgotPassword,
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
router.get("/logout", logout);

export default router;
