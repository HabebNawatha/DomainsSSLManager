import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {JwtPayload} from '../models/user'
import User from '../models/user';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: 'No token provided, redirecting to login' });
        // return res.redirect('/login'); // Redirect to login page if no token is provided
    }

    jwt.verify(token, process.env.JWT_SECRET as Secret, (err, user) => {
        if (err) {
           return  res.status(401).json({ message: 'No token provided, redirecting to login' });
            // return res.redirect('/login'); // Redirect to login page if no token is provided
        }
        req.user = user as JwtPayload; // Attach the user payload to the request object
        next(); // Pass the request to the next middleware
    });
} 
