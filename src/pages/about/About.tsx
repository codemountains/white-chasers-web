import React from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ReactComponent as Logo} from '../../logo.svg';
import {ReactComponent as Icon} from '../../icon.svg';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {isMobileOnly} from "react-device-detect";
import Forecast from '../../assets/about/forecast_f.png';
import Temp from '../../assets/about/temp_t.png';
import Depth from '../../assets/about/depth_d.png';
import Snow from '../../assets/about/snow_s.png';
import Rain from '../../assets/about/rain_r.png';
import Footer from "../../components/Footer";

const useStyles = makeStyles((theme: Theme) => ({
	headerContainer: {
		padding: theme.spacing(4),
	},
	mainImageContainer: {
		textAlign: 'center',
	},
	mainImage: {
		width: '65%',
		height: '65%',
	},
	subTitle: {
		margin: theme.spacing(4),
		textAlign: 'center',
		fontSize: '28px',
		fontWeight: 'bold',
		color: theme.palette.primary.dark,
	},
	subText: {
		margin: theme.spacing(2),
		fontSize: '20px',
		color: theme.palette.primary.dark,
	},
	logoContainer: {
		width: '300px',
		height: '100px',
		position: 'absolute',
		top: '10vh',
		left: '12vw'
	},
	mainContainer: {
		width: '100%',
		padding: theme.spacing(0.5),
	},
	title: {
		padding: theme.spacing(0)
	},
	mapImage: {
		width: '100%',
		height: '55vh'
	},
	mainContent: {
		padding: '32px 16px',
		backgroundColor: theme.palette.primary.light,
	},
	contentBlock: {
		padding: theme.spacing(3),
	},
	contentImageContainer: {
		width: '100%',
		margin: '16px 0px',
		textAlign: 'center',
	},
	iconImg: {
		width: '100%',
		height: '72px',
		objectFit: 'contain',
	},
	iconLabel: {
		fontSize: '18px',
		fontWeight: 'bold',
		color: theme.palette.primary.main,
	},
	footer: {
		margin: '96px 0px 0px 0px',
		width: '100%',
		backgroundColor: 'rgb(50, 50, 50)',
	},
	footerContainer: {
		padding: '24px',
	},
	footerLogo: {
		width: '168px',
		height: '52px',
		margin: '0px 8px',
	},
	footerLogoLabel: {
		color: theme.palette.primary.contrastText,
		fontSize: '12px',
	},
	privacyLink: {
		color: '#ffffff',
		fontSize: '12px',
		fontWeight: 'bold',
	},
	copyrightContainer: {
		margin: '48px 0px 0px 0px',
	}
}));



const About: React.FC = () => {
	const classes = useStyles();

	const handleLink = () => {
		window.location.href = '/';
	}

	return (
		<div>
			<Container maxWidth='md' className={classes.headerContainer}>
				<div className={classes.mainImageContainer}>
					<Logo className={classes.mainImage}/>
				</div>
				{!isMobileOnly ?
					(
						<>
							<Typography variant='h2' component='h2' className={classes.subTitle}>
								「THE DAY」なスキー場を見つける。
							</Typography>
							<Typography variant='h3' component='h3' align='center' className={classes.subText}>
								スキー場を検索して天気予報と周辺の積雪情報をチェック
							</Typography>
						</>
					)
					:
					(
						<>
							<Typography variant='h2' component='h2' className={classes.subTitle}>
								「THE DAY」なスキー場を見つける。
							</Typography>
							<Typography variant='h3' component='h3' align='center' className={classes.subText}>
								スキー場を検索して天気予報と周辺の積雪情報をチェック
							</Typography>
						</>
					)
				}
				<Grid
					container
					spacing={0}
					direction="row"
					justify="center"
					alignItems="center"
				>
					<Grid item xs={12} sm={6}>
						<Button
							variant='contained'
							color='primary'
							startIcon={<Icon style={{height: 24, width: 24}}/>}
							onClick={handleLink}
							fullWidth
							size='large'
						>
							スキー場検索
						</Button>
					</Grid>
				</Grid>
			</Container>
			<div className={classes.mainContent}>
				<Container maxWidth='md' className={classes.mainContainer}>
					<Grid container spacing={4} justify="center" alignItems="center">
						<Grid item xs={6} md={3}>
							<Paper className={classes.contentBlock}>
								<div className={classes.contentImageContainer}>
									<img src={Forecast} alt='forecast' className={classes.iconImg}/>
									<Typography align='center' className={classes.iconLabel}>
										Forecast
									</Typography>
								</div>
								<Typography align='center'>
									3時間ごとの天気予報
								</Typography>
							</Paper>
						</Grid>
						<Grid item xs={6} md={3}>
							<Paper className={classes.contentBlock}>
								<div className={classes.contentImageContainer}>
									<img src={Temp} alt='high and low' className={classes.iconImg}/>
									<Typography align='center' className={classes.iconLabel}>
										Temperature
									</Typography>
								</div>
								<Typography align='center'>
									本日の最高/最低気温
								</Typography>
							</Paper>
						</Grid>
						<Grid item xs={6} md={3}>
							<Paper className={classes.contentBlock}>
								<div className={classes.contentImageContainer}>
									<img src={Depth} alt='depth' className={classes.iconImg}/>
									<Typography align='center' className={classes.iconLabel}>
										Depth
									</Typography>
								</div>
								<Typography align='center'>
									現在の積雪深
								</Typography>
							</Paper>
						</Grid>
					</Grid>
					<Grid container spacing={4} justify="center" alignItems="center">
						<Grid item xs={6} md={3}>
							<Paper className={classes.contentBlock}>
								<div className={classes.contentImageContainer}>
									<img src={Snow} alt='snow' className={classes.iconImg}/>
									<Typography align='center' className={classes.iconLabel}>
										Snow
									</Typography>
								</div>
								<Typography align='center'>
									過去の降雪量
								</Typography>
							</Paper>
						</Grid>
						<Grid item xs={6} md={3}>
							<Paper className={classes.contentBlock}>
								<div className={classes.contentImageContainer}>
									<img src={Rain} alt='rain' className={classes.iconImg}/>
									<Typography align='center' className={classes.iconLabel}>
										Rain
									</Typography>
								</div>
								<Typography align='center'>
									過去の降水量
								</Typography>
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</div>
			<Footer/>
		</div>
	);
};

export default About;
