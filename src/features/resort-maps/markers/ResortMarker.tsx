import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Marker, Popup} from 'react-map-gl';
import {Theme, makeStyles} from '@material-ui/core/styles';
import {RESORT} from '../resortTypes';
import {selectCenter} from '../resortMapSlice';
import {isMobileOnly} from "react-device-detect";
import {Button} from "@material-ui/core";

const MARKER_SIZE = 16;
const MARKER_SIZE_HALF = MARKER_SIZE / 2;

type Props = {
	resort: RESORT;
}

const useStyles = makeStyles((theme: Theme) => ({
	resortMarker: {
		backgroundColor: '#e74c3c',
		borderRadius: '50%',
		width: MARKER_SIZE,
		height: MARKER_SIZE,
		cursor: 'pointer',
		boxShadow: '0 0px 3px 0 rgba(0, 0, 0, 0.6)'
	},
	resortName: {
		margin: '8px 8px 3px',
		color: theme.palette.primary.main,
		fontWeight: 'bold',
	},
	detailButton: {
		margin: '8px 0px 0px 0px'
	},
}));

const ResortMarker: React.FC<Props> = ({resort}: Props) => {
	const classes = useStyles();

	const [showPopup, setShowPopup] = useState(true);
	const center = useSelector(selectCenter);

	useEffect(() => {
		if (
			center.latitude === resort.latitude
			&&
			center.longitude === resort.longitude
		) {
			setShowPopup(true);
		}
	}, [center, resort])

	const handleDetail = () => {
		window.location.href = `/details?resort=${resort.id}`;
	}

	return (
		<>
			<Marker
				longitude={Number(resort.longitude)}
				latitude={Number(resort.latitude)}
				offsetTop={-MARKER_SIZE_HALF}
				offsetLeft={-MARKER_SIZE_HALF}
			>
				<div className={classes.resortMarker} onClick={() => setShowPopup(!showPopup)}/>
			</Marker>
			{showPopup && (
				<Popup
					longitude={Number(resort.longitude)}
					latitude={Number(resort.latitude)}
					closeButton={true}
					closeOnClick={false}
					onClose={() => setShowPopup(!showPopup)}
					offsetTop={0}
					offsetLeft={0}
					sortByDepth={true}
				>
					<div className={classes.resortName}>{resort.name}</div>
					{isMobileOnly && (
						<Button
							fullWidth
							variant="outlined"
							color="primary"
							size='small'
							className={classes.detailButton}
							onClick={handleDetail}
						>
							詳細
						</Button>
					)}
				</Popup>
			)}
		</>
	);
};

export default ResortMarker;
