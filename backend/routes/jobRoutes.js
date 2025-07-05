import express from "express";
import {
    applyForJob,
    createJob,
    deleteJob,
    getAllJobs,
    getEmployerJobs,
    getJobById,
    updateApplicationStatus,
    updateJob
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllJobs);

// Protected routes
router.use(protect);

router.post("/", createJob);
router.get("/employer/jobs", getEmployerJobs);
router.put("/application/status", updateApplicationStatus);

// Parameterized routes must come after static routes
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);
router.post("/:id/apply", applyForJob);

export default router;
