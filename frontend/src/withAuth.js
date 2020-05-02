import React from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function withAuth( ComponentToProtect ) {
	return class extends React.PureComponent {
		render() {
			const { currentUser, isAuthRequesting } = this.props;
			if ( isAuthRequesting ) {
				return 'Loading...';
			}
			if ( !currentUser ) {
				return <Redirect to="/login" />;
			}
			return <ComponentToProtect {...this.props} />;
		}
	};
}

withAuth.propTypes = {
	currentUser: PropTypes.string.isRequired,
	isAuthRequesting: PropTypes.bool.isRequired,
};

const mapStateToProps = ( state ) => ( {
	currentUser: state.currentUser,
	isAuthRequesting: state.isAuthRequesting,
} );

export default compose(
	connect( mapStateToProps ),
	withAuth,
);
