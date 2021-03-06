import React from 'react';
import PropTypes from 'prop-types';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import Countdown from './Countdown';
import ProgressCircle from './ProgressCircle';
import WorkoutComplete from './WorkoutComplete';

class Workout extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			currentRep: 1,
			currentSet: 1,
			status: 'ready',
			time: props.readyTime,
			timerTimestamp: null,
			hanging: false,
		};
		this.timeout = null;
		this.countTimeDifference = this.countTimeDifference.bind( this );
		this.pauseTimer = this.pauseTimer.bind( this );
		this.startTimer = this.startTimer.bind( this );
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

	countTimeDifference() {
		const { time, timerTimestamp } = this.state;

		const difference = timerTimestamp ? ( Date.now() - timerTimestamp ) : 0;

		this.setState( {
			time: Math.max( time - difference, 0 ),
			timerTimestamp: Date.now(),
		} );

		this.timeout = setTimeout( () => this.countTimeDifference(), 50 );
	}

	startTimer() {
		this.setState( {
			timerTimestamp: Date.now(),
			hanging: true,
		}, this.countTimeDifference );
	}

	pauseTimer() {
		clearTimeout( this.timeout );
		this.setState( { hanging: false } );
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
			hanging,
		} = this.state;
		const {
			reps,
			sets,
			slug,
		} = this.props;

		return (
			<div>
				{ status === 'complete'
					? <WorkoutComplete slug={slug} />
					: (
						<>
							<div className="countdown-container">
								<ProgressCircle
									totalTime={this.getTotalTime()}
									remainingTime={time}
									status={status}
									currentRep={currentRep}
								/>
								<Countdown time={time} />
							</div>

							<div className="sets-reps-text">
								<div className="reps">
									<span className="numerator">
										{ currentRep }
									</span>
									<span className="slash-entity">/</span>
									<span className="denominator">
										{ reps }
									</span>
								</div>

								<div className="sets">
									<span className="numerator">
										{ currentSet }
									</span>
									<span className="slash-entity">/</span>
									<span className="denominator">
										{ sets }
									</span>
								</div>
							</div>

							<div className="play-pause-button">
								{hanging
									? <PauseCircleFilledRoundedIcon onClick={this.pauseTimer} />
									: <PlayCircleFilledRoundedIcon onClick={this.startTimer} />}
							</div>

							<div className="sets-reps-buttons">
								<div className="rewind-buttons">
									<FastRewindIcon onClick={() => this.goToSet( currentSet - 1 )} />
									<SkipPreviousIcon onClick={() => this.goToRep( currentRep - 1, true )} />
								</div>
								<div className="forward-buttons">
									<SkipNextIcon onClick={() => this.goToRep( currentRep + 1, true )} />
									<FastForwardIcon onClick={() => this.goToSet( currentSet + 1 )} />
								</div>
							</div>
						</>
					)}
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
	slug: PropTypes.string.isRequired,
};

export default Workout;
