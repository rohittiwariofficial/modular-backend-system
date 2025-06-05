import { Router, Response } from 'express';
import { protect } from '../../../shared/middleware/auth.middleware';
import { authorizeRole } from '../../../shared/middleware/role.middleware';
import { AuthRequest } from '../../../types/express';

const router = Router();

/**
 * GET /api/admin/overview
 * Only accessible to admin users
 */
router.get('/overview', protect, authorizeRole('admin'), (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Welcome, Admin!',
    user: req.user,
  });
});

export default router;