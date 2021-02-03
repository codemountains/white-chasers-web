import React from 'react';
import {FORECAST_DETAIL} from '../resortTypes';
import {makeStyles, Theme} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
	title: {
		color: theme.palette.primary.light,
	},
	titleBar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	cardRoot: {
		margin: theme.spacing(0.4),
		height: '96%',
	},
	cardHeader: {
		padding: theme.spacing(1),
		'& span': {
			fontSize: '1rem',
		},
	},
	cardContent: {
		padding: '0px 8px',
	},
	weatherIcon: {
		width: '34px',
		height: '34px',
		objectFit: 'none'
	},
	gridWeather: {
		padding: '7px',
	},
	weatherDescription: {
		fontSize: '0.94rem',
		marginTop: '8px',
		color: theme.palette.primary.dark
	},
	detailLabel: {
		fontSize: '0.85rem',
	},
	detailImportantLabel: {
		fontSize: '0.9rem',
	},
	detailSnowLabel: {
		fontSize: '0.9rem',
		color: theme.palette.primary.main,
	},
	detailRainLabel: {
		fontSize: '0.9rem',
		color: 'rgba(54, 162, 235, 1)',
	},
	divider: {
		marginTop: '2px',
		marginBottom: '2px',
	},

}));

type Props = {
	details: FORECAST_DETAIL[];
};

const ForecastView: React.FC<Props> = ({details}: Props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<GridList className={classes.gridList} cols={2.4}>
				{details.map((detail) => {
					return (
						<GridListTile key={detail.id} style={{height: 276}}>
							<Card className={classes.cardRoot}>
								<CardHeader
									className={classes.cardHeader}
									title={detail.forecasted_date}
									subheader={detail.forecasted_time}
								/>
								<CardContent className={classes.cardContent}>
									<Grid container spacing={0}>
										<Grid item xs={4}>
											<img
												className={classes.weatherIcon}
												src={`${process.env.PUBLIC_URL}/weathers/${detail.sys}/${detail.weather_icon_name}.png`}
												alt={detail.weather_description}
											/>
										</Grid>
										<Grid item xs={8} className={classes.gridWeather}>
											<span className={classes.weatherDescription}>
												{detail.weather_description}
											</span>
										</Grid>
										<Grid item xs={12}>
											<Divider className={classes.divider}/>
											<span className={classes.detailLabel}>
												気温：{detail.temp} ℃
											</span>
										</Grid>
										<Grid item xs={12}>
											<Divider className={classes.divider}/>
											<span className={classes.detailLabel}>
												風速：{detail.wind_speed} m/s
											</span>
										</Grid>
										<Grid item xs={12}>
											<span className={classes.detailLabel}>
												風向：{detail.wind_deg_name}
											</span>
										</Grid>
										<Grid item xs={12}>
											<Divider className={classes.divider}/>
											<span className={classes.detailImportantLabel}>
												降水確率：{detail.pop} ％
											</span>
										</Grid>
										<Grid item xs={12}>
											<Divider className={classes.divider}/>
											<span className={classes.detailSnowLabel}>
												降雪量：{detail.snow_depth ? detail.snow_depth : ' - '} cm
											</span>
										</Grid>
										<Grid item xs={12}>
											<Divider className={classes.divider}/>
											<span className={classes.detailRainLabel}>
												降水量：{detail.rain ? detail.rain : (detail.snow ? detail.snow : ' - ')} mm
											</span>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</GridListTile>
					)
				})}
			</GridList>
		</div>
	);
};

export default ForecastView;
