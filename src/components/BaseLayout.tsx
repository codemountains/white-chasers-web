import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {ReactComponent as HeaderLogo} from '../logo-long-white.svg';
import ScrollTopper from "./shareds/ScrollTopper";
import SideMenu from "./menus/SideMenu";
import {isMobileOnly} from "react-device-detect";
import {ReactComponent as Icon} from "../icon.svg";

const useStyles = makeStyles(() => ({
	headerLogo: {
		width: '272px',
		height: '36px',
		margin: '0px 8px',
		cursor: 'pointer',
	},
	grow: {
		flexGrow: 1,
	},
	wcIconMobile: {
		width: '34px',
		height: '40px',
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
					<SideMenu whiteMenu={true}/>
					{isMobileOnly ?
						(
							<>
								<div className={classes.grow}/>
								<Icon className={classes.wcIconMobile} onClick={handleClick}/>
								<div className={classes.grow}/>
								<div style={{width: '24px', padding: '10px'}}/>
							</>
						)
						:
						(
							<HeaderLogo className={classes.headerLogo} onClick={handleClick}/>
						)
					}
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
