import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
  isLiked: false,
  isDisliked: false,
  isSaved: false,
  isSubscriped: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchVideoStart: (state) => {
      state = { ...initialState };
      state.loading = true;
      console.log(state);
    },
    fetchVideoSuccess: (state, action) => {
      // return ;
      state.loading = false;
      state.currentVideo = action.payload.currentVideo;
      const { currentUser } = action.payload;
      // console.log(currentUser);
      // // if (currentUser?.likedVideos?.includes(state.currentVideo._id))
      // if (currentUser?.likedVideos?.includes(action.payload.currentVideo._id))
      //   state.isLiked = true;
      // if (currentUser?.dislikedVideos?.includes(state.currentVideo._id))
      //   state.isDisliked = true;
      // if (currentUser?.savedVideos?.includes(state.currentVideo._id))
      //   state.isSaved = true;
      // if (currentUser?.subscribedChannels?.includes(state.currentVideo.userId._id))
      //   state.isSubscriped = true;

      // console.log({...state});
    },
    fetchVideoFailure: (state) => {
      state = { ...initialState, error: true };
    },
    likeVideo: (state, action) => {
      if (action.payload) {
        state.currentVideo.likes -= 1;
      } else {
        state.currentVideo.likes += 1;
      }
    },
    dislikeVideo: (state, action) => {
      // let { dislikes } = state.currentVideo;
      if (action.payload) {
        state.currentVideo.dislikes -= 1;
      } else {
        state.currentVideo.dislikes += 1;
      }
    },
    saveVideo: (state, action) => {
      if (action.payload) {
        // state.isSaved = false;
      } else {
        // state.isSaved = true;
      }
    },
    subscribeChannel: (state, action) => {
      console.log(action.payload);
      if (action.payload) {
        state.currentVideo.userId.subscripers -= 1;
      } else {
        state.currentVideo.userId.subscripers += 1;
      }
    },
  },
});

export const {
  fetchVideoStart,
  fetchVideoSuccess,
  fetchVideoFailure,
  likeVideo,
  dislikeVideo,
  saveVideo,
  subscribeChannel,
} = videoSlice.actions;

export default videoSlice.reducer;
