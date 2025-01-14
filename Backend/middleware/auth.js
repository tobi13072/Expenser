import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const ACCESS_TOKEN_SECRET = 'b91c8b36f8d87e331b0c0dc0c2f4b94d37e16180d3bf76d39c391114e0bfc7c5';

const validateToken = asyncHandler(async (req,res,next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({message:'Invalid token'});
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } else {
        return res.status(401).json({message:'Token is missing'});
    }
});

export default validateToken;
