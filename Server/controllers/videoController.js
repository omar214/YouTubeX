import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Video from '../models/videoModel.js';
import createError from '../utils/error.js';

const addVideo = async (req, res, next) => {
	try {
		const id = req.userData.id;

		const video = new Video({ ...req.body });
		const newVideo = await video.save();

		await User.findByIdAndUpdate(id, {
			$addToSet: { userVideos: video._id },
		});
		res.status(200).json({ msg: 'video added ', newVideo });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const getAllVideos = async (req, res, next) => {
	try {
		const videos = await Video.find().sort({ createdAt: -1 }).populate({
			path: 'userId',
			model: 'User',
			select: 'name img',
		});
		res.status(200).json({
			count: videos.length,
			videos,
		});
	} catch (error) {
		next(error);
	}
};
const getVideoById = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id || !mongoose.isValidObjectId(id))
			return next(createError(401, 'valid id is required'));

		const video = await Video.findOne({ _id: id }).populate({
			path: 'userId',
			model: 'User',
			select: { password: 0, __v: 0 },
		});
		if (!video) return next(createError(404, 'video is not found '));

		res.status(200).json({ ...video._doc });
	} catch (error) {
		next(error);
	}
};

const updateVideo = async (req, res, next) => {
	try {
		const videoId = req.params.id;
		const userId = req.userData.id;
		if (!videoId || !mongoose.isValidObjectId(videoId))
			return next(createError(401, 'valid id is required'));

		let video = await Video.findOne({ _id: videoId });
		if (!video) return next(createError(404, 'user is not found '));

		if (!video.userId.equals(userId))
			return next(createError(403, 'you can only update your video'));

		for (let key in req.body) {
			video[key] = req.body[key];
		}
		video = await video.save();
		res.status(200).json({ video });
	} catch (error) {
		next(error);
	}
};
const deleteVideo = async (req, res, next) => {
	try {
		const videoId = req.params.id;
		const userId = req.userData.id;

		if (!videoId || !mongoose.isValidObjectId(videoId))
			return next(createError(401, 'valid id is required'));
		let video = await Video.findById(videoId);
		if (!video) return next(createError(404, 'video not found'));

		if (!video.userId._id.equals(userId))
			return next(createError(403, 'you can only delete your video'));

		await video.deleteOne({ _id: videoId });
		res.status(200).json('video deleted');
	} catch (error) {
		next(error);
	}
};

const viewVideo = async (req, res, next) => {
	try {
		const videoId = req.params.id;
		if (!videoId || !mongoose.isValidObjectId(videoId))
			return next(createError(401, 'valid id is required'));

		await Video.findByIdAndUpdate(videoId, {
			$inc: { views: 1 },
		});
		res.status(200).json('video viewd');
	} catch (error) {
		next(error);
	}
};

const getLikedVideos = async (req, res, next) => {
	try {
		const userId = req.userData.id;
		let user = await User.findById(userId).populate({
			path: 'likedVideos',
			model: 'Video',
		});
		if (!user) return next(createError(404, 'user not found'));

		res.status(200).json({ liked: user.likedVideos });
	} catch (error) {
		next(error);
	}
};
const getDislikedVideos = async (req, res, next) => {
	try {
		const userId = req.userData.id;
		let user = await User.findById(userId).populate({
			path: 'dislikedVideos',
			model: 'Video',
		});
		if (!user) return next(createError(404, 'user not found'));

		res.status(200).json({ disliked: user.dislikedVideos });
	} catch (error) {
		next(error);
	}
};

const getSavedVideos = async (req, res, next) => {
	try {
		const userId = req.userData.id;
		let user = await User.findById(userId).populate({
			path: 'savedVideos',
			model: 'Video',
			populate: {
				path: 'userId',
				model: 'User',
				select: 'name img',
			},
		});
		if (!user) return next(createError(404, 'user not found'));

		res.status(200).json({ videos: user.savedVideos });
	} catch (error) {
		next(error);
	}
};
const getSubscribed = async (req, res, next) => {
	try {
		const userId = req.userData.id;
		const user = await User.findById(userId);
		const subscribed = await User.find({
			_id: { $in: user.subscripedChannels },
		}).select('userVideos');
		if (!subscribed) return res.status(200).json({ videos: [] });

		let subVideos = subscribed.map((sub) => sub.userVideos);
		subVideos = subVideos.flat();
		const videos = await Video.find({
			_id: { $in: subVideos },
		}).populate({
			path: 'userId',
			model: 'User',
			select: 'name img',
		});

		res.status(200).json({ count: videos.length, videos, subscribed });
	} catch (error) {
		next(error);
	}
};

const getTrend = async (req, res, next) => {
	try {
		const videos = await Video.find()
			.populate({
				path: 'userId',
				model: 'User',
				select: 'name img',
			})
			.sort({ views: -1 });
		res.status(200).json({ videos });
	} catch (error) {
		next(error);
	}
};
const getRandomVideos = async (req, res, next) => {
	try {
		const count = 3;
		const videos = await Video.aggregate([{ $sample: { size: count } }]);
		res.status(200).json(videos);
	} catch (error) {
		next(error);
	}
};

// TODO
const getVideosByTags = async (req, res, next) => {
	try {
		res.status(200).json('like done');
	} catch (error) {
		next(error);
	}
};
const search = async (req, res, next) => {
	try {
		const query = req.query.q;
		if (!query) return next(createError(400, 'query is required'));
		console.log(query);
		const videos = await Video.find({
			title: { $regex: query, $options: 'i' },
		}).limit(40);
		res.status(200).json(videos);
	} catch (error) {
		next(error);
	}
};

const addToHistory = async (req, res, next) => {
	try {
		console.log('add history');

		const videoId = req.params.id;
		const userId = req.userData.id;

		if (!videoId || !mongoose.isValidObjectId(videoId))
			return next(createError(401, 'valid id is required'));
		let video = await Video.findById(videoId);
		let user = await User.findById(userId);

		if (!video) return next(createError(404, 'video not found'));
		if (!user) return next(createError(404, 'user not found'));

		await User.findByIdAndUpdate(userId, { $addToSet: { history: videoId } });

		res.status(200).json('video added to history');
	} catch (error) {
		next(error);
	}
};

const getHistory = async (req, res, next) => {
	try {
		const userId = req.userData.id;
		const user = await User.findById(userId).populate({
			path: 'history',
			model: 'Video',
			populate: {
				path: 'userId',
				model: 'User',
				select: 'name img',
			},
		});

		res.status(200).json({ videos: user.history });
	} catch (error) {
		next(error);
	}
};

export {
	addVideo,
	getAllVideos,
	getVideoById,
	updateVideo,
	deleteVideo,
	getLikedVideos,
	getDislikedVideos,
	viewVideo,
	getSavedVideos,
	getSubscribed,
	getTrend,
	getRandomVideos,
	getVideosByTags,
	search,
	getHistory,
	addToHistory,
};
