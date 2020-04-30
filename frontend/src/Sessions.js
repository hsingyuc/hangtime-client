import React from 'react';

class Sessions extends React.PureComponent {
	constructor( props ) {
		super( props );
		this.state = {
			sessions: [],
		};
	}

	componentDidMount() {
		this.getSessions();
	}

	async getSessions() {
		const response = await fetch(
			'http://localhost:8080/users/35/sessions',
			{
				credentials: 'include',
			},
		);
		const json = await response.json();
		this.setState( { sessions: json.data } );
	}

	render() {
		const { sessions } = this.state;

		return (
			<div>
				{ sessions.map( ( item ) => {
					return (
						<div key={item.id}>
							<span>{ item.id }</span>
							<span>{ item.type }</span>
							<span>{ item.edge }</span>
							<span>{ item.numberOfhands }</span>
							<span>{ item.duration }</span>
							<span>{ item.reps }</span>
							<span>{ item.rep_rest }</span>
							<span>{ item.sets }</span>
							<span>{ item.set_rest }</span>
							<span>{ item.weight }</span>
						</div>
					);
				} ) }
			</div>
		);
	}
}

export default Sessions;
