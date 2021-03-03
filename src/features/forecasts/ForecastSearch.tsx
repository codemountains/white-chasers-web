import React, {useState} from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {isMobileOnly} from "react-device-detect";
import {RESORT_OPTION} from "./forecastTypes";
import {
	showLoader,
	hideLoader,
	resetFirst,
	resetSecond,
	resetThird,
	getResortById,
	createForecast
} from './forecastSlice';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {AppDispatch} from "../../app/store";
import {useDispatch} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) => ({
	searchBoxContainer: {
		margin: theme.spacing(1),
		padding: theme.spacing(1.5),
	},
	input: {
		flex: 1,
	},
	inputTextField: {
		'& div': {
			backgroundColor: '#FFFFFF',
		},
	},
}));

type Props = {
	options: RESORT_OPTION[];
}

const ForecastSearch: React.FC<Props> = ({options}: Props) => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	const [selectedFirstOption, setSelectedFirstOption] = useState<RESORT_OPTION | null>(null);
	const [selectedSecondOption, setSelectedSecondOption] = useState<RESORT_OPTION | null>(null);
	const [selectedThirdOption, setSelectedThirdOption] = useState<RESORT_OPTION | null>(null);

	const handleChange = (value: RESORT_OPTION | null, key: number) => {
		const change = async () => {
			await dispatch(showLoader());

			if (key === 2) {
				await setSelectedSecondOption(value);
			} else if (key === 3) {
				await setSelectedThirdOption(value);
			} else {
				await setSelectedFirstOption(value);
			}

			if (value) {
				await dispatch(getResortById({
					id: value.id,
					key: key
				}));
				await dispatch(createForecast({
					resort: value.id,
					key: key
				}));
			} else {
				if (key === 2) {
					await dispatch(resetSecond());
				} else if (key === 3) {
					await dispatch(resetThird());
				} else {
					await dispatch(resetFirst());
				}
			}
			await dispatch(hideLoader());
		}
		change().then().catch();
	};

	const searchBox = (key: number) => {
		const value = () => {
			if (key === 2) {
				return selectedSecondOption;
			} else if (key === 3) {
				return selectedThirdOption;
			} else {
				return selectedFirstOption;
			}
		}

		return (
			<Autocomplete
				id='combo-box-ski-resorts-forecasts'
				className={classes.input}
				options={options}
				groupBy={(option) => (option.prefecture_name)}
				getOptionLabel={(option) => (option.name)}
				renderInput={(params) => (
					<TextField
						{...params}
						variant={isMobileOnly ? 'outlined' : 'standard'}
						color={isMobileOnly ? 'secondary' : 'primary'}
						size={isMobileOnly ? 'small' : 'medium'}
						className={classes.inputTextField}
						placeholder='スキー場を検索'
					/>
				)}
				value={value()}
				onChange={(event: any, value: RESORT_OPTION | null) => {
					handleChange(value, key)
				}}
				noOptionsText='一致するスキー場がありません'
			/>
		)
	};

	return (
		<div>
			<Paper className={classes.searchBoxContainer}>
				<Grid container spacing={2}>
					{[1, 2, 3].map((value) => (
						<Grid item xs={value === 1 ? 12 : 6} md={4} key={value}>
							<Typography>
								{'#' + value}
							</Typography>
							{searchBox(value)}
						</Grid>
					))}
				</Grid>
			</Paper>
		</div>
	);
};

export default ForecastSearch;
