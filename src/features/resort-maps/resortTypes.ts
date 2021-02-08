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

export interface SEARCHED_RESORT {
	count: number;
	next: string | null;
	previous: string | null;
	results: RESORT[];
}

export interface SEARCH_PARAMETERS {
	prefecture: number;
	keyword: string;
}

export interface OBSERVATORY_RAINFALL {
	id: string;
	updated_at: string;
	observatory: string;
	observed_at: string;
	rainfall_3h: string;
	rainfall_6h: string;
	rainfall_12h: string;
	rainfall_24h: string;
	rainfall_48h: string;
	rainfall_72h: string;
}

export interface OBSERVATORY_SNOWFALL {
	id: string;
	updated_at: string;
	observatory: string;
	observed_at: string;
	snowfall_3h: string;
	snowfall_6h: string;
	snowfall_12h: string;
	snowfall_24h: string;
	snowfall_48h: string;
	snowfall_72h: string;
}

export interface OBSERVATORY_SNOW_DEPTH {
	id: string;
	updated_at: string;
	observatory: string;
	observed_at: string;
	snow_depth: number;
}

export interface OBSERVATORY_TEMPERATURE {
	id: string;
	updated_at: string;
	observatory: string;
	observed_at: string;
	highest: string;
	highest_observed_at: string;
	lowest: string;
	lowest_observed_at: string;
}

export interface OBSERVATORY {
	id: string;
	name: string;
	name_kana: string;
	code: number;
	observation_type: string;
	prefecture: number;
	prefecture_name: string;
	location: string;
	latitude: string;
	longitude: string;
	distance: string;
	observatory_rainfall: OBSERVATORY_RAINFALL | null;
	observatory_snowfall: OBSERVATORY_SNOWFALL | null;
	observatory_snow_depth: OBSERVATORY_SNOW_DEPTH | null;
	observatory_temperature: OBSERVATORY_TEMPERATURE | null;
}

export interface SEARCHED_OBSERVATORY {
	count: number;
	next: string | null;
	previous: string | null;
	results: OBSERVATORY[];
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

export interface CREATE_FORECAST_PARAM {
	resort: string;
}

export interface CENTER_POINT {
	latitude: string;
	longitude: string;
}

export interface MAP_STATE {
	resort: RESORT | null;
	forecast: FORECAST | null;
	options: RESORT_OPTION[];
	observatories: OBSERVATORY[] | null;
	center: CENTER_POINT;
	loading: boolean;
}
