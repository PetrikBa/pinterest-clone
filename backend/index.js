import 'dotenv/config'
import express from 'express'
import userRouter from './routes/user.routes.js'
import boardRouter from './routes/board.routes.js'
import pinRouter from './routes/pin.routes.js'
import commentRouter from './routes/comment.routes.js'
import connectDB from './utils/connectDB.js'
import cors from 'cors';

const app = express();

const normalizeOrigin = (value = '') => value.trim().replace(/\/$/, '');
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
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

app.get('/health', (_req, res) => {
    res.status(200).json({ ok: true });
});

const port = process.env.PORT || 3000;

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/pins', pinRouter);
app.use('/comments', commentRouter);

app.listen(port, ()=>{
    connectDB();
    console.log(`Server is running on http://localhost:${port}`);
})
