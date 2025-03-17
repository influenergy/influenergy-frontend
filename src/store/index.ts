import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./features/authSlice";
import postReducer from "./features/postSlice";

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist the entire auth slice
};

// Combine reducers (helps in adding more reducers later)
const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});

// Apply persistReducer to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid serializable warnings
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserType = (state: RootState) => state.auth.userType;

// Post selectors
export const selectPosts = (state: RootState) => state.post.campaigns;
export const selectCurrentPost = (state: RootState) =>
  state.post.currentCampaign;
export const selectPostLoading = (state: RootState) => state.post.loading;
export const selectPostError = (state: RootState) => state.post.error;
