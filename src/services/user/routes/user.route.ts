import { Router, Response } from 'express';
import { protect } from '../../../shared/middleware/auth.middleware';
import { AuthRequest } from '../../../types/express';

const router = Router();

/**
 * GET /api/user/dashboard
 */
router.get('/dashboard', protect, (req: AuthRequest, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the dashboard!',
    user: req.user,
  });
});

export default router;