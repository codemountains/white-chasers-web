import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {FORECAST, RESORT} from '../resortTypes';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ForecastViewMobile from './ForecastViewMobile';


const useStyles = makeStyles((theme: Theme) => ({
	root: {
		margin: theme.spacing(1),
	},
	resortNameContainer: {
		margin: theme.spacing(1),
	},
	resortName: {
		fontSize: theme.typography.pxToRem(20),
		fontWeight: 'bold',
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

const ResortViewMobile: React.FC<Props> = ({resort, forecast}: Props) => {
	const classes = useStyles();

	const handleOpenUrl = (url: string | null) => {
		if (url) {
			window.open(url, '_blank');
		}
	};


	return (
		<>
			<div className={classes.root}>
				<div className={classes.resortNameContainer}>
					<Typography
						color='primary'
						align='center'
						className={classes.resortName}
					>
						{resort.name}
					</Typography>
				</div>
				<div className={classes.linkContainer}>
					<ButtonGroup color='primary' variant='text' fullWidth size='small'>
						<Button
							fullWidth
							color='primary'
							startIcon={<HomeRoundedIcon/>}
							onClick={(() => {
								handleOpenUrl(resort.url)
							})}
							disabled={!resort.url}
						>
							HP
						</Button>
						<Button
							fullWidth
							color='primary'
							startIcon={<VideocamRoundedIcon/>}
							onClick={(() => {
								handleOpenUrl(resort.live_camera_url)
							})}
							disabled={!resort.live_camera_url}
						>
							Live
						</Button>
					</ButtonGroup>
				</div>
				<div className={classes.forecastContainer}>
					<ForecastViewMobile details={forecast.forecast_details}/>
				</div>
			</div>
		</>
	);
};

export default ResortViewMobile;
