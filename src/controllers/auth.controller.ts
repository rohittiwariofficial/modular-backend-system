import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../shared/utils/generateToken';

export const loginUser = (req: Request, res: Response): void => {
    const { email, password } = req.body;

    if ( email && password ) {
        const mockUserId = "123";
        const token = generateToken({id: mockUserId});
        res.status(200).json({ token });
    }

    res.status(400).json({
        message: 'Email and password required'
    });
}