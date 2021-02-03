import React from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {ReactComponent as FooterLogo} from '../logo-long-white.svg';
import Typography from '@material-ui/core/Typography';

const Copyright: React.FC = () => {
	return (
		<Typography variant='body2' align='center' style={{color: '#ffffff'}}>
			{'Copyright © '}
			<Link color='inherit' href='/'>
				WHITE CHASERS
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

const useStyles = makeStyles((theme: Theme) => ({
	footer: {
		margin: '96px 0px 0px 0px',
		width: '100%',
		backgroundColor: 'rgb(50, 50, 50)',
	},
	footerContainer: {
		padding: '24px',
	},
	logoContainer: {
		width: '300px',
	},
	footerLogo: {
		width: '284px',
		height: '52px',
		margin: '0px 8px',
	},
	footerLogoLabel: {
		color: theme.palette.primary.contrastText,
		fontSize: '12px',
		margin: '0px 8px',
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

const Footer: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.footer}>
			<Container maxWidth='md' className={classes.footerContainer}>
				<Grid container spacing={0}>
					<Grid xs={12} md={8}>
						<div className={classes.logoContainer}>
							<FooterLogo className={classes.footerLogo}/>
							<Typography className={classes.footerLogoLabel} align='center'>
								「THE DAY」なスキー場を見つける。
							</Typography>
						</div>
					</Grid>
					<Grid xs={12} md={4}>
						<div>
							<Link href='/terms' variant='body2' className={classes.privacyLink}>
								利用規約
							</Link>
						</div>
						<div>
							<Link href='/privacy' variant='body2' className={classes.privacyLink}>
								プライバシーポリシー
							</Link>
						</div>
					</Grid>
					<Grid xs={12}>
						<div className={classes.copyrightContainer}>
							<Copyright />
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Footer;
