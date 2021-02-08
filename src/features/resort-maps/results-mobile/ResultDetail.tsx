import React, {useEffect} from 'react';
import {makeStyles, Theme} from "@material-ui/core";
import ResortViewMobile from "./ResortViewMobile";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {AppDispatch} from "../../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {
	createForecast,
	getObservatories,
	getResortById,
	showLoader,
	hideLoader,
	selectForecast,
	selectObservatories,
	selectResort
} from "../resortMapSlice";
import ObservatoryViewMobile from "./ObservatoryViewMobile";
import Toolbar from "@material-ui/core/Toolbar";
import {ReactComponent as Icon} from "../../../icon.svg";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
	appBar: {
		padding: theme.spacing(0),
	},
	grow: {
		flexGrow: 1,
	},
	wcIconMobile: {
		width: '34px',
		height: '40px',
		cursor: 'pointer',
	},
	backButton: {
		padding: '0px',
	},
	mobileMenuBack: {
		color: '#FFFFFF',
	},
	obsTitle: {
		padding: '8px',
	}
}));

type Props = {
	resortId: string | null;
};

const ResultDetail: React.FC<Props> = ({resortId}: Props) => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	const resort = useSelector(selectResort);
	const observatories = useSelector(selectObservatories);
	const forecast = useSelector(selectForecast);

	useEffect(() => {
		const execute = async () => {
			if (resortId) {
				await dispatch(showLoader());
				await dispatch(getResortById(resortId));
				await dispatch(getObservatories(resortId));
				await dispatch(createForecast({resort: resortId}));
				await dispatch(hideLoader());
			} else {
				window.location.href = '/';
			}
		}
		execute().then().catch();
	}, [dispatch, resortId])

	const handleIconMobile = () => {
		window.location.href = '/';
	};

	const handleBack = () => {
		window.history.back();
	};

	return (
		<div>
			<AppBar position='static' className={classes.appBar}>
				<Toolbar>
					<IconButton
						className={classes.backButton}
						aria-label='back'
						onClick={handleBack}
					>
						<ArrowBackIosRoundedIcon className={classes.mobileMenuBack}/>
					</IconButton>
					<div className={classes.grow}/>
					<Icon className={classes.wcIconMobile} onClick={handleIconMobile}/>
					<div className={classes.grow}/>
					<div style={{width: '24px'}}/>
				</Toolbar>
			</AppBar>
			{(resort && forecast) && (
				<ResortViewMobile resort={resort} forecast={forecast}/>
			)}
			<Divider/>
			{observatories && (
				<>
					<div className={classes.obsTitle}>
						<Typography
							align='center'
							color='secondary'
						>
							アメダス観測所
						</Typography>
					</div>
					<List>
						{observatories.map((obs) => (
								<>
									<ListItem key={obs.id}>
										<ObservatoryViewMobile observatory={obs}/>
									</ListItem>
									<Divider/>
								</>
							)
						)}
					</List>
				</>
			)}

		</div>
	);
};

export default ResultDetail;
