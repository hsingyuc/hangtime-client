import React from 'react';
import Countdown from './Countdown';

class Workout extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			time: 10,
		};

		this.start = this.start.bind( this );
	}

	start() {
		const { time } = this.state;
		if ( time === 0 ) {
			return;
		}
		this.setState( { time: time - 1 } );
		setTimeout( () => this.start(), 1000 );
	}

	render() {
		const { time } = this.state;
		return (
			<div>
				<Countdown time={time} />

				<button type="button" onClick={this.start}>Start</button>
			</div>
		);
	}
}

export default Workout;
