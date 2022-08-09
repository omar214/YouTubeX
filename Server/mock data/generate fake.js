// generated from https://www.mockaroo.com/
import User from '../models/userModel.js';
import Video from '../models/videoModel.js';

const generateFakeUsers = async (users) => {
    for (let i = 0; i < users.length; i++) {
        console.log(i + 1);
        let user = users[i];
        let newUser = new User(user);
        await newUser.save();
    }
}
// generateFakeUsers();

const getVideosUrls = async () => {
    // let videos = await Video.find();
    // let videosUrls = [];
    // for (let i = 0; i < videos.length; i++) {
    //     videosUrls.push(videos[i].url);
    // }
    // return videosUrls;
}
const generateFakeVideos = async (videos) => {
    for (let i = 0; i < videos.length; i++) {
        console.log(i + 1);
        let video = videos[i];
        let newVideo = new Video(video);
        await newVideo.save();
    }
}

export default generateFakeUsers;
