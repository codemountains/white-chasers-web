import React from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {ReactComponent as HeaderLogo} from '../logo-long-white.svg';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	headerLogo: {
		width: '284px',
		height: '52px',
		margin: '0px 8px',
		cursor: 'pointer',
	},
}));

type Props = {
	window?: () => Window;
	children: React.ReactElement;
}

const ScrollTop: React.FC<Props> = (props: Props) => {
	const {children, window} = props;
	const classes = useStyles();

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
			'#back-to-top-anchor',
		);

		if (anchor) {
			anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
		}
	};

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role='presentation' className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
}

const BaseLayout: React.FC<Props> = (props: Props) => {
	const classes = useStyles();

	const handleClick = () => {
		window.location.href = `/`;
	};

	return (
		<>
			<CssBaseline/>
			<AppBar>
				<Toolbar>
					<HeaderLogo className={classes.headerLogo} onClick={handleClick}/>
				</Toolbar>
			</AppBar>
			<Toolbar id='back-to-top-anchor'/>
			{props.children}
			<ScrollTop {...props}>
				<Fab color='secondary' size='small' aria-label='scroll back to top'>
					<KeyboardArrowUpIcon/>
				</Fab>
			</ScrollTop>
		</>
	);
};

export default BaseLayout;
