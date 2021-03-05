import React, {useState, useEffect} from 'react';
import {withCookies, useCookies} from 'react-cookie';
import {useSelector, useDispatch} from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Theme, makeStyles} from '@material-ui/core/styles';
import ReactMapGL, {NavigationControl, ScaleControl} from 'react-map-gl';
import ResortMapSearch from './ResortMapSearch';
import {AppDispatch} from '../../app/store';
import {
	getResortOption,
	getResortById,
	createForecast,
	getObservatories,
	showLoader,
	hideLoader,
	selectOptions,
	selectResort,
	selectObservatories,
	selectCenter,
	selectForecast
} from './resortMapSlice';
import ResortMarker from './markers/ResortMarker';
import ObservatoryMarker from './markers/ObservatoryMarker';
import {isMobileOnly} from 'react-device-detect';

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAPBOX_STYLE_URL = process.env.REACT_APP_MAPBOX_STYLE_URL;
const KEY_WC_RESORT = 'wc_resort';

const useStyles = makeStyles((theme: Theme) => ({
	navigation: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(2),
	},
	navigationMobile: {
		position: 'fixed',
		top: theme.spacing(8),
		right: theme.spacing(1),
	},
	scaleRuler: {
		position: 'absolute',
		bottom: theme.spacing(5),
		right: theme.spacing(2)
	},
}));

type Props = {
	resortId: string | null;
}

const ResortMap: React.FC<Props> = ({resortId}: Props) => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	const resort = useSelector(selectResort);
	const options = useSelector(selectOptions);
	const observatories = useSelector(selectObservatories);
	const center = useSelector(selectCenter);
	const forecast = useSelector(selectForecast);

	const [cookies, setCookie, removeCookie] = useCookies([KEY_WC_RESORT]);

	const [viewport, setViewport] = useState({
		latitude: Number(center.latitude),
		longitude: Number(center.longitude),
		zoom: 11.5,
		bearing: 0,
		pitch: 0
	});
	const xAxis = isMobileOnly ? -0.01 : 0;
	const yAxis = isMobileOnly ? 0 : 0.04;

	useEffect(() => {
		const init = async (resort_id: string | null) => {
			await dispatch(showLoader());
			await dispatch(getResortOption());
			if (resort_id) {
				await dispatch(getResortById(resort_id));
				await dispatch(createForecast({resort: resort_id}));
				await dispatch(getObservatories(resort_id));
			}
			await dispatch(hideLoader());
		};

		if (resortId) {
			init(resortId).then().catch();
		} else {
			const wc_resort = cookies[KEY_WC_RESORT];
			if (typeof wc_resort !== 'undefined') {
				init(wc_resort).then().catch();
			} else {
				init(null).then().catch();
			}
		}
		// cookiesを除外
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch])

	useEffect(() => {
		setViewport({
			latitude: Number(center.latitude) - xAxis,
			longitude: Number(center.longitude) - yAxis,
			zoom: 11.5,
			bearing: 0,
			pitch: 0
		});

		if (resort) {
			setCookie(KEY_WC_RESORT, resort.id);
		} else {
			removeCookie(KEY_WC_RESORT);
		}
	}, [center, removeCookie, resort, setCookie, xAxis, yAxis]);

	return (
		<>
			<ResortMapSearch
				options={options}
				resort={resort}
				forecast={forecast}
				observatories={observatories}
				center={{latitude: String(viewport.latitude), longitude: String(viewport.longitude)}}
			/>
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

// @ts-ignore
export default withCookies(ResortMap);
