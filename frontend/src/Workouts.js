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
				info: "- Hangboard Repeaters – the first-ever protocol designed for hangboard training.  -Leads to intense muscle pump."
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
				info: "- Low-volume, high-intensity protocols for significant strength gains.  - Short TUT and high intensity lead to rapid neural adaptations."
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
				info: "The no hang allows you to come really close to isolating fingers and getting a real feel for how strong they are."
			},
		];
	}

	render() {
		return (
			<>
				{
					Workouts.getTypes().map( ( workout ) => (
						<WorkoutCard {...workout} />
					) )
				}
			</>
		);
	}
}
