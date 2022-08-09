import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';



// import slices
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";


const persistConfig = {
  key: 'user',
  storage,
};
const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store =  configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;