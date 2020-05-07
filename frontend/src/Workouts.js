import React from 'react';
import WorkoutCard from './WorkoutCard';

export default class Workouts extends React.PureComponent {
	static getTypes() {
		return [
			{
				slug: 'repeaters',
				name: 'Repeaters',
				readyTime: 5000,
				sets: 3,
				setsRestTime: 30000,
				repTime: 4000,
				repsRestTime: 6000,
				reps: 6,
			},
			{
				slug: 'max-hang',
				name: 'Max hang',
				readyTime: 5000,
				sets: 5,
				setsRestTime: 60000,
				repTime: 10000,
				repsRestTime: 30000,
				reps: 5,
			},
			{
				slug: 'no-hang',
				name: 'No-hang crimp',
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
		return (
			<ul>
				{
					Workouts.getTypes().map( ( workout ) => (
						<WorkoutCard {...workout} />
					) )
				}
			</ul>
		);
	}
}
