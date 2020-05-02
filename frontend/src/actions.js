const setCurrentUser = ( user ) => ( {
	type: 'SET_CURRENT_USER',
	user,
} );

const setAuthRequesting = ( value ) => ( {
	type: 'SET_AUTH_REQUESTING',
	value,
} );

export default {
	setAuthRequesting,
	setCurrentUser,
};
