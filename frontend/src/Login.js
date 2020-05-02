import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './actions';

class Login extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			email: '',
			password: '',
			error: '',
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
		const response = await fetch( 'http://localhost:8080/auth/login', {
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
			this.setState( { error: json.error } );
		} else if ( json.data ) {
			setCurrentUser( json.data.user );
		}
	}

	render() {
		const { error } = this.state;
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
							helperText={ error }
						/>
						<TextField
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
							helperText={ error }
						/>
						<Button
							onClick={ this.handleSubmit }
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
						>
							Sign In
						</Button>
						{/* <Grid container>
							<Grid item> */}
								{/* <Link href="#" variant="body2"> */}
						<Link href="/register">
							Don't have an account? Sign Up
						</Link>
							{/* </Grid>
						</Grid> */}
					</form>
				</div>
			</Container>
		);
	}
}

Login.propTypes = {
	setCurrentUser: PropTypes.func.isRequired,
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

export default connect( mapStateToProps, mapDispatchToProps )( Login );
