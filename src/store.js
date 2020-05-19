import { createStore } from 'redux';

const initialState = {
	currentUser: null,
	isAuthRequesting: true,
};

function appReducer( state, action ) {
	switch ( action.type ) {
	case 'SET_CURRENT_USER':
		return { ...state, currentUser: action.user };
	case 'SET_AUTH_REQUESTING':
		return { ...state, isAuthRequesting: action.value };
	default:
		return state;
	}
}

const store = createStore( appReducer, initialState );
export default store;
