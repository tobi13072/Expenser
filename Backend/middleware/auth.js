import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const validateToken = asyncHandler(async (req,res,next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
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
