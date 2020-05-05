import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import actions from './actions';

class Login extends React.Component {
	constructor( props ) {
		super( props );
		this.onSubmit = this.onSubmit.bind( this );
	}

	async onSubmit( values, { setErrors } ) {
		// values.preventDefault();
		const { email, password } = values;

		const response = await fetch( 'http://localhost:8080/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify( {
				email,
				password,
			} ),
		} );
		const json = await response.json();
		const { setCurrentUser } = this.props;
		if ( json.error ) {
			setErrors( json.error.errors );
		} else if ( json.data ) {
			setCurrentUser( json.data.user );
		}
	}

	render() {
		const { currentUser } = this.props;

		if ( currentUser ) {
			return <Redirect to="/" />;
		}

		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div>
					<Formik
						initialValues={ { email: '', password: '' } }
						validate={Login.validate}
						onSubmit={this.onSubmit}
					>
						{( {
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
						} ) => (
							<form noValidate>
								<TextField
									error={ errors.email && touched.email }
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
									value={ values.email }
									onChange={handleChange}
									onBlur={handleBlur}
									helperText={ touched.email && errors.email }
								/>
								<TextField
									error={ errors.email && touched.email }
									variant="outlined"
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									value={ values.password }
									onChange={handleChange}
									onBlur={handleBlur}
									helperText={ touched.password && errors.password }
								/>
								<Button
									onClick={ handleSubmit }
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
								>
									Sign In
								</Button>
								<Link href="/register">
									Don't have an account? Sign Up
								</Link>
							</form>
						)}
					</Formik>
				</div>
			</Container>
		);
	}
}

Login.propTypes = {
	setCurrentUser: PropTypes.func.isRequired,
	currentUser: PropTypes.instanceOf( Object ),
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
