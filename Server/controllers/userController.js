import mongoose from "mongoose";
import User from "../models/userModel.js";
import Video from "../models/videoModel.js";
import createError from "../utils/error.js";


const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            count: users.length,
            users
        })
    } catch (error) {
        next(error)
    }
}
const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id || !mongoose.isValidObjectId(id))
            return next(createError(401, 'valid id is required'))

        const user = await User.findOne({ _id: id });
        if (!user) return next(createError(404, 'user is not found '))

        res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id || !mongoose.isValidObjectId(id))
            return next(createError(401, 'valid id is required'))

        if (req.userData.id !== id)
            return next(createError(403, 'you can only update your email'))

        let user = await User.findOne({ _id: id });
        if (!user) return next(createError(404, 'user is not found '))
        // console.log('test');
        for (let key in req.body) {
            user[key] = req.body[key];
        }
        user = await user.save();
        res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id || !mongoose.isValidObjectId(id))
            return next(createError(401, 'valid id is required'))

        if (req.userData.id !== id)
            return next(createError(403, 'you can only delete your email'))
        let user = await User.findById(id)
        if (!user) return next(createError(404, 'user not found'));

        await User.deleteOne({ _id: id });
        res.status(200).json("user deleted")
    } catch (error) {
        next(error)
    }
}

const subscribeUser = async (req, res, next) => {
    try {
        const friendId = req.params.id;
        const myId = req.userData.id;
        if (!friendId || !mongoose.isValidObjectId(friendId))
            return next(createError(401, 'valid id is required'))
        // if (myId === friendId)
        //     return next(createError(400, 'you cant subscripe yourself'))

        let friend = await User.findById(friendId);
        let user = await User.findById(myId);
        if (!friend || !user)
            return next(createError(404, 'user not found'))

        if (user.subscripedChannels.includes(friendId)) {
            // return next(createError(400, 'you already subscriped him'));
            await User.findByIdAndUpdate(friendId, { $inc: { subscripers: -1 } })
            await User.findByIdAndUpdate(myId, { $pull: { subscripedChannels: friendId } })

            return res.status(200).json("un subscripe done");
        } else {
            await User.findByIdAndUpdate(friendId, { $inc: { subscripers: 1 } })
            await User.findByIdAndUpdate(myId, { $addToSet: { subscripedChannels: friendId } })

            return res.status(200).json("subscripe done");
        }

    } catch (error) {
        next(error)
    }
}
const unsubscribeUser = async (req, res, next) => {
    try {
        const friendId = req.params.id;
        const myId = req.userData.id;
        if (!friendId || !mongoose.isValidObjectId(friendId))
            return next(createError(401, 'valid id is required'))
        if (myId === friendId)
            return next(createError(400, 'you cant subscripe yourself'))

        let friend = await User.findById(friendId);
        let user = await User.findById(myId);
        if (!friend || !user)
            return next(createError(404, 'user not found'))

        const isFound = user.subscripedChannels.find((ch) => ch === friendId)
        if (!isFound)
            return next(createError(404, 'you didnt subscripe him'))

        await User.findByIdAndUpdate(friendId, { $inc: { subscripers: -1 } })
        await User.findByIdAndUpdate(myId, { $pull: { subscripedChannels: friendId } })
        console.log('test');
        res.status(200).json("unsubscripe done");
    } catch (error) {
        next(error)
    }
}
const likeVideo = async (req, res, next) => {
    try {
        const videoId = req.params.id;
        const userId = req.userData.id;
        if (!videoId || !mongoose.isValidObjectId(videoId))
            return next(createError(401, 'valid id is required'))

        let video = await Video.findById(videoId);
        let user = await User.findById(userId);
        if (!video || !user)
            return next(createError(404, 'video or user not found'))

        if (user.likedVideos.includes(videoId)) {
            // return next(createError(400, 'you already like it'));
            await Video.findByIdAndUpdate(videoId, { $inc: { likes: -1 } })
            await User.findByIdAndUpdate(userId, { $pull: { likedVideos: videoId } })
            res.status(200).json("unlike done");
        } else {
            await Video.findByIdAndUpdate(videoId, { $inc: { likes: 1 } })
            await User.findByIdAndUpdate(userId, { $addToSet: { likedVideos: videoId } })
            res.status(200).json("like done");

        }


    } catch (error) {
        next(error)
    }
}
const unlikeVideo = async (req, res, next) => {
    try {
        const videoId = req.params.id;
        const userId = req.userData.id;
        if (!videoId || !mongoose.isValidObjectId(videoId))
            return next(createError(401, 'valid id is required'))

        let video = await Video.findById(videoId);
        let user = await User.findById(userId);
        if (!video || !user)
            return next(createError(404, 'video or user not found'))

        if (user.dislikedVideos.includes(videoId)) {
            // return next(createError(400, 'you already dislike it'));
            await Video.findByIdAndUpdate(videoId, { $inc: { dislikes: -1 } })
            await User.findByIdAndUpdate(userId, { $pull: { dislikedVideos: videoId } })
            res.status(200).json("remove dislike done");

        } else {
            await Video.findByIdAndUpdate(videoId, { $inc: { dislikes: 1 } })
            await User.findByIdAndUpdate(userId, { $addToSet: { dislikedVideos: videoId } })
            res.status(200).json("dislike done");
        }


    } catch (error) {
        next(error)
    }
}
const saveVideo = async (req, res, next) => {
    try {
        const videoId = req.params.id;
        const userId = req.userData.id;
        if (!videoId || !mongoose.isValidObjectId(videoId))
            return next(createError(401, 'valid id is required'))

        let video = await Video.findById(videoId);
        let user = await User.findById(userId);
        if (!video || !user)
            return next(createError(404, 'video or user not found'))

        if (user.savedVideos.includes(videoId)) {
            await User.findByIdAndUpdate(userId, { $pull: { savedVideos: videoId } })
            res.status(200).json("unSave video done");
            // return next(createError(400, 'you already saved it'));
        } else {
            await User.findByIdAndUpdate(userId, { $addToSet: { savedVideos: videoId } })
            res.status(200).json("saving video done");
        }


    } catch (error) {
        next(error)
    }
}
const unsaveVideo = async (req, res, next) => {
    try {
        const videoId = req.params.id;
        const userId = req.userData.id;
        if (!videoId || !mongoose.isValidObjectId(videoId))
            return next(createError(401, 'valid id is required'))

        let video = await Video.findById(videoId);
        let user = await User.findById(userId);
        if (!video || !user)
            return next(createError(404, 'video or user not found'))

        if (!user.savedVideos.includes(videoId))
            return next(createError(400, 'you didnot save it'));


        await User.findByIdAndUpdate(userId, { $pull: { savedVideos: videoId } })
        console.log('test');

        res.status(200).json("unsaving video done");
    } catch (error) {
        next(error)
    }
}



export {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    subscribeUser,
    unsubscribeUser,
    likeVideo,
    unlikeVideo,
    saveVideo,
    unsaveVideo
} 