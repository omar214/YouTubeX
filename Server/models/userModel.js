import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: [true, 'Email is already in use'],
		},
		password: {
			type: String,
			minlength: [6, 'Password must be at least 6 characters'],
			required: [true, 'Password is required'],
		},
		img: {
			type: String,
		},
		subscripedChannels: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
			default: [],
		},
		subscripers: {
			type: Number,
			default: 0,
			min: 0,
		},
		likedVideos: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
			default: [],
		},
		dislikedVideos: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
			default: [],
		},
		savedVideos: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
			default: [],
		},
		userVideos: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
			default: [],
		},
		history: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
			default: [],
		},
	},
	{ timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
