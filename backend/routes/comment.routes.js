import express from 'express';
import { getPostComments,AddComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/:postId', getPostComments);
router.post('/',verifyToken, AddComment);


export default router;