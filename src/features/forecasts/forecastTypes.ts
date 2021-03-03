export interface RESORT {
	id: string;
	name: string;
	name_kana: string;
	postal_code: string;
	prefecture: number;
	prefecture_name: string;
	address: string;
	latitude: string;
	longitude: string;
	url: string;
	live_camera_url: string | null;
}

export interface RESORT_OPTION {
	id: string;
	name: string;
	name_kana: string;
	name_hiragana: string;
	prefecture: number;
	prefecture_name: string;
}

export interface FORECAST_DETAIL {
	id: string;
	forecast: string;
	forecasted_at: string;
	forecasted_date: string;
	forecasted_time: string;
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	sea_level: number;
	grnd_level: number;
	humidity: number;
	temp_kf: number;
	weather: string;
	weather_id: number;
	weather_description: string;
	weather_icon_name: string;
	clouds: number;
	wind_speed: number;
	wind_deg: number;
	wind_deg_name: string;
	visibility: number;
	pop: number;
	rain: number | null;
	snow: number | null;
	snow_depth: number | null;
	sys: string;
}

export interface FORECAST {
	id: string;
	resort: string;
	forecast_details: FORECAST_DETAIL[];
}

export interface GET_RESORT_PARAM {
	id: string;
	key: number;
}

export interface GET_RESORT_RESPONSE {
	resort: RESORT;
	key: number;
}

export interface CREATE_FORECAST_PARAM {
	resort: string;
	key: number;
}

export interface CREATE_FORECAST_RESPONSE {
	forecast: FORECAST;
	key: number;
}

export interface FORECAST_STATE {
	first_resort: RESORT | null;
	first_forecast: FORECAST | null;
	second_resort: RESORT | null;
	second_forecast: FORECAST | null;
	third_resort: RESORT | null;
	third_forecast: FORECAST | null;
	options: RESORT_OPTION[];
	loading: boolean;
}
