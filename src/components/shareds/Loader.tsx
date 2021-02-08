import React from 'react';
import {makeStyles, Theme} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import {ReactComponent as WcIcon} from '../../icon.svg';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100vw',
		height: '100vh',
		margin: theme.spacing(0),
		position: 'absolute',
		zIndex: 9999,
		backgroundColor: 'rgba(128, 128, 128, 0.5)',
	},
	loadingContainer: {
		width: '100%',
		height: '100%',
		position: 'relative',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	wcIcon: {
		width: '40px',
		height: '40px',
		position: 'absolute',
	},
	progress: {
		position: 'absolute',
		color: theme.palette.primary.light,
	},
}));

type Props = {
	show: boolean;
}

const Loader: React.FC<Props> = ({show}: Props) => {
	const classes = useStyles();

	return (
		<>
			{show && (
				<div className={classes.root}>
					<div className={classes.loadingContainer}>
						<WcIcon className={classes.wcIcon}/>
						<CircularProgress size={74} className={classes.progress}/>
					</div>
				</div>
			)}
		</>
	);
};

export default Loader;
