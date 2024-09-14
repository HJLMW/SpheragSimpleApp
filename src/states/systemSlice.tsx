import { createSlice } from '@reduxjs/toolkit'
import { System } from '../types/system';

const initialState: System[] = [];

export const systemSlice = createSlice({
	name: 'systems',
	initialState,
	reducers: {
		saveSystems: (state, action) => {
			// Save systems (farms)
			return action.payload;
		},
		
		addSystems: (state, action) => {
			// Add new systems to the array
			state.push(...action.payload);
		},
		likeSystem: (state, action) => {
			return state.map(system => {
				if (system.id === action.payload) {
					return {
						...system,
						favourite: !system.favourite
					};
				}
				return system;
			});
		}
	},
});

// Actions for user state.
export const { saveSystems, addSystems, likeSystem } = systemSlice.actions;
export default systemSlice.reducer;