import React from 'react';
import { Link } from 'react-router-dom';

export default class WorkoutTypes extends React.PureComponent {
	static getTypes() {
		return [
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
	}

	render() {
		return 								(
			<ul>
				{
					WorkoutTypes.getTypes().map( ( workout ) => (
						<li key={workout.key}>
							<Link to={`/workouts/${workout.key}`}>{ workout.name }</Link>
						</li>
					) )
				}
			</ul>
		);
	}
}
