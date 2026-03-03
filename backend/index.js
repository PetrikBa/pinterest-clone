import 'dotenv/config'
import express from 'express'
import userRouter from './routes/user.routes.js'
import boardRouter from './routes/board.routes.js'
import pinRouter from './routes/pin.routes.js'
import commentRouter from './routes/comment.routes.js'
import connectDB from './utils/connectDB.js'

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/pins', pinRouter);
app.use('/comments', commentRouter);

app.listen(port, ()=>{
    connectDB();
    console.log(`Server is running on http://localhost:${port}`);
})
