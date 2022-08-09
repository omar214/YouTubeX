import express from 'express';
const router = express.Router();
import verifyAuth from '../middlewares/authMiddlware.js';
import { addComment, deleteComment, getAllComments } from '../controllers/commentController.js';



router.get('/:videoId', getAllComments);
router.post('/:videoId', verifyAuth, addComment);
router.delete('/:id', verifyAuth, deleteComment);


export default router;