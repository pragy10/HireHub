import express from 'express';
import {
    changePassword,
    deleteUser,
    getAllUsers,
    getAppliedJobs,
    getProfile,
    login,
    register,
    updateProfile,
    uploadResume
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);
router.get('/applied-jobs', getAppliedJobs);
router.post('/upload-resume', uploadResume);

// Admin routes (parameterized routes first, then static routes)
router.delete('/:id', admin, deleteUser);
router.get('/', admin, getAllUsers);

export default router;
