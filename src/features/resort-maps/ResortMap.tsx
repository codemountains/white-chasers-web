import React, {useState, useEffect} from 'react';
import {withCookies, useCookies} from 'react-cookie';
import {useSelector, useDispatch} from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Theme, makeStyles} from '@material-ui/core/styles';
import ReactMapGL, {NavigationControl, ScaleControl} from 'react-map-gl';
import ResortMapSearch from './ResortMapSearch';
import {AppDispatch} from '../../app/store';
import {
	getObservatories,
	getResortOption,
	getResortById,
	createForecast,
	selectOptions,
	selectResort,
	selectObservatories,
	selectCenter, selectForecast
} from './resortMapSlice';
import ResortMarker from './markers/ResortMarker';
import ObservatoryMarker from './markers/ObservatoryMarker';
import {isMobileOnly} from 'react-device-detect';

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAPBOX_STYLE_URL = process.env.REACT_APP_MAPBOX_STYLE_URL;

const useStyles = makeStyles((theme: Theme) => ({
	navigation: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(2),
	},
	navigationMobile: {
		position: 'absolute',
		top: theme.spacing(8),
		right: theme.spacing(1),
	},
	scaleRuler: {
		position: 'absolute',
		bottom: theme.spacing(5),
		right: theme.spacing(2)
	},
}));

const ResortMap: React.FC = () => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	const resort = useSelector(selectResort);
	const options = useSelector(selectOptions);
	const observatories = useSelector(selectObservatories);
	const center = useSelector(selectCenter);
	const forecast = useSelector(selectForecast);

	const [cookie, setCookie, removeCookie] = useCookies(['resort_id']);
	const [viewport, setViewport] = useState({
		latitude: Number(center.latitude),
		longitude: Number(center.longitude),
		zoom: 11.5,
		bearing: 0,
		pitch: 0
	});
	const xAxis = isMobileOnly ? 0.02 : 0;
	const yAxis = isMobileOnly ? 0 : 0.04;

	useEffect(() => {
		dispatch(getResortOption());
		const cookie_resort_id = cookie['resort_id'];
		if (typeof cookie_resort_id !== 'undefined') {
			dispatch(getResortById(cookie_resort_id));
			dispatch(createForecast({resort: cookie_resort_id}));
		}
	}, [cookie, dispatch])

	useEffect(() => {
		if (resort) {
			dispatch(getObservatories(resort.id));
			dispatch(createForecast({resort: resort.id}));
			setCookie('resort_id', resort.id);
			setViewport({
				latitude: Number(center.latitude) - xAxis,
				longitude: Number(center.longitude) - yAxis,
				zoom: 11.5,
				bearing: 0,
				pitch: 0
			});
		}
		else {
			removeCookie('resort_id');
		}
	}, [dispatch, center, resort, xAxis, yAxis, setCookie, removeCookie]);

	return (
		<>
			<div>
				<ResortMapSearch
					options={options}
					resort={resort}
					forecast={forecast}
					observatories={observatories}
				/>
			</div>
			<ReactMapGL
				{...viewport}
				mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
				mapStyle={MAPBOX_STYLE_URL}
				onViewportChange={nextViewport => setViewport(nextViewport)}
				width='100vw'
				height='100vh'
			>
				{isMobileOnly ?
					(
						<div className={classes.navigationMobile}>
							<NavigationControl/>
						</div>
					)
					:
					(
						<>
							<div className={classes.navigation}>
								<NavigationControl/>
							</div>
							<div className={classes.scaleRuler}>
								<ScaleControl maxWidth={100} unit='metric'/>
							</div>
						</>
					)
				}
				{resort && (
					<>
						<ResortMarker resort={resort}/>
					</>
				)}
				{observatories && (
					observatories.map((obs) => (
						<ObservatoryMarker observatory={obs} key={obs.id}/>
					))
				)}
			</ReactMapGL>
		</>
	);
};

export default withCookies(ResortMap);
