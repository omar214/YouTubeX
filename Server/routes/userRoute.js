import express from 'express';
const router = express.Router();
import {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    subscribeUser,
    unsubscribeUser,
    likeVideo,
    unlikeVideo,
    saveVideo,
    unsaveVideo
} from '../controllers/userController.js';
import verifyAuth from '../middlewares/authMiddlware.js';

router.get('/', getAllUsers);
router.get('/:id', getUserById);

router.delete('/:id', verifyAuth, deleteUser);
router.put('/:id', verifyAuth, updateUser);

router.put('/subscribe/:id', verifyAuth, subscribeUser);
router.put('/unsubscribe/:id', verifyAuth, unsubscribeUser);

router.put('/like/:id', verifyAuth, likeVideo);
router.put('/dislike/:id', verifyAuth, unlikeVideo);

router.put('/save/:id', verifyAuth, saveVideo);
router.put('/unsave/:id', verifyAuth, unsaveVideo);

export default router;