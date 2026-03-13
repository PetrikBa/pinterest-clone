import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express'
import userRouter from './routes/user.routes.js'
import boardRouter from './routes/board.routes.js'
import pinRouter from './routes/pin.routes.js'
import commentRouter from './routes/comment.routes.js'
import connectDB from './utils/connectDB.js'
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load backend/.env regardless of process cwd.
dotenv.config({ path: path.join(__dirname, '.env') });

const requiredEnv = ['JWT_SECRET', 'MONGO_URL'];
const missingEnv = requiredEnv.filter((name) => !(process.env[name] || '').trim());
if (missingEnv.length) {
    throw new Error(`Missing required environment variables: ${missingEnv.join(', ')}`);
}

const app = express();

const normalizeOrigin = (value = '') => value.trim().replace(/\/$/, '');
const allowedOrigins = (process.env.CLIENT_URL || '')
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow non-browser requests (curl, server-to-server) without Origin header.
        if (!origin) return callback(null, true);

        const normalized = normalizeOrigin(origin);
        if (allowedOrigins.includes(normalized)) return callback(null, true);

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/health', (_req, res) => {
    const dbConnected = mongoose.connection.readyState === 1;
    res.status(dbConnected ? 200 : 503).json({
        ok: dbConnected,
        dbState: mongoose.connection.readyState,
    });
});

const port = process.env.PORT || 3000;

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/pins', pinRouter);
app.use('/comments', commentRouter);

app.listen(port, ()=>{
    connectDB();
    console.log('CORS allowed origins:', allowedOrigins);
    console.log(`Server is running on http://localhost:${port}`);
})
