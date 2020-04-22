import React from 'react';
import PropTypes from 'prop-types';

class Countdown extends React.PureComponent {
	render() {
		const { time } = this.props;
		return (
			<div>
				{ time }
			</div>
		);
	}
}

Countdown.propTypes = {
	time: PropTypes.number.isRequired,
};

export default Countdown;
