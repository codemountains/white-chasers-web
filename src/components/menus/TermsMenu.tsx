import React from 'react';
import {Theme, makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import {Typography} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
	itemText: {
		fontSize: '14.5px',
		fontWeight: 'bold',
	},
	noSelected: {
		color: theme.palette.secondary.light,
	},
	selected: {
		color: theme.palette.primary.main,
	},
}));

type Props = {
	isTerms: boolean;
}

const TermsMenu: React.FC<Props> = ({isTerms}: Props) => {
	const classes = useStyles();

	const handleClick = (path: string) => {
		window.location.href = `/${path}`;
	};

	return (
		<List component='nav' aria-label='terms-menu'>
			<ListItem button onClick={() => handleClick('terms')}>
				<ListItemText
					primary={
						<Typography
							className={clsx(classes.itemText, isTerms ? classes.selected : classes.noSelected)}>
							利用規約
						</Typography>
					}
				/>
			</ListItem>
			<ListItem button onClick={() => handleClick('privacy')}>
				<ListItemText
					primary={
						<Typography
							className={clsx(classes.itemText, !isTerms ? classes.selected : classes.noSelected)}>
							プライバシーポリシー
						</Typography>
					}
				/>
			</ListItem>
		</List>
	);
};

export default TermsMenu;
