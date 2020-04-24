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

class App extends React.PureComponent {
	render() {
		const workoutTypes = [
			{
				key: 'repeaters',
				name: 'Repeaters',
				sets: 3,
				setsRestTime: 180,
				repTime: 7,
				repsRestTime: 3,
				reps: 6,
			},
		];

		return (
			<div>
				<Router>
					<div>
						<nav>
							<ul>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/workouts">Workouts</Link>
								</li>
								{
									workoutTypes.map( ( workout ) => {
										return (
											<li key={workout.key}>
												<Link to={`/workouts/${workout.key}`}>{ workout.name }</Link>
											</li>
										);
									} )
								}
								<li>
									<Link to="/sessions">Sessions</Link>
								</li>
							</ul>
						</nav>

						{/* A <Switch> looks through its children <Route>s and
			renders the first one that matches the current URL. */}
						<Switch>
							<Route path="/workouts">
								<Workout
								/>
							</Route>
							<Route path="/sessions">
								<Sessions />
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
