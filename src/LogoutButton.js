import React from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PropTyeps from 'prop-types';
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
					<ExitToAppIcon />
				</ListItemIcon>
				<ListItemText primary="Log out" />
			</ListItem>
		);
	}
}

LogoutButton.propTypes = {
	setCurrentUser: PropTyeps.instanceOf( Object ).isRequired,
};

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
