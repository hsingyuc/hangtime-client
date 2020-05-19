import React from 'react';
import PropTypes from 'prop-types';

class Countdown extends React.Component {
	renderTime() {
		const { time } = this.props;
		const m = `0${Math.floor( ( time / 1000 / 60 ) )}`.toString().slice( -2 );
		const s = `0${Math.floor( ( time / 1000 ) % 60 )}`.toString().slice( -2 );
		const mi = `0${time}`.toString().slice( -3, -1 );

		return `${m}:${s}:${mi}`;
	}

	render() {
		return (
			<div className="timer">
				{this.renderTime()}
			</div>
		);
	}
}

Countdown.propTypes = {
	time: PropTypes.number.isRequired,
};

export default Countdown;
