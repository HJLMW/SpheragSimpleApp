import { configureStore } from '@reduxjs/toolkit';
import userReducer from './states/userSlice';
import systemSlice from './states/systemSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		systems: systemSlice
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch