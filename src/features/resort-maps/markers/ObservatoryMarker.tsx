import React, {useEffect, useState} from 'react';
import {Marker, Popup} from 'react-map-gl';
import {makeStyles} from '@material-ui/core/styles';
import {OBSERVATORY} from '../resortTypes';
import {useSelector} from 'react-redux';
import {selectCenter} from '../resortMapSlice';
import {Typography} from "@material-ui/core";

const MARKER_SIZE = 16;
const MARKER_SIZE_HALF = MARKER_SIZE / 2;

type Props = {
	observatory: OBSERVATORY;
}

const useStyles = makeStyles(() => ({
	observatoryMarker: {
		backgroundColor: 'rgba(26, 196, 210, 1)',
		borderRadius: '50%',
		width: MARKER_SIZE,
		height: MARKER_SIZE,
		cursor: 'pointer',
		boxShadow: '0 0px 3px 0 rgba(0, 0, 0, 0.6)'
	},
	observatoryPopup: {
		marginTop: '5px',
		color: 'rgba(26, 196, 210, 1)',
		fontSize: '12px',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	observatoryName: {
		fontSize: '14px',
	}
}));

const ObservatoryMarker: React.FC<Props> = ({observatory}: Props) => {
	const classes = useStyles();
	const snowfall = observatory.observatory_snowfall;

	const [showPopup, setShowPopup] = useState(true);
	const center = useSelector(selectCenter);

	useEffect(() => {
		if (
			center.latitude === observatory.latitude
			&&
			center.longitude === observatory.longitude
		) {
			setShowPopup(true);
		}
	}, [center, observatory])

	return (
		<>
			<Marker
				longitude={Number(observatory.longitude)}
				latitude={Number(observatory.latitude)}
				offsetTop={-MARKER_SIZE_HALF}
				offsetLeft={-MARKER_SIZE_HALF}
			>
				<div className={classes.observatoryMarker} onClick={() => setShowPopup(!showPopup)}/>
			</Marker>
			{showPopup && (
				<Popup
					longitude={Number(observatory.longitude)}
					latitude={Number(observatory.latitude)}
					closeButton={true}
					closeOnClick={false}
					onClose={() => setShowPopup(!showPopup)}
					offsetTop={0}
					offsetLeft={0}
					sortByDepth={true}
				>
					<div className={classes.observatoryPopup}>
						<span className={classes.observatoryName}>{observatory.name}</span><br/>
						{/*{snowfall ? snowfall.snowfall_24h : '0.0'}cm / 24h*/}
						{snowfall ?
							(
								<Typography variant='body2'>
									{snowfall.snowfall_24h}cm / 24h
								</Typography>

							)
							:
							(
								<Typography variant='caption' color='secondary'>
									積雪データなし
								</Typography>
							)
						}
					</div>
				</Popup>
			)}
		</>
	);
};

export default ObservatoryMarker;
