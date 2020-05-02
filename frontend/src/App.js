import React from 'react';
import './App.scss';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sessions from './Sessions';
import Workout from './Workout';
import Login from './Login';
import withAuth from './withAuth';
import LogoutButton from './LogoutButton';
import WorkoutTypes from './WorkoutTypes';
import actions from './actions';
import Register from './Register';

class App extends React.Component {
	async componentDidMount() {
		const { setAuthRequesting, setCurrentUser } = this.props;

		fetch(
			'http://localhost:8080/auth/check',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			},
		)
			.then( async ( res ) => {
				const json = await res.json();
				if ( res.status === 200 ) {
					setCurrentUser( json.data.user );
					setAuthRequesting( false );
				} else {
					setAuthRequesting( false );
				}
			} )
			.catch( () => {
				setAuthRequesting( false );
			} );
	}

	render() {
		const { currentUser } = this.props;
		return (
			<div>
				<Router>
					<div>
						{ currentUser
							&& (
								<nav>
									<ul>
										<li>
											<Link to="/">Workouts</Link>
										</li>

										<li>
											<Link to="/history">History</Link>
										</li>
										<li>
											<LogoutButton />
										</li>
									</ul>
								</nav>
							)}

						{/* A <Switch> looks through its children <Route>s and
			renders the first one that matches the current URL. */}
						<Switch>

							{ WorkoutTypes.getTypes().map( ( workout ) => (
								<Route
									path={`/workouts/${workout.key}`}
									key={workout.key}
									component={() => {
										const WrappedWorkout = withAuth( Workout );
										return <WrappedWorkout {...workout} />;
									}}
								/>
							) ) }

							<Route path="/history" component={withAuth( Sessions )} />

							<Route path="/login">
								<Login />
							</Route>

							<Route path="/register">
								<Register />
							</Route>

							<Route path="/" component={withAuth( WorkoutTypes )} />

						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = ( state ) => ( {
	currentUser: state.currentUser,
	isAuthRequesting: state.isAuthRequesting,
} );

const mapDispatchToProps = ( dispatch ) => ( {
	setAuthRequesting: ( value ) => {
		dispatch( actions.setAuthRequesting( value ) );
	},
	setCurrentUser: ( user ) => {
		dispatch( actions.setCurrentUser( user ) );
	},
} );

App.propTypes = {
	setAuthRequesting: PropTypes.func.isRequired,
	setCurrentUser: PropTypes.func.isRequired,
};

export default connect( mapStateToProps, mapDispatchToProps )( App );
