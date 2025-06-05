import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../types/express';

export const authorizeRole = (role: 'user' | 'admin') => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const userRole = (req.user as any)?.role;

    if (!userRole || userRole !== role) {
      res.status(403).json({ message: 'Forbidden: insufficient permissions' });
      return;
    }

    next();
  };
};