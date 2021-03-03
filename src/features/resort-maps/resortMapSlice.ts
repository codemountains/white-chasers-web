import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axios from 'axios';
import {
	CENTER_POINT,
	MAP_STATE,
	RESORT,
	RESORT_OPTION,
	SEARCH_PARAMETERS,
	SEARCHED_OBSERVATORY,
	SEARCHED_RESORT,
	FORECAST,
	CREATE_FORECAST_PARAM
} from './resortTypes';

const API_BASE_URL = process.env.REACT_APP_API_URL;
const DEFAULT_DISTANCE = process.env.REACT_APP_DEFAULT_DISTANCE ?? '10';
const DEFAULT_MAP_CENTER = {
	latitude: process.env.REACT_APP_DEFAULT_MAP_CENTER_LATITUDE ?? '36.515123',
	longitude:  process.env.REACT_APP_DEFAULT_MAP_CENTER_LONGITUDE ?? '136.822167',
};
const ERROR_MESSAGE = {
	default: 'エラーが発生しました',
};

export const getResortOption = createAsyncThunk(
	'resortMap/getResortOption',
	async () => {
		const response = await axios.get<RESORT_OPTION[]>(
			`${API_BASE_URL}/api/v1/resorts/options`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			}
		);
		return response.data;
	}
);

export const getResorts = createAsyncThunk(
	'resortMap/getResort',
	async (param: SEARCH_PARAMETERS) => {
		const prefecture = param.prefecture > 0 ? param.prefecture.toString() : '';
		const response = await axios.get<SEARCHED_RESORT>(
			`${API_BASE_URL}/api/v1/resorts/?prefecture=${prefecture}&key=${param.keyword}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			}
		);
		return response.data;
	}
);

export const getResortById = createAsyncThunk(
	'resortMap/getResortById',
	async (id: string) => {
		const response = await axios.get<RESORT>(
			`${API_BASE_URL}/api/v1/resorts/${id}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			}
		);
		return response.data;
	}
);

export const getObservatories = createAsyncThunk(
	'resortMap/getObservatories',
	async (resort_id: string) => {
		const response = await axios.get<SEARCHED_OBSERVATORY>(
			`${API_BASE_URL}/api/v1/observatories/?resort=${resort_id}&dist=${DEFAULT_DISTANCE}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			}
		);
		return response.data;
	}
);

export const createForecast = createAsyncThunk(
	'resortMap/createForecast',
	async (param: CREATE_FORECAST_PARAM) => {
		const response = await axios.post<FORECAST>(
			`${API_BASE_URL}/api/v1/forecasts/resorts/`,
			param,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			}
		);
		return response.data;
	}
);

export const initialState: MAP_STATE = {
	resort: null,
	forecast: null,
	options: [],
	observatories: null,
	center: {
		latitude: DEFAULT_MAP_CENTER.latitude,
		longitude: DEFAULT_MAP_CENTER.longitude
	},
	loading: false,
}

export const resortMapSlice = createSlice({
	name: 'resort',
	initialState,
	reducers: {
		resetResort(state) {
			state.resort = null;
			state.forecast = null;
			state.observatories = null;
		},
		updateCenter(state, action: PayloadAction<CENTER_POINT>) {
			state.center = action.payload;
		},
		showLoader(state) {
			state.loading = true;
		},
		hideLoader(state) {
			state.loading = false;
		},
	},
	extraReducers: builder => {
		builder.addCase(
			getResortOption.fulfilled,
			(state: MAP_STATE, action: PayloadAction<RESORT_OPTION[]>) => {
				return {
					...state,
					options: action.payload
				};
			}
		);
		builder.addCase(
			getResortOption.rejected,
			(_state, _action) => {
				alert(ERROR_MESSAGE.default);
			}
		);
		builder.addCase(
			getResorts.fulfilled,
			(state: MAP_STATE, action: PayloadAction<SEARCHED_RESORT>) => {
				return {
					...state,
					resort: action.payload.results[0]
				};
			}
		);
		builder.addCase(
			getResorts.rejected,
			(_state, _action) => {
				// alert(ERROR_MESSAGE.default);
			}
		);
		builder.addCase(
			getResortById.fulfilled,
			(state: MAP_STATE, action: PayloadAction<RESORT>) => {
				return {
					...state,
					resort: action.payload,
					center: {
						latitude: action.payload.latitude,
						longitude: action.payload.longitude
					}
				};
			}
		);
		builder.addCase(
			getResortById.rejected,
			(_state, _action) => {
				alert(ERROR_MESSAGE.default);
				window.location.href = '/';
			}
		);
		builder.addCase(
			getObservatories.fulfilled,
			(state: MAP_STATE, action: PayloadAction<SEARCHED_OBSERVATORY>) => {
				return {
					...state,
					observatories: action.payload.results
				};
			}
		);
		builder.addCase(
			getObservatories.rejected,
			(_state, _action) => {
				// alert(ERROR_MESSAGE.default);
			}
		);
		builder.addCase(
			createForecast.fulfilled,
			(state: MAP_STATE, action: PayloadAction<FORECAST>) => {
				return {
					...state,
					forecast: action.payload
				}
			}
		);
		builder.addCase(
			createForecast.rejected,
			(_state, _action) => {
				// alert(ERROR_MESSAGE.default);
			}
		);
	}
});

export const {
	resetResort,
	updateCenter,
	showLoader,
	hideLoader,
} = resortMapSlice.actions;

export const selectOptions = (state: RootState) => state.resort.options;
export const selectResort = (state: RootState) => state.resort.resort;
export const selectObservatories = (state: RootState) => state.resort.observatories;
export const selectCenter = (state: RootState) => state.resort.center;
export const selectForecast = (state: RootState) => state.resort.forecast;
export const selectLoading = (state: RootState) => state.resort.loading;

export default resortMapSlice.reducer;
