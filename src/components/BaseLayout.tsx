import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {ReactComponent as HeaderLogo} from '../logo-long-white.svg';
import ScrollTopper from "./shareds/ScrollTopper";

const useStyles = makeStyles(() => ({
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

const BaseLayout: React.FC<Props> = (props: Props) => {
	const classes = useStyles();

	const handleClick = () => {
		window.location.href = `/`;
	};

	const scrollTopperProps = {
		window: props.window,
		children: props.children,
		targetId: 'back-to-top-anchor'
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
			<ScrollTopper {...scrollTopperProps}>
				<Fab color='secondary' size='small' aria-label='scroll back to top'>
					<KeyboardArrowUpIcon/>
				</Fab>
			</ScrollTopper>
		</>
	);
};

export default BaseLayout;
