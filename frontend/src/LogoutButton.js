import React from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
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
		return 	(
			<ListItem button onClick={() => this.logOut()}>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
				<ListItemText primary="Log out" />
			</ListItem>
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

export default connect( mapStateToProps, mapDispatchToProps )( LogoutButton );
