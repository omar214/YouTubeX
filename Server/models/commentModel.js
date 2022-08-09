import mongoose from 'mongoose'


const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'userId is required']
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: [true, 'videoId is required']
    },
    desc: {
        type: String,
        required: [true, 'description is required']
    }
},
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;



