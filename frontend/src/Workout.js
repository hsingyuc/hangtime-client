import React from 'react';
import Countdown from './Countdown';

class Workout extends React.Component {
	constructor( props ) {
		super( props );
		// this.workout = {
		// 	key: 'repeaters',
		// 	name: 'Repeaters',
		// 	readyTime: 5000,
		// 	sets: 2,
		// 	setsRestTime: 7000,
		// 	repTime: 2000,
		// 	repsRestTime: 3000,
		// 	reps: 2,
		// };
		this.state = {
			currentRep: 1,
			currentSet: 1,
			status: 'ready',
			time: props.readyTime,
			timerTimestamp: null,
		};
		this.timeout = null;
		this.countTimeDifference = this.countTimeDifference.bind( this );
		this.pauseTimer = this.pauseTimer.bind( this );
	}

	componentDidUpdate() {
		const {
			time,
			status,
			currentRep,
		} = this.state;

		// Workout is finished.
		if ( status === 'complete' ) {
			return;
		}

		if ( time === 0 ) {
			// Start workout.
			if ( status === 'ready' ) {
				this.goToRep( currentRep );
				return;
			}

			// Finished rest, start rep.
			if ( status === 'rest' ) {
				this.goToRep( currentRep + 1 );
				return;
			}

			// Start a rest period.
			if ( status === 'rep' ) {
				this.goToRest();
			}
		}
	}

	countTimeDifference() {
		const { time, timerTimestamp } = this.state;

		const difference = timerTimestamp ? ( Date.now() - timerTimestamp ) : 0;

		this.setState( {
			time: Math.max( time - difference, 0 ),
			timerTimestamp: Date.now(),
		} );

		this.timeout = setTimeout( () => this.countTimeDifference(), 50 );
	}

	pauseTimer() {
		clearTimeout( this.timeout );
	}

	goToRep( rep, addReady = false ) {
		const { readyTime, reps, repTime } = this.props;
		const { currentSet } = this.state;

		if ( rep < 1 ) {
			return;
		}

		if ( rep > reps ) {
			this.goToSet( currentSet + 1 );
			return;
		}

		this.setState( {
			currentRep: rep,
			status: addReady ? 'ready' : 'rep',
			time: addReady ? readyTime : repTime,
		} );
	}

	goToSet( set ) {
		const { readyTime, sets } = this.props;

		if ( set < 1 ) {
			return;
		}

		if ( set > sets ) {
			this.setState( {
				status: 'complete',
			} );
			return;
		}

		this.setState( {
			currentSet: set,
			currentRep: 1,
			status: 'ready',
			time: readyTime,
		} );
	}

	goToRest() {
		const { reps, repsRestTime, sets, setsRestTime } = this.props;
		const { currentRep, currentSet } = this.state;

		if ( currentRep === reps && currentSet === sets ) {
			this.setState( {
				status: 'complete',
			} );
			return;
		}

		if ( currentRep < reps ) {
			this.setState( {
				time: repsRestTime,
				status: 'rest',
			} );
			return;
		}

		this.setState( {
			time: setsRestTime,
			status: 'rest',
		} );
	}

	render() {
		const {
			time,
			currentRep,
			currentSet,
			status,
		} = this.state;
		const { reps, sets } = this.props;
		return (
			<div>
				<span>
					Status:
					{status}
				</span>
				<Countdown time={time} />
				<span>
					Reps:
					{ currentRep } / { reps }
				</span>
				<span>
					Sets:
					{ currentSet } / { sets }
				</span>
				<button type="button" onClick={this.countTimeDifference}>Start</button>
				<button type="button" onClick={this.pauseTimer}>Pause</button>
				<button type="button" onClick={() => this.goToSet( currentSet - 1 )}>Previous set</button>
				<button type="button" onClick={() => this.goToSet( currentSet + 1 )}>Next set</button>
				<button type="button" onClick={() => this.goToRep( currentRep - 1, true )}>Previous rep</button>
				<button type="button" onClick={() => this.goToRep( currentRep + 1, true )}>Next rep</button>
			</div>
		);
	}
}

export default Workout;
