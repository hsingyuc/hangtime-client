import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './WorkoutCard.scss';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import LoopIcon from '@material-ui/icons/Loop';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

export default class WorkoutCard extends React.Component {
	renderInfo() {
		const {
			repTime, repsRestTime, reps, sets,
		} = this.props;

		return (
			<>
				<HourglassFullIcon />
				{ repsRestTime
					? `${repTime / 1000} / ${repsRestTime / 1000}`
					: `${repTime / 1000}s`}
				<LoopIcon />
				{ `${reps} reps` }
				<SettingsBackupRestoreIcon />
				{ `${sets} sets` }
			</>
		);
	}

	render() {
		const { name, slug } = this.props;

		return (
			<Card className="workout-card">
				<CardActionArea component={Link} to={`/workouts/${slug}`}>
					<CardMedia
						component="img"
						alt="Contemplative Reptile"
						height="140"
						image={`images/${slug}.jpg`}
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{ name }
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{ this.renderInfo() }
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		);
	}
}

WorkoutCard.propTypes = {
	name: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	repTime: PropTypes.number.isRequired,
	repsRestTime: PropTypes.number.isRequired,
	reps: PropTypes.number.isRequired,
	sets: PropTypes.number.isRequired,
};
