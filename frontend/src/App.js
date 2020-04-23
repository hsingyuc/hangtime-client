import React from 'react';
import './App.css';
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
								<li>
									<Link to="/sessions">Sessions</Link>
								</li>
							</ul>
						</nav>

						{/* A <Switch> looks through its children <Route>s and
			renders the first one that matches the current URL. */}
						<Switch>
							<Route path="/workouts">
								<Workout />
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
