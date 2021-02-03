import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../app/store';
import {updateCenter} from '../resortMapSlice';
import {makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import {OBSERVATORY} from '../resortTypes';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SettingsEthernetRoundedIcon from '@material-ui/icons/SettingsEthernetRounded';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import {Bar} from 'react-chartjs-2';

type TabPanelProps = {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
};

const TabPanel: React.FC<TabPanelProps> = ({children, index, value, ...other}: TabPanelProps) => {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box style={{paddingTop: 8, paddingBottom: 8}}>
					{children}
				</Box>
			)}
		</div>
	);
};

const a11yProps = (index: any) => {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
};

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
	},
	obsName: {
		fontSize: theme.typography.pxToRem(12),
	},
	tabRoot: {
		width: '100%',
	},
	barChart: {
		width: '100%',
	},
	distanceContainer: {
		display: 'flex',
	},
	distanceIcon: {
		margin: '4px 4px 4px 24px',
	},
	distance: {
		margin: 4,
	},
	snowDepthContainer: {
		display: 'flex',
	},
	snowDepth: {
		margin: 4,
	},
	tempContainer: {
		display: 'flex',
	},
	temp: {
		margin: 4,
	}
}));

type Props = {
	observatory: OBSERVATORY;
};

const ObservatoryView: React.FC<Props> = ({observatory}: Props) => {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch: AppDispatch = useDispatch();
	const handleSelectObs = (lat: string, lon: string) => {
		dispatch(updateCenter({latitude: lat, longitude: lon}));
	};

	const [tabValue, setTabValue] = useState(0);
	const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setTabValue(newValue);
	};
	const handleTabChangeIndex = (index: number) => {
		setTabValue(index);
	};

	const snowfall = observatory.observatory_snowfall;
	const snowfall_data = {
		labels: ['3h', '6h', '12h', '24h', '48h', '72h'],
		datasets: [
			{
				label: '時間ごとの降雪量',
				data: [
					snowfall ? Number(snowfall.snowfall_3h) : 0,
					snowfall ? Number(snowfall.snowfall_6h) : 0,
					snowfall ? Number(snowfall.snowfall_12h) : 0,
					snowfall ? Number(snowfall.snowfall_24h) : 0,
					snowfall ? Number(snowfall.snowfall_48h) : 0,
					snowfall ? Number(snowfall.snowfall_72h) : 0,
				],
				backgroundColor: 'rgba(131, 204, 210, 0.5)',
				borderColor: 'rgba(131, 204, 210, 1)',
				borderWidth: 1,
			},
		],
	};

	const rainfall = observatory.observatory_rainfall;
	const rainfall_data = {
		labels: ['3h', '6h', '12h', '24h', '48h', '72h'],
		datasets: [
			{
				label: '時間ごとの降水量',
				data: [
					rainfall ? Number(rainfall.rainfall_3h) : 0,
					rainfall ? Number(rainfall.rainfall_6h) : 0,
					rainfall ? Number(rainfall.rainfall_12h) : 0,
					rainfall ? Number(rainfall.rainfall_24h) : 0,
					rainfall ? Number(rainfall.rainfall_48h) : 0,
					rainfall ? Number(rainfall.rainfall_72h) : 0,
				],
				backgroundColor: 'rgba(54, 162, 235, 0.5)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
			},
		],
	};

	const options = (x_label: string | null, y_label: string | null) => {
		return {
			scales: {
				xAxes: [
					{
						scaleLabel: {
							display: !!x_label,
							labelString: x_label ?? '',
						},
					},
				],
				yAxes: [
					{
						scaleLabel: {
							display: !!y_label,
							labelString: y_label ?? '',
						},
						ticks: {
							beginAtZero: true,
						},
					},
				],
			},
		}
	};

	const snow_depth = observatory.observatory_snow_depth;
	const temperature = observatory.observatory_temperature;

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={6}>
					<Button
						fullWidth
						size='medium'
						color='secondary'
						variant='outlined'
						startIcon={<RoomRoundedIcon/>}
						onClick={() => handleSelectObs(observatory.latitude, observatory.longitude)}
					>
						<Typography className={classes.obsName}>
							{observatory.name}
						</Typography>
					</Button>
				</Grid>
				<Grid item xs={6}>
					<div className={classes.distanceContainer}>
						<SettingsEthernetRoundedIcon fontSize='default' className={classes.distanceIcon}/>
						<div className={classes.distance}>
							約{observatory.distance}km
						</div>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div className={classes.tempContainer}>
						<div className={classes.temp}>
							<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-temperature"
								 width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50"
								 fill="none"
								 stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								<path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5"/>
								<line x1="10" y1="9" x2="14" y2="9"/>
							</svg>
						</div>
						<div className={classes.temp}>
							<span>
								本日の最高：{!!temperature ? temperature.highest : ' - '}℃ /
								最低：{!!temperature ? temperature.lowest : ' - '}℃
							</span>
						</div>
					</div>
					<div className={classes.snowDepthContainer}>
						<div className={classes.snowDepth}>
							<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-snowflake"
								 width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50"
								 fill="none"
								 stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								<path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72"/>
								<path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(60 12 12)"/>
								<path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(120 12 12)"/>
								<path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(180 12 12)"/>
								<path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(240 12 12)"/>
								<path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(300 12 12)"/>
							</svg>
						</div>
						<div className={classes.snowDepth}>
							<span>
								現在の積雪：{!!snow_depth ? snow_depth.snow_depth : ' - '}cm
								({!!snow_depth ? snow_depth.observed_at.replace(/-/g, '/') : ''})
							</span>
						</div>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div className={classes.tabRoot}>
						<Tabs
							value={tabValue}
							onChange={handleTabChange}
							indicatorColor='primary'
							textColor='primary'
							variant='fullWidth'
							aria-label='full width tabs'
						>
							<Tab label='降雪量' {...a11yProps(0)}/>
							<Tab label='降水量' {...a11yProps(1)}/>
						</Tabs>
						<SwipeableViews
							axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
							index={tabValue}
							onChangeIndex={handleTabChangeIndex}
						>
							<TabPanel value={tabValue} index={0} dir={theme.direction}>
								<div className={classes.barChart}>
									<Bar data={snowfall_data} options={options(null, 'cm')}/>
								</div>
							</TabPanel>
							<TabPanel value={tabValue} index={1} dir={theme.direction}>
								<div className={classes.barChart}>
									<Bar data={rainfall_data} options={options(null, 'mm')}/>
								</div>
							</TabPanel>
						</SwipeableViews>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default ObservatoryView;
