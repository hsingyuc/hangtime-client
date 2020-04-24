import React from 'react';
import Countdown from './Countdown';

class Workout extends React.Component {
	constructor( props ) {
		super( props );
		this.workout = {
			key: 'repeaters',
			name: 'Repeaters',
			readyTime: 5000,
			sets: 3,
			setsRestTime: 5000,
			repTime: 2000,
			repsRestTime: 3000,
			reps: 6,
		};
		this.state = {
			repCount: 0,
			setCount: 0,
			current: 'ready',
			time: this.workout.readyTime,
			timerTimestamp: null,
		};
		this.timeout = null;
		this.countTimeDifference = this.countTimeDifference.bind( this );
		this.pauseTimer = this.pauseTimer.bind( this );
	}

	componentDidUpdate() {
		const {
			time,
			current: previousStep,
			repCount,
			setCount,
		} = this.state;

		const { sets, reps } = this.workout;

		// Workout is finished.
		if ( previousStep === 'complete' ) {
			return;
		}

		// Workout is finished, set current to complete.
		if ( setCount === sets ) {
			this.setState( {
				current: 'complete',
			} );
			return;
		}

		// @todo Need to combine rest methods.
		// @todo Need to change goToRep to actually start a rep.
		// @todo Need to add goToReady method.

		// Completed a set.
		if ( repCount === reps ) {
			this.setState( {
				time: this.workout.setsRestTime,
				current: 'rest',
				setCount: setCount + 1,
				repCount: 0,
			} );
			return;
		}

		if ( time === 0 ) {
			// Start workout
			if ( previousStep === 'ready' ) {
				this.setState( {
					time: this.workout.repTime,
					current: 'rep',
				} );
				return;
			}

			// Start a rest period.
			if ( previousStep === 'rep' ) {
				this.setState( {
					time: this.workout.repsRestTime,
					current: 'rest',
				} );
				return;
			}

			// Start a rep.
			if ( previousStep === 'rest' ) {
				this.setState( {
					time: this.workout.repTime,
					current: 'rep',
					repCount: repCount + 1,
				} );
				return;
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

		this.timeout = setTimeout( () => this.countTimeDifference(), 1000 );
	}

	pauseTimer() {
		clearTimeout( this.timeout );
	}

	goToRep( rep ) {
		const { readyTime, reps, setCount } = this.workout;

		if ( rep > reps || rep < 0 ) {
			return;
		}

		if ( rep === reps ) {
			this.goToSet( setCount + 1 );
		}

		this.setState( {
			repCount: rep,
			current: 'ready',
			time: readyTime,
		} );
	}

	goToSet( set ) {
		const { readyTime, sets } = this.workout;

		if ( set > sets || set < 0 ) {
			return;
		}

		this.setState( {
			setCount: set,
			repCount: 0,
			current: set === sets ? 'complete' : 'ready',
			time: readyTime,
		} );
	}

	render() {
		const {
			time,
			repCount,
			setCount,
			current,
		} = this.state;
		return (
			<div>
				<span>
					Status:
					{current}
				</span>
				<Countdown time={time} />
				<span>
					Reps:
					{ Math.min( repCount + 1, 6 ) } / 6
				</span>
				<span>
					Sets:
					{ Math.min( setCount + 1, 3 ) } / 3
				</span>
				<button type="button" onClick={this.countTimeDifference}>Start</button>
				<button type="button" onClick={this.pauseTimer}>Pause</button>
				<button type="button" onClick={() => this.goToSet( setCount - 1 )}>Previous set</button>
				<button type="button" onClick={() => this.goToSet( setCount + 1 )}>Next set</button>
				<button type="button" onClick={() => this.goToRep( repCount - 1 )}>Previous rep</button>
				<button type="button" onClick={() => this.goToRep( repCount + 1 )}>Next rep</button>
			</div>
		);
	}
}

export default Workout;
