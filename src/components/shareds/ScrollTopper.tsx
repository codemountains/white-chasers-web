import React from 'react';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

type Props = {
	window?: () => Window;
	children: React.ReactElement;
	targetId: string;
}

const ScrollTopper: React.FC<Props> = (props: Props) => {
	const {children, window} = props;
	const classes = useStyles();

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
			`#${props.targetId}`,
		);

		if (anchor) {
			anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
		}
	};

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role='presentation' className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
};

export default ScrollTopper;
