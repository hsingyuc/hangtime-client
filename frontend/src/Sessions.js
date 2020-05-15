import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
		const { currentUser } = this.props;
		const response = await fetch(
			`http://localhost:8080/users/${currentUser.id}/sessions`,
			{
				credentials: 'include',
			},
		);
		const json = await response.json();
		this.setState( { sessions: json.data } );
		console.log( json.data );
	}

	static getDaysDifference( item ) {
		const millisecondsPerDay = 1000 * 60 * 60 * 24;
		const date = new Date( Date.parse( item.createdAt ) );
		return Math.round( ( new Date() - date ) / millisecondsPerDay );
	}

	render() {
		const { sessions } = this.state;

		return (
			<div>
				{ sessions.map( ( item ) => (
					<div key={item.id}>
						<span>
							{ item.id }
						</span>
						<span>
							{ item.type }
						</span>
						<span>
							{ Sessions.getDaysDifference( item ) }
						</span>
						<span>
							{ item.isSuccess ? 'Success' : 'Failed' }
						</span>
					</div>
				) ) }
			</div>
		);
	}
}

Sessions.propTypes = {
	currentUser: PropTypes.instanceOf( Object ).isRequired,
};
const mapStateToProps = ( state ) => ( {
	currentUser: state.currentUser,
	isAuthRequesting: state.isAuthRequesting,
} );

export default connect( mapStateToProps )( Sessions );
