import { createSlice } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.clear();
      storage.removeItem("persist:user");
      // localStorage.removeItem("persist:user");
    },
    userLikeVideo: (state, action) => {
      if (!state.currentUser) return;
      if (state.currentUser?.likedVideos?.includes(action.payload)) {
        state.currentUser.likedVideos.splice(
          state.currentUser.likedVideos.indexOf(action.payload),
          1
        );
      } else {
        state.currentUser.likedVideos.push(action.payload);
      }
    },
    userDislikeVideo: (state, action) => {
      // if (!state.currentUser) return;
      if (state.currentUser?.dislikedVideos?.includes(action.payload)) {
        state.currentUser.dislikedVideos.splice(
          state.currentUser.dislikedVideos.indexOf(action.payload),
          1
        );
      } else {
        state.currentUser.dislikedVideos.push(action.payload);
      }
    },
    userSaveVideo: (state, action) => {
      if (!state.currentUser) return;
      if (state.currentUser?.savedVideos?.includes(action.payload)) {
        state.currentUser.savedVideos.splice(
          state.currentUser.savedVideos.indexOf(action.payload),
          1
        );
      } else {
        state.currentUser.savedVideos.push(action.payload);
      }
    },
    userSubscribeChannel: (state, action) => {
      if (!state.currentUser) return;
      if (state.currentUser?.subscripedChannels?.includes(action.payload)) {
        state.currentUser.subscripedChannels.splice(
          state.currentUser.subscripedChannels.indexOf(action.payload),
          1
        );
        console.log("user un sub");
      } else {
        state?.currentUser?.subscripedChannels?.push(action.payload);
        console.log("user sub");
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  userLikeVideo,
  userDislikeVideo,
  userSaveVideo,
  userSubscribeChannel,
} = userSlice.actions;

export default userSlice.reducer;
