import React from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const withAuth = ( ComponentToProtect ) => {
	const EnhancedComponent = ( props ) => {
		const { currentUser, isAuthRequesting } = props;
		if ( isAuthRequesting ) {
			return 'Loading...';
		}
		if ( !currentUser ) {
			return <Redirect to="/login" />;
		}
		return <ComponentToProtect {...props} />;
	};

	EnhancedComponent.propTypes = {
		currentUser: PropTypes.instanceOf( Object ).isRequired,
		isAuthRequesting: PropTypes.bool.isRequired,
	};

	return EnhancedComponent;
};

const mapStateToProps = ( state ) => ( {
	currentUser: state.currentUser,
	isAuthRequesting: state.isAuthRequesting,
} );

export default compose(
	connect( mapStateToProps ),
	withAuth,
);
