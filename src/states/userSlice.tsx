import { createSlice } from '@reduxjs/toolkit'

export const user: UserProps = {
	username: null,
	token: null
};

interface UserProps {
	username: string | null,
	token: string | null
}

const initialState: UserProps = {
	username: null,
	token: null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		saveUser: (state, action) => {
			// Set user data in the global state user.
			state.username = action.payload.username;
			state.token = action.payload.token;

			// save global state
			user.username = action.payload.username;
			user.token = action.payload.token;
		},
		deleteUser: (state) => {
			// Delete user data in the global state user.
			state.username = null;
			state.token = null;

			// Delete global state
			user.username = null;
			user.token = null;
		},
	},
});

// Actions for user state.
export const { saveUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;