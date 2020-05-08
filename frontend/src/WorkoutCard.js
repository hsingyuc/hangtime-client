import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './WorkoutCard.scss';

export default class WorkoutCard extends React.PureComponent {
	render() {
		const { name, slug, info } = this.props;
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
							{ info }
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
	info: PropTypes.string.isRequired,
};
