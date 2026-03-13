import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req,res) => {
        const { userName, displayName, email, password } = req.body;

        if (!userName || !displayName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newHashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userName,
            displayName,
            email,
            hashedPassword: newHashedPassword,
        });

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

        res.cookie('token', token, {
            httpOnly: true, //cant be modified by client-side JS
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

        res.status(201).json(detailsWithoutPassword);
}

export const loginUser = async (req,res) => {
    const { email, password } = req.body;

    if ( !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

    res.cookie('token', token, {
        httpOnly: true, //cant be modified by client-side JS
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

    res.status(200).json(detailsWithoutPassword);
}

export const logoutUser = async (req,res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
}


export const getUser = async (req,res) => { 
    const {userName} = req.params;

    const user = await User.findOne({userName});

    const {hashedPassword, ...detailsWithoutPassword} = user.toObject();

    res.status(200).json(detailsWithoutPassword) ; 
}