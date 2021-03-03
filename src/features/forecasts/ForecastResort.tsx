import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {RESORT} from "./forecastTypes";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import AcUnitRoundedIcon from '@material-ui/icons/AcUnitRounded';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		margin: theme.spacing(1),
	}
}));

type Props = {
	resort: RESORT;
};

const ForecastResort: React.FC<Props> = ({resort}: Props) => {
	const classes = useStyles();

	const handleOpenUrl = (url: string | null) => {
		if (url) {
			window.open(url, '_blank');
		}
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={12} md={4}>
					<div>
						<Typography variant='subtitle2'>
							{resort.prefecture_name}
						</Typography>
						<Typography variant='h6' gutterBottom>
							{resort.name}
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12} md={8}>
					<Grid container spacing={1}>
						<Grid item xs={6} sm={3}>
							<Button
								fullWidth
								variant='outlined'
								color='primary'
								startIcon={<HomeRoundedIcon/>}
								onClick={(() => {handleOpenUrl(resort.url)})}
								disabled={!resort.url}
							>
								HP
							</Button>
						</Grid>
						<Grid item xs={6} sm={3}>
							<Button
								fullWidth
								variant='outlined'
								color='primary'
								startIcon={<VideocamRoundedIcon/>}
								onClick={(() => {handleOpenUrl(resort.live_camera_url)})}
								disabled={!resort.live_camera_url}
							>
								Live
							</Button>
						</Grid>
						<Grid item xs={6} sm={3}>
							<Button
								fullWidth
								variant='contained'
								color='primary'
								disableElevation
								startIcon={<AcUnitRoundedIcon/>}
								onClick={(() => {handleOpenUrl(`${window.location.origin}?resort=${resort.id}`)})}
							>
								降雪状況
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default ForecastResort;
