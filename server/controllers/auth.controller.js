import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from '../utils/generateToken.js'

export async function signup (req, res) {
    try {
        const { username, password, email } = req.body;

        if(!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        //email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format', success: false });
        }

        //password validation
        if(password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters.', success: false });
        }

        const exitingUserByEmail = await User.findOne({email : email});

        if(exitingUserByEmail){
            return res.status(400).json({ message: 'Email already exists', success: false });
        }

        const exitingUserByUsername = await User.findOne({username : username});

        if(exitingUserByUsername){
            return res.status(400).json({ message: 'Username already exists', success: false });
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            image
        });
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            //remove password from response
            res.status(201).json({success: true, User: {
                ...newUser._doc,
                password: '',
            } });
        }


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

export async function login (req, res) {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }
        
        const user = await User.findOne({email : email});

        if(!user){
            return res.status(404).json({ message: 'Invalid credentials', success: false });
        }

        const isCorrectPassword = await bcryptjs.compare(password, user.password);

        if(!isCorrectPassword){
            return res.status(400).json({ message: 'Invalid credentials', success: false });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({ success: true, 
            user: {
                ...user._doc,
                password : '',
            }})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

export async function logout (req, res) {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: 'logged out successfully' , success: true });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

export async function authCheck (req, res) {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}