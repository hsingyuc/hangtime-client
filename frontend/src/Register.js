import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './actions';

class Register extends React.PureComponent {
	constructor( props ) {
		super( props );
		this.state = {
			email: '',
			password: '',
			hasSubmitted: false,
			errors: {},
		};
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	async handleSubmit( event ) {
		event.preventDefault();
		const { email, password } = this.state;
		const data = {
			email,
			password,
		};

		const errors = {};
		if ( !/\S+@\S+\.\S+/.test( email ) ) {
			errors.email = 'Not a valid email';
		}
		if ( !email.length ) {
			errors.email = 'Email is required';
		}
		if ( !password.length ) {
			errors.password = 'Password is required';
		}

		this.setState( { errors } );
		if ( Object.keys( errors ).length ) {
			return;
		}

		const response = await fetch( 'http://localhost:8080/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify( data ),
		} );
		const json = await response.json();
		const { setCurrentUser } = this.props;
		if ( json.error ) {
			this.setState( { errors: json.error.errors } );
			// this.setState( { hasSubmitted: false } );
		} else if ( json.data ) {
			// setCurrentUser( json.data.user );
			setCurrentUser( json.data.user.id );
		}
	}

	render() {
		const { email, password, hasSubmitted, errors } = this.state;
		const { currentUser } = this.props;

		if ( currentUser ) {
			return <Redirect to="/" />;
		}
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div>
					<form noValidate>
						<TextField
							error={ errors.email }
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={ (event) => this.setState({ email: event.target.value }) }
							helperText={ errors.email }
						/>
						<TextField
							error={ errors.password }
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={ (event) => this.setState({ password: event.target.value }) }
							helperText={ errors.password }
						/>
						<Button
							onClick={ this.handleSubmit }
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
						>
							Register
						</Button>
					</form>
				</div>
			</Container>
		);
	}
}

Register.propTypes = {
	setCurrentUser: PropTypes.func.isRequired,
	currentUser: PropTypes.objectOf( PropTypes.object ).isRequired,
};

const mapDispatchToProps = ( dispatch ) => ( {
	setAuthRequesting: ( value ) => {
		dispatch( actions.setAuthRequesting( value ) );
	},
	setCurrentUser: ( user ) => {
		dispatch( actions.setCurrentUser( user ) );
	},
} );

export default connect( mapDispatchToProps )( Register );
