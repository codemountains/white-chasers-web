import React, {useState} from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';
import {useLocation} from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {ReactComponent as Logo} from '../../logo.svg';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AcUnitRoundedIcon from '@material-ui/icons/AcUnitRounded';
import CompareRoundedIcon from '@material-ui/icons/CompareRounded';
import {Typography} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import {isIOS} from "react-device-detect";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const useStyles = makeStyles((theme: Theme) => ({
	list: {
		width: 300,
	},
	mainLabel: {
		fontSize: 18,
		color: theme.palette.primary.main
	},
	secondLabel: {
		fontSize: 14,
		color: theme.palette.secondary.main
	},
	wcLogo: {
		width: '100%',
		height: '72px',
		cursor: 'pointer'
	},
	iconButton: {
		padding: 8,
	},
	whiteMenuIcon: {
		color: '#FFFFFF',
	},
}));

type Props = {
	whiteMenu: boolean;
}

const SideMenu: React.FC<Props> = ({whiteMenu}: Props) => {
	const classes = useStyles();

	const location = useLocation();
	const [openMenu, setOpenMenu] = useState(false);
	const toggleDrawer = (open: boolean) => (
		event: React.KeyboardEvent | React.MouseEvent
	) => {
		if (
			event &&
			event.type === 'keydown' &&
			(
				(event as React.KeyboardEvent).key === 'Tab'
				|| (event as React.KeyboardEvent).key === 'Shift'
			)
		) {
			return;
		}
		setOpenMenu(open);
	};

	const goToAbout = () => {
		window.location.href = '/about';
	};

	const goToMap = () => {
		if (location.pathname !== '/') {
			window.location.href = '/';
		} else {
			setOpenMenu(false);
		}
	};

	const goToForecasts = () => {
		if (location.pathname !== '/forecasts') {
			window.location.href = '/forecasts';
		} else {
			setOpenMenu(false);
		}
	}

	const menuList = (
		<div
			className={classes.list}
			role='presentation'
		>
			<List>
				<ListItem
					button
					onClick={goToMap}
					onKeyDown={goToMap}
				>
					<Logo className={classes.wcLogo}/>
				</ListItem>
				<ListItem
					button
					onClick={goToAbout}
					onKeyDown={goToAbout}
				>
					<ListItemText primary='About' secondary='WHITE CHASERSについて'/>
				</ListItem>
			</List>
			<Divider/>
			<List>
				<ListItem
					button
					onClick={goToMap}
					onKeyDown={goToMap}
				>
					<ListItemIcon>
						<AcUnitRoundedIcon color='primary'/>
					</ListItemIcon>
					<ListItemText
						primary={<Typography className={classes.mainLabel}>スキー場検索</Typography>}
						secondary={<Typography className={classes.secondLabel}>天気予報・降雪情報をチェック</Typography>}
					/>
				</ListItem>
				<ListItem
					button
					onClick={goToForecasts}
					onKeyDown={goToForecasts}
				>
					<ListItemIcon>
						<CompareRoundedIcon color='primary'/>
					</ListItemIcon>
					<ListItemText
						primary={<Typography className={classes.mainLabel}>天気予報比較</Typography>}
						secondary={<Typography className={classes.secondLabel}>スキー場の天気予報を比較</Typography>}
					/>
				</ListItem>
			</List>
		</div>
	);

	return (
		<>
			<IconButton
				className={classes.iconButton}
				aria-label='menu'
				onClick={toggleDrawer(!openMenu)}
			>
				{whiteMenu ?
					(<MenuRoundedIcon className={classes.whiteMenuIcon}/>)
					:
					(<MenuRoundedIcon color='secondary'/>)
				}
			</IconButton>
			<SwipeableDrawer
				anchor='left'
				open={openMenu}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
				disableBackdropTransition={!isIOS}
				disableDiscovery={isIOS}
			>
				{menuList}
			</SwipeableDrawer>
		</>
	);
};

export default SideMenu;
