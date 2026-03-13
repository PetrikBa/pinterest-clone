import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('Server misconfiguration: JWT_SECRET is missing');
    }
    return secret;
};

const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };
};

export const registerUser = async (req,res) => {
    try {
        const jwtSecret = getJwtSecret();
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

        const token = jwt.sign({userId: user._id}, jwtSecret);

        res.cookie('token', token, getCookieOptions());

        const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

        res.status(201).json(detailsWithoutPassword);
    } catch (err) {
        console.error('registerUser error:', err);
        res.status(500).json({ message: err.message });
    }
}

export const loginUser = async (req,res) => {
    try {
        const jwtSecret = getJwtSecret();
        const { email, password } = req.body;

        if (!email || !password) {
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

        const token = jwt.sign({userId: user._id}, jwtSecret);

        res.cookie('token', token, getCookieOptions());

        const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

        res.status(200).json(detailsWithoutPassword);
    } catch (err) {
        console.error('loginUser error:', err);
        res.status(500).json({ message: err.message });
    }
}

export const logoutUser = async (req,res) => {
    const { maxAge, ...clearCookieOptions } = getCookieOptions();
    res.clearCookie('token', clearCookieOptions);
    res.status(200).json({ message: "Logged out successfully" });
}


export const getUser = async (req,res) => { 
    try {
        const {userName} = req.params;

        const user = await User.findOne({userName});

        if (!user) return res.status(404).json({ message: "User not found" });

        const {hashedPassword, ...detailsWithoutPassword} = user.toObject();

        res.status(200).json(detailsWithoutPassword);
    } catch (err) {
        console.error('getUser error:', err);
        res.status(500).json({ message: err.message });
    }
}