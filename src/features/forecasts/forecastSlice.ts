import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axios from 'axios';
import {
	RESORT,
	RESORT_OPTION,
	CREATE_FORECAST_PARAM,
	CREATE_FORECAST_RESPONSE,
	FORECAST,
	FORECAST_STATE,
	GET_RESORT_PARAM,
	GET_RESORT_RESPONSE
} from './forecastTypes';

const API_BASE_URL = process.env.REACT_APP_API_URL;
const ERROR_MESSAGE = {
	default: 'エラーが発生しました',
};

export const getResortOption = createAsyncThunk(
	'forecast/getResortOptionForForecasts',
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

export const getResortById = createAsyncThunk(
	'forecast/getResortById',
	async (param: GET_RESORT_PARAM) => {
		const response = await axios.get<RESORT>(
			`${API_BASE_URL}/api/v1/resorts/${param.id}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			}
		);
		return {
			key: param.key,
			resort: response.data
		};
	}
);

export const createForecast = createAsyncThunk(
	'forecast/createForecast',
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
		return {
			key: param.key,
			forecast: response.data
		};
	}
);

export const initialState: FORECAST_STATE = {
	first_resort: null,
	first_forecast: null,
	second_resort: null,
	second_forecast: null,
	third_resort: null,
	third_forecast: null,
	options: [],
	loading: false,
}

export const forecastSlice = createSlice({
	name: 'forecast',
	initialState,
	reducers: {
		resetFirst(state) {
			state.first_resort = null;
			state.first_forecast = null;
		},
		resetSecond(state) {
			state.second_resort = null;
			state.second_forecast = null;
		},
		resetThird(state) {
			state.third_resort = null;
			state.third_forecast = null;
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
			(state: FORECAST_STATE, action: PayloadAction<RESORT_OPTION[]>) => {
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
			getResortById.fulfilled,
			(state: FORECAST_STATE, action: PayloadAction<GET_RESORT_RESPONSE>) => {
				if (action.payload.key === 2) {
					return {
						...state,
						second_resort: action.payload.resort
					}
				} else if (action.payload.key === 3) {
					return {
						...state,
						third_resort: action.payload.resort
					}
				} else {
					return {
						...state,
						first_resort: action.payload.resort
					}
				}
			}
		);
		builder.addCase(
			createForecast.fulfilled,
			(state: FORECAST_STATE, action: PayloadAction<CREATE_FORECAST_RESPONSE>) => {
				if (action.payload.key === 2) {
					return {
						...state,
						second_forecast: action.payload.forecast
					}
				} else if (action.payload.key === 3) {
					return {
						...state,
						third_forecast: action.payload.forecast
					}
				} else {
					return {
						...state,
						first_forecast: action.payload.forecast
					}
				}
			}
		);
	}
});

export const {
	resetFirst,
	resetSecond,
	resetThird,
	showLoader,
	hideLoader,
} = forecastSlice.actions;

export const selectFirstResort = (state: RootState) => state.forecast.first_resort;
export const selectFirstForecast = (state: RootState) => state.forecast.first_forecast;
export const selectSecondResort = (state: RootState) => state.forecast.second_resort;
export const selectSecondForecast = (state: RootState) => state.forecast.second_forecast;
export const selectThirdResort = (state: RootState) => state.forecast.third_resort;
export const selectThirdForecast = (state: RootState) => state.forecast.third_forecast;
export const selectOptions = (state: RootState) => state.forecast.options;
export const selectLoading = (state: RootState) => state.forecast.loading;

export default forecastSlice.reducer;