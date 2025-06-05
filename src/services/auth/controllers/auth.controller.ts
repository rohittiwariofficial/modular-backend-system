import { Request, Response } from 'express';
import redisClient from '../../../config/db.redis';
// import { AuthRequest } from '../../../types/express';
import { signupUser, loginUser } from '../auth.service';

export const handleSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await signupUser(name, email, password);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(400).json({ message: 'Token not found in request' });
      return;
    }

    await redisClient.set(`bl_${token}`, token, 'EX', 60 * 60 * 24); // Blacklist for 24h

    res.status(200).json({ message: 'Logout successful' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};