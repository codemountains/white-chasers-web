import React, {useState, useEffect} from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {CENTER_POINT, FORECAST, OBSERVATORY, RESORT, RESORT_OPTION} from './resortTypes';
import {AppDispatch} from '../../app/store';
import {useDispatch} from 'react-redux';
import {
	createForecast,
	getObservatories,
	getObservatoriesByCenter,
	getResortById,
	resetResort,
	showLoader,
	hideLoader
} from './resortMapSlice';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import ResortView from './results/ResortView';
import ObservatoryView from './results/ObservatoryView';
import {isMobileOnly} from 'react-device-detect';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import {ReactComponent as Icon} from '../../icon.svg';
import SideMenu from "../../components/menus/SideMenu";
import Button from "@material-ui/core/Button";

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
	},
	grow: {
		flexGrow: 1,
	},
	mobileSearchBoxContainer: {
		margin: theme.spacing(0.5, 1.5, 1.5, 1.5),
	},
	wcLogo: {
		width: '100%',
		height: '72px',
		cursor: 'pointer'
	},
	areaSearchRoot: {
		width: '100%',
		position: 'absolute',
		zIndex: 90,
		textAlign: 'center',
	},
	areaSearch: {
		margin: theme.spacing(1.5)
	},
	areaSearchMobile: {
		marginTop: '62px',
	}
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
	center: CENTER_POINT;
};

type ResultAnchor = 'left' | 'bottom';

const ResortMapSearch: React.FC<Props> = ({options, resort, observatories, forecast, center}: Props) => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	const [selectedOption, setSelectedOption] = useState<RESORT_OPTION | null>(null);
	const [areaSearch, setAreaSearch] = useState<boolean>(false);

	const resultAnchor: ResultAnchor = isMobileOnly ? 'bottom' : 'left';

	useEffect(() => {
		if (resort) {
			const option = options.find(opt => opt.id === resort.id);
			if (option) {
				setSelectedOption(option);
			}
		}
	}, [options, resort])

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
				await setAreaSearch(false);
				await dispatch(getResortById(value.id));
				await dispatch(createForecast({resort: value.id}));
				await dispatch(getObservatories(value.id));
				if (isMobileOnly) {
					await setIsOpenSearchBox(!isOpenSearchBox);
				}
			} else {
				await setAreaSearch(false);
				await dispatch(resetResort());
			}
			await dispatch(hideLoader());
		}
		change().then().catch();
	};

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
	};

	const handleSearchArea = () => {
		const change = async () => {
			await setAreaSearch(true);
			await dispatch(showLoader());
			await dispatch(getObservatoriesByCenter({
				latitude: center.latitude,
				longitude: center.longitude,
				distance: 40
			}))
			await dispatch(hideLoader());
		}
		change().then().catch();
	};

	return (
		<>
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor={resultAnchor}
				open={!!resort || !!observatories}
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
											<ObservatoryView observatory={obs} showDistance={!areaSearch}/>
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
							<SideMenu whiteMenu={false}/>
							<Divider className={classes.divider} orientation='vertical'/>
							<Icon className={classes.wcIcon}/>
							{searchBox}
						</Paper>
						<div className={classes.areaSearchRoot}>
							<Button
								variant='contained'
								color='secondary'
								className={classes.areaSearch}
								startIcon={<SearchIcon/>}
								onClick={handleSearchArea}
							>
								このエリアのアメダス観測所を検索
							</Button>
						</div>
					</div>
				)
				:
				(
					<>
						<AppBar className={classes.appBar}>
							<Toolbar>
								<SideMenu whiteMenu={true}/>
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
						<div className={classes.areaSearchRoot}>
							<Button
								variant='contained'
								color='secondary'
								className={classes.areaSearchMobile}
								startIcon={<SearchIcon/>}
								onClick={handleSearchArea}
							>
								このエリアのアメダス観測所を検索
							</Button>
						</div>
					</>
				)
			}
		</>
	);
};

export default ResortMapSearch;
