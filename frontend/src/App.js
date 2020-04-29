import React from 'react';
import './App.scss';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from 'react-router-dom';
import Sessions from './Sessions';
import Workout from './Workout';
import Login from './Login';

class App extends React.PureComponent {
	render() {
		const workoutTypes = [
			{
				key: 'repeaters',
				name: 'Repeaters',
				readyTime: 5000,
				sets: 3,
				setsRestTime: 30000,
				repTime: 4000,
				repsRestTime: 6000,
				reps: 6,
			},
			{
				key: 'max-hang',
				name: 'Max hang',
				readyTime: 5000,
				sets: 5,
				setsRestTime: 60000,
				repTime: 10000,
				repsRestTime: 30000,
				reps: 5,
			},
			{
				key: 'bag',
				name: 'Bag',
				readyTime: 5000,
				sets: 5,
				setsRestTime: 60000,
				repTime: 10000,
				repsRestTime: 30000,
				reps: 5,
			},
		];

		return (
			<div>
				<Router>
					<div>
						<nav>
							<ul>
								<li>
									<Link to="/login">Login</Link>
								</li>

								<li>
									<Link to="/">Home</Link>
								</li>

								<li>
									<Link to="/workouts">Workouts</Link>
								</li>

								<li>
									<Link to="/sessions">Sessions</Link>
								</li>
							</ul>
						</nav>

						{/* A <Switch> looks through its children <Route>s and
			renders the first one that matches the current URL. */}
						<Switch>

							{ workoutTypes.map( ( workout ) => (
								<Route path={`/workouts/${workout.key}`} key={workout.key}>
									<Workout {...workout} />
								</Route>
							) ) }

							<Route path="/workouts">
								<ul>
									{
										workoutTypes.map( ( workout ) => (
											<li key={workout.key}>
												<Link to={`/workouts/${workout.key}`}>{ workout.name }</Link>
											</li>
										) )
									}
								</ul>
							</Route>

							<Route path="/sessions">
								<Sessions />
							</Route>

							<Route path="/login">
								<Login />
							</Route>

							<Route path="/">
								Home
							</Route>

						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
