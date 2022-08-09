import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'userId is required']
    },
    title: {
        type: String,
        required: [true, 'title is required'],
        unique: [true, 'video name should be unique']
    },
    desc: {
        type: String,
        // required: [true, 'description is required']
    },
    videoUrl: {
        type: String,
        required: [true, 'title is required']
    },
    imgUrl: {
        type: String,
        required: [true, 'title is required']
    },
    likes: {
        type: Number,
        default: 0,
        min: 0

    },
    dislikes: {
        type: Number,
        default: 0,
        min: 0
    },
    views: {
        type: Number,
        default: 0,
        min: 0
    },
},
    { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;



