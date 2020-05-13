import React from 'react';
import PropTypes from 'prop-types';
import Countdown from './Countdown';
import ProgressCircle from './ProgressCircle';

class Workout extends React.Component {
	constructor( props ) {
		super( props );
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
		this.saveSession = this.saveSession.bind( this );
	}

	componentDidUpdate() {
		const {
			time,
			status,
			currentRep,
		} = this.state;

		if ( status === 'complete' ) {
			return;
		}

		if ( time === 0 ) {
			if ( status === 'ready' ) {
				this.goToRep( currentRep );
				return;
			}

			if ( status === 'rep' ) {
				this.goToRest();
				return;
			}
			if ( status === 'rest' ) {
				this.goToRep( currentRep + 1 );
			}
		}
	}

	getTotalTime() {
		const { status, currentRep } = this.state;
		const {
			readyTime,
			repTime,
			reps,
			repsRestTime,
			setsRestTime,
		} = this.props;

		switch ( true ) {
		case status === 'ready':
			return readyTime;
		case status === 'rep':
			return repTime;
		case status === 'rest' && currentRep === reps:
			return setsRestTime;
		case status === 'rest':
			return repsRestTime;
		default:
			return null;
		}
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
		const {
			reps, repsRestTime, sets, setsRestTime,
		} = this.props;
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
		const {
			reps,
			sets,
		} = this.props;

		return (
			<div>
				<ProgressCircle
					totalTime={this.getTotalTime()}
					remainingTime={time}
					status={status}
					status={status}
					currentRep={currentRep}
				/>
				<Countdown time={time} />
				<span>
					Reps:
					{ currentRep }
					{' '}
					/
					{ reps }
				</span>
				<span>
					Sets:
					{ currentSet }
					{' '}
					/
					{ sets }
				</span>
				<button type="submit" onClick={() => this.saveSession( true )}>Success</button>
				<button type="button" onClick={this.countTimeDifference}>Start</button>
				<button type="button" onClick={this.pauseTimer}>Pause</button>
				<button type="submit" onClick={() => this.saveSession( false )}>Fail</button>
				<button type="button" onClick={() => this.goToSet( currentSet - 1 )}>Previous set</button>
				<button type="button" onClick={() => this.goToSet( currentSet + 1 )}>Next set</button>
				<button type="button" onClick={() => this.goToRep( currentRep - 1, true )}>Previous rep</button>
				<button type="button" onClick={() => this.goToRep( currentRep + 1, true )}>Next rep</button>
			</div>
		);
	}
}

Workout.propTypes = {
	readyTime: PropTypes.number.isRequired,
	reps: PropTypes.number.isRequired,
	repTime: PropTypes.number.isRequired,
	repsRestTime: PropTypes.number.isRequired,
	sets: PropTypes.number.isRequired,
	setsRestTime: PropTypes.number.isRequired,
};

export default Workout;
