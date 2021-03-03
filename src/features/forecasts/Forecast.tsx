import React, {useEffect} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import BaseLayout from "../../components/BaseLayout";
import {Container} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import ForecastSearch from "./ForecastSearch";
import {AppDispatch} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {
	selectOptions,
	getResortOption,
	selectFirstResort,
	selectFirstForecast,
	selectSecondResort,
	selectSecondForecast,
	selectThirdResort, selectThirdForecast,
} from './forecastSlice';
import ForecastDetail from "./ForecastDetail";
import ForecastResort from "./ForecastResort";
import {FORECAST, RESORT} from "./forecastTypes";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
	forecastRoot: {
		padding: theme.spacing(1),
		marginBottom: theme.spacing(12),
	},
	forecastContainer: {
		marginTop: theme.spacing(2),
	},
	forecastPaper: {
		padding: '1.5px',
	},
	forecastIndex: {
		margin: '0 8px',
	},
	searchBox: {
		marginTop: theme.spacing(2.5),
	}
}));

const Forecast: React.FC = () => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();

	const options = useSelector(selectOptions);
	useEffect(() => {
		const init = async () => {
			await dispatch(getResortOption());
		}
		init().then().catch();
	}, [dispatch]);

	const first = {
		index: 1,
		resort: useSelector(selectFirstResort),
		forecast: useSelector(selectFirstForecast)
	};
	const second = {
		index: 2,
		resort: useSelector(selectSecondResort),
		forecast: useSelector(selectSecondForecast)
	};
	const third = {
		index: 3,
		resort: useSelector(selectThirdResort),
		forecast: useSelector(selectThirdForecast)
	};

	type forecastData = {
		index: number;
		resort: RESORT | null;
		forecast: FORECAST | null;
	};
	const setDetail: React.FC<forecastData> = (forecastData: forecastData) => {
		return (
			<>
				{(forecastData.resort && forecastData.forecast) && (
					<div className={classes.forecastContainer}>
						<Typography variant='body1' className={classes.forecastIndex}>
							#{forecastData.index}
						</Typography>
						<Paper className={classes.forecastPaper}>
							<ForecastResort resort={forecastData.resort}/>
							<ForecastDetail details={forecastData.forecast.forecast_details}/>
						</Paper>
					</div>
				)}
			</>
		)
	};

	return (
		<BaseLayout>
			<Container>
				<div className={classes.searchBox}>
					<ForecastSearch options={options}/>
				</div>
				<div className={classes.forecastRoot}>
					{setDetail(first)}
					{setDetail(second)}
					{setDetail(third)}
				</div>
			</Container>
		</BaseLayout>
	);
};

export default Forecast;
