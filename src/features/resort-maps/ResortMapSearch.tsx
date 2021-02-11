import React, {useState, useEffect} from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {FORECAST, OBSERVATORY, RESORT, RESORT_OPTION} from './resortTypes';
import {AppDispatch} from '../../app/store';
import {useDispatch} from 'react-redux';
import {createForecast, getObservatories, getResortById, resetResort, showLoader, hideLoader} from './resortMapSlice';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AcUnitRoundedIcon from '@material-ui/icons/AcUnitRounded';
import Drawer from '@material-ui/core/Drawer';
import ResortView from './results/ResortView';
import ObservatoryView from './results/ObservatoryView';
import {Typography} from '@material-ui/core';
import {isMobileOnly, isIOS} from 'react-device-detect';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import AppBar from '@material-ui/core/AppBar';
import {ReactComponent as Icon} from '../../icon.svg';
import {ReactComponent as Logo} from '../../logo.svg';

const SEARCH_BOX_WIDTH = 430;
const DRAWER_WIDTH = 468;

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: SEARCH_BOX_WIDTH,
		position: 'absolute',
		zIndex: 100,
		margin: theme.spacing(1)
	},
	input: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		flex: 1,
	},
	inputTextField: {
		'& div': {
			backgroundColor: '#FFFFFF',
		},
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	wcIcon: {
		width: '34px',
		height: '40px',
		marginLeft: theme.spacing(0.5),
	},
	wcIconMobile: {
		width: '34px',
		height: '40px',
		cursor: 'pointer',
	},
	list: {
		width: 300,
	},
	drawer: {
		width: DRAWER_WIDTH,
		flexShrink: 0,
		position: 'absolute',
		zIndex: 99,
	},
	drawerPaper: {
		width: DRAWER_WIDTH,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	mainLabel: {
		fontSize: 18,
		color: theme.palette.primary.main
	},
	secondLabel: {
		fontSize: 14,
		color: theme.palette.secondary.main
	},
	obsTitle: {
		margin: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.primary.main,
	},
	appBar: {
		padding: 0,
		// position: 'absolute',
		// zIndex: 100,
	},
	grow: {
		flexGrow: 1,
	},
	mobileMenuIcon: {
		color: '#FFFFFF',
	},
	mobileSearchBoxContainer: {
		margin: theme.spacing(0.5, 1.5, 1.5, 1.5),
	},
	wcLogo: {
		width: '100%',
		height: '72px',
		cursor: 'pointer'
	},
}));

const optionLabel = (name: string, kana: string | null): string => {
	if (kana) {
		return `${name} (${kana})`;
	}
	return name;
};

type Props = {
	options: RESORT_OPTION[];
	resort: RESORT | null;
	forecast: FORECAST | null;
	observatories: OBSERVATORY[] | null;
};

type ResultAnchor = 'left' | 'bottom';

const ResortMapSearch: React.FC<Props> = ({options, resort, observatories, forecast}: Props) => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	const [selectedOption, setSelectedOption] = useState<RESORT_OPTION | null>(null);
	const [openMenu, setOpenMenu] = useState(false);

	const resultAnchor: ResultAnchor = isMobileOnly ? 'bottom' : 'left';

	useEffect(() => {
		if (resort) {
			const option = options.find(opt => opt.id === resort.id);
			if (option) {
				setSelectedOption(option);
			}
		}
	}, [options, resort])

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

	const handleAbout = () => {
		toggleDrawer(false);
		window.location.href = '/about';
	};

	const menuList = (
		<div
			className={classes.list}
			role='presentation'
		>
			<List>
				<ListItem>
					<Logo className={classes.wcLogo} onClick={toggleDrawer(false)}/>
				</ListItem>
				<ListItem
					button
					onClick={handleAbout}
					onKeyDown={handleAbout}
				>
					<ListItemText primary='About' secondary='WHITE CHASERSについて'/>
				</ListItem>
			</List>
			<Divider/>
			<List>
				<ListItem
					button
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
				>
					<ListItemIcon>
						<AcUnitRoundedIcon color='primary'/>
					</ListItemIcon>
					<ListItemText
						primary={<Typography className={classes.mainLabel}>スキー場検索</Typography>}
						secondary={<Typography className={classes.secondLabel}>天気予報・降雪情報をチェック</Typography>}
					/>
				</ListItem>
			</List>
		</div>
	);

	const mobileSearchBoxId = 'mobile-header-search-box';
	const [isOpenSearchBox, setIsOpenSearchBox] = useState(false);
	const handleSearchBoxOpen = () => {
		setIsOpenSearchBox(!isOpenSearchBox);
	};

	const handleChange = (value: RESORT_OPTION | null) => {
		const change = async () => {
			await dispatch(showLoader());
			await setSelectedOption(value);
			if (value) {
				await dispatch(getResortById(value.id));
				await dispatch(createForecast({resort: value.id}));
				await dispatch(getObservatories(value.id));
				if (isMobileOnly) {
					await setIsOpenSearchBox(!isOpenSearchBox);
				}
			} else {
				await dispatch(resetResort());
			}
			await dispatch(hideLoader());
		}
		change().then().catch();
	};

	const menuSection = (
		<React.Fragment>
			<IconButton
				className={classes.iconButton}
				aria-label='menu'
				onClick={toggleDrawer(!openMenu)}
			>
				{isMobileOnly ?
					(<MenuRoundedIcon className={classes.mobileMenuIcon}/>)
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
		</React.Fragment>
	);

	const searchBox = (
		<Autocomplete
			id='combo-box-ski-resorts'
			className={classes.input}
			options={options}
			groupBy={(option) => (option.prefecture_name)}
			getOptionLabel={(option) => (optionLabel(option.name, null))}
			renderInput={(params) => (
				<TextField
					{...params}
					variant={isMobileOnly ? 'outlined' : 'standard'}
					color={isMobileOnly ? 'secondary' : 'primary'}
					size={isMobileOnly ? 'small' : 'medium'}
					className={classes.inputTextField}
					placeholder='スキー場を検索'
				/>
			)}
			value={selectedOption}
			onChange={(event: any, value: RESORT_OPTION | null) => {
				handleChange(value)
			}}
			noOptionsText='一致するスキー場がありません'
		/>
	);

	const handleIconMobile = () => {
		window.location.href = '/';
	}

	return (
		<>
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor={resultAnchor}
				open={!!resort}
				classes={{
					paper: clsx(classes.drawerPaper)
				}}
			>
				{!isMobileOnly && (
					<>
						<div className={classes.drawerHeader}/>
						{(resort && forecast) && (
							<ResortView resort={resort} forecast={forecast}/>
						)}
						<Divider/>
						<div className={classes.obsTitle}>
							<span>アメダス観測所</span>
						</div>
						<List>
							{observatories && (
								observatories.map((obs) => (
									<>
										<ListItem key={obs.id}>
											<ObservatoryView observatory={obs}/>
										</ListItem>
										<Divider/>
									</>
								))
							)}
						</List>
					</>
				)}

			</Drawer>
			{!isMobileOnly ?
				(
					<div>
						<Paper className={classes.root} elevation={2}>
							{menuSection}
							<Divider className={classes.divider} orientation='vertical'/>
							<Icon className={classes.wcIcon}/>
							{searchBox}
						</Paper>
					</div>
				)
				:
				(
					<AppBar className={classes.appBar}>
						<Toolbar>
							{menuSection}
							<div className={classes.grow}/>
							<Icon className={classes.wcIconMobile} onClick={handleIconMobile}/>
							<div className={classes.grow}/>
							<IconButton
								aria-label='show search box'
								aria-controls={mobileSearchBoxId}
								aria-haspopup='true'
								onClick={handleSearchBoxOpen}
								color='inherit'
							>
								<SearchIcon/>
							</IconButton>
						</Toolbar>
						{
							isOpenSearchBox
							&&
							<div className={classes.mobileSearchBoxContainer}>
								{searchBox}
							</div>
						}
					</AppBar>
				)
			}
		</>
	);
};

export default ResortMapSearch;
