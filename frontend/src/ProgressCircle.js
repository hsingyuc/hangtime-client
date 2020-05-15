import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

export default class ProgressCircle extends React.Component {
	renderText() {
		const {
			reps,
			status,
			currentRep,
		} = this.props;

		switch ( true ) {
		case status === 'ready':
			return 'Ready';
		case status === 'rep':
			return 'Hang time';
		case status === 'rest' && currentRep === reps:
			return 'Rest';
		case status === 'rest':
			return 'Rest';
		default:
			return null;
		}
	}

	render() {
		const { totalTime, remainingTime, status } = this.props;
		const elapsedTime = totalTime - remainingTime;
		const percentComplete = status === 'ready' && elapsedTime === 0
			? 100
			: ( elapsedTime / totalTime ) * 100;

		return (
			<div className={`progress-circle is-${status}`}>
				<span className="status-text">
					{this.renderText()}
				</span>
				<CircularProgress
  					className="circle-before-ready"
					variant="static"
					value={percentComplete}
					size={200}
				/>
			</div>
		);
	}
}

ProgressCircle.propTypes = {
	totalTime: PropTypes.number.isRequired,
	remainingTime: PropTypes.number.isRequired,
	status: PropTypes.string.isRequired,
	reps: PropTypes.number.isRequired,
	currentRep: PropTypes.number.isRequired,
};
