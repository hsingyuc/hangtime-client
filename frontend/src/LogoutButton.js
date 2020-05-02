import React from 'react';
import { connect } from 'react-redux';
import actions from './actions';

class LogoutButton extends React.Component {
	logOut() {
		const { setCurrentUser } = this.props;
		fetch(
			'http://localhost:8080/auth/logout',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			},
		).then( () => {
			setCurrentUser( null );
		} );
	}

	render() {
		return <button type="button" onClick={() => this.logOut()}>Log out</button>;
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

export default connect( mapStateToProps, mapDispatchToProps )( LogoutButton );
