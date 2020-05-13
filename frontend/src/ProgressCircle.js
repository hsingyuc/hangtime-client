import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

export default class ProgressCircle extends React.PureComponent {
	render() {
		const { totalTime, remainingTime, status } = this.props;
		const percentComplete = ( ( totalTime - remainingTime ) / totalTime ) * 100;

		return (
			<div className={`progress-circle is-${status}`}>
				<CircularProgress variant="static" value={percentComplete} size={200} />
			</div>
		);
	}
}

ProgressCircle.propTypes = {
	totalTime: PropTypes.number.isRequired,
	remainingTime: PropTypes.number.isRequired,
	status: PropTypes.string.isRequired,
};
