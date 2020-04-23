import React from 'react';
import Countdown from './Countdown';

class Workout extends React.Component {
	constructor( props ) {
		super( props );
		this.workout = {
			key: 'repeaters',
			name: 'Repeaters',
			readyTime: 5,
			sets: 3,
			setsRestTime: 5,
			repTime: 2,
			repsRestTime: 3,
			reps: 6,
		};
		this.state = {
			repCount: 0,
			setCount: 0,
			current: 'Ready',
			time: this.workout.readyTime,
		};
		this.timeout = null;
		this.startTimer = this.startTimer.bind( this );
		this.pauseTimer = this.pauseTimer.bind( this );
	}

	startTimer() {
		const {
			time,
			current: previousStep,
			repCount,
			setCount,
		} = this.state;

		// Workout is finished.
		if ( setCount === 3 ) {
			this.setState( {
				setCount: 0,
			} );
			return;
		}

		// Completed a set.
		if ( repCount === 6 ) {
			this.setState( {
				time: this.workout.setsRestTime,
				current: 'rest',
				setCount: setCount + 1,
				repCount: 0,
			}, () => {
				this.timeout = setTimeout( () => this.startTimer(), 1000 );
			} );
			return;
		}

		if ( time === 0 ) {
			// Start workout
			if ( previousStep === 'ready' ) {
				this.setState( {
					time: this.workout.repTime,
					current: 'rep',
				}, () => {
					this.timeout = setTimeout( () => this.startTimer(), 1000 );
				} );
				return;
			}

			// Start a rest period.
			if ( previousStep === 'rep' ) {
				this.setState( {
					time: this.workout.repsRestTime,
					current: 'rest',
				}, () => {
					this.timeout = setTimeout( () => this.startTimer(), 1000 );
				} );
				return;
			}

			// Start a rep.
			if ( previousStep === 'rest' ) {
				this.setState( {
					time: this.workout.repTime,
					current: 'rep',
					repCount: repCount + 1,
				}, () => {
					this.timeout = setTimeout( () => this.startTimer(), 1000 );
				} );
				return;
			}
		}
		this.setState( { time: time - 1 } );
		this.timeout = setTimeout( () => this.startTimer(), 1000 );
	}

	pauseTimer() {
		clearTimeout( this.timeout );
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
				<button type="button" onClick={this.startTimer}>Start</button>
				<button type="button" onClick={this.pauseTimer}>Pause</button>
			</div>
		);
	}
}

export default Workout;
