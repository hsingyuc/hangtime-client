import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class WorkoutCard extends React.PureComponent {
	render() {
		const { name, slug } = this.props;
		return (
			<div className="root">
				<Card>
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
								Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
								across all continents except Antarctica
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</div>
		);
	}
}

WorkoutCard.propTypes = {
	name: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
};
