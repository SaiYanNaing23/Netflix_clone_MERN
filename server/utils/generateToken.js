import jwt from 'jsonwebtoken';
import { Env_Vars } from "../config/envVars.js"

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, Env_Vars.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { 
        expires: new Date(Date.now() + 3600000),
        httpOnly: true, 
        sameSite: "strict",
        secure : Env_Vars.NODE_ENV === "development"
    });
    return token;
}