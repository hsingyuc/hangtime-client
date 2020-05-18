import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class WorkoutComplete extends React.Component {
	constructor( props ) {
		super( props );
		this.saveSession = this.saveSession.bind( this );
	}

	async saveSession( isSuccess ) {
		const data = { ...this.props, isSuccess };
		const response = await fetch( 'http://localhost:8080/sessions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify( data ),
		} );
		const json = await response.json();
	}

	render() {
		const { slug } = this.props;

		return (
			<div className="WorkoutComplete-container">
				<div>Congratulations!</div>
				<div className="save-session-buttons">
					<DoneIcon onClick={() => this.saveSession( true )} />
					<ClearIcon onClick={() => this.saveSession( false )} />
				</div>
				<Button
					component={Link} to={`/workouts/${slug}`}
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
				>
					TRY AGAIN
				</Button>
			</div>
		);
	}
}

WorkoutComplete.propTypes = {
	slug: PropTypes.string.isRequired,
};
