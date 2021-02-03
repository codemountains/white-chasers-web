import React from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../app/store';
import {updateCenter} from '../resortMapSlice';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {FORECAST, RESORT} from '../resortTypes';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ForecastView from './ForecastView';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		margin: theme.spacing(1)
	},
	resortName: {
		fontSize: theme.typography.pxToRem(15),
	},
	linkContainer: {
		marginTop: theme.spacing(1),
	},
	forecastContainer: {
		margin: '8px 0px',
		border: '1px solid',
		borderColor: theme.palette.primary.light,
	},
}));

type Props = {
	resort: RESORT;
	forecast: FORECAST;
};

const ResortView: React.FC<Props> = ({resort, forecast}: Props) => {
	const classes = useStyles();
	const dispatch: AppDispatch = useDispatch();

	const handleSelectResort = (lat: string, lon: string) => {
		dispatch(updateCenter({latitude: lat, longitude: lon}));
	};

	const handleOpenUrl = (url: string | null) => {
		if (url) {
			window.open(url, '_blank');
		}
	};

	return (
		<div className={classes.root}>
			<Button
				fullWidth
				size='large'
				color='primary'
				variant='contained'
				startIcon={<RoomRoundedIcon/>}
				onClick={() => handleSelectResort(resort.latitude, resort.longitude)}
			>
				<Typography className={classes.resortName}>
					{resort.name}
				</Typography>
			</Button>
			<div className={classes.linkContainer}>
				<ButtonGroup color='primary' variant='text' fullWidth size='small'>
					<Button
						fullWidth
						color='primary'
						startIcon={<HomeRoundedIcon/>}
						onClick={(() => {handleOpenUrl(resort.url)})}
						disabled={!resort.url}
					>
						HP
					</Button>
					<Button
						fullWidth
						color='primary'
						startIcon={<VideocamRoundedIcon/>}
						onClick={(() => {handleOpenUrl(resort.live_camera_url)})}
						disabled={!resort.live_camera_url}
					>
						Live
					</Button>
				</ButtonGroup>
			</div>
			<div className={classes.forecastContainer}>
				<ForecastView details={forecast.forecast_details}/>
			</div>
		</div>
	);
};

export default ResortView;
