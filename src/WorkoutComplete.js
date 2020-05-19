import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';

export default class WorkoutComplete extends React.Component {
	constructor(props) {
		super(props);
		this.saveSession = this.saveSession.bind(this);
	}

	async saveSession(isSuccess) {
		const data = { ...this.props, isSuccess };
		const response = await fetch(`${process.env.REACT_APP_API_URL}/sessions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		});
		const json = await response.json();
	}

	render() {
		const { slug } = this.props;

		return (
			<div className="WorkoutComplete-container">
				<div className="WorkoutComplete-container-bg" />
				<span className="WorkoutComplete-text">Congratulations!</span>
				<div className="save-session-buttons">
					<Button component={Link} to="/history">
						<CheckCircleTwoToneIcon className="save-session-done" onClick={() => this.saveSession(true)} />
					</Button>
					<Button component={Link} to="/history">
						<HighlightOffTwoToneIcon className="save-session-clear" onClick={() => this.saveSession(false)} />
					</Button>
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
