import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import resortReducer from '../features/resort-maps/resortMapSlice';

const devTools = (): boolean => {
	const devTools = process.env.REACT_APP_REDUX_DEV_TOOLS;
	if (devTools === undefined || devTools === null) {
		return false;
	} else {
		return devTools.toLowerCase() === 'true';
	}
}

export const store = configureStore({
	reducer: {
		resort: resortReducer,
	},
	devTools: devTools()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
	RootState,
	unknown,
	Action<string>>;

export type AppDispatch = typeof store.dispatch;
