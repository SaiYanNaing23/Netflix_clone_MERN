import jwt from 'jsonwebtoken';
import { Env_Vars } from '../config/envVars.js';
import { User } from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["token"]
        console.log("token", token)
        if(!token){
            return res.status(401).json({ message: 'Unauthorized - No Token Provided', success: false });
        }

        const decoded = jwt.verify(token, Env_Vars.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({ message: 'Unauthorized - Invalid Token', success: false });
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({ message: 'Unauthorized - User not found', success: false });
        }

        req.user = user;

        next();

    } catch (error) {   
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}