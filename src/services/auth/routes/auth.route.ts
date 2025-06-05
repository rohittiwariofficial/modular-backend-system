import { Router } from 'express';
import { handleSignup, handleLogin, handleLogout } from '../controllers/auth.controller';

const router = Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register new user
 */
router.post('/signup', handleSignup);

/**
 * @route   POST /api/auth/login
 * @desc    Login existing user
 */
router.post('/login', handleLogin);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout logged in user
 */
router.post('/logout', handleLogout);
export default router;