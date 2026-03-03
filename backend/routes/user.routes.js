import express from 'express';
import { test } from '../controllers/user.controller.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/create', async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
        displayName: req.body.displayName,
        userName: req.body.userName,
        email: req.body.email,
        hashedPassword: hashedPassword,
    })

    res.json( 'User created successfully!');
});

router.get("/fetch", async (req, res) => {
    const users = await User.find();
    res.json(users);        

router.get('/test', test);
});


export default router;