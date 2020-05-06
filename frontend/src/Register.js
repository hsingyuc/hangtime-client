import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from '@material-ui/core/Icon';
import actions from './actions';

class Register extends React.PureComponent {
	static validate( values ) {
		const errors = {};
		if ( !values.email ) {
			errors.email = 'Email is required';
		} else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
			errors.email = 'Invalid email address';
		}
		if ( !values.password.length ) {
			errors.password = 'Password is required';
		}

		return errors;
	}

	constructor( props ) {
		super( props );
		this.onSubmit = this.onSubmit.bind( this );
	}

	async onSubmit( values, { setErrors } ) {
		const { email, password } = values;

		const response = await fetch( 'http://localhost:8080/auth/register', {
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
						validate={Register.validate}
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
									InputProps={{
										startAdornment: (
										<AlternateEmailIcon />
										),
									}}
									error={ errors.email && touched.email }
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
									InputProps={{
										startAdornment: (
										<LockOutlinedIcon />
										),
									}}
									error={ errors.email && touched.email }
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
									Register
								</Button>
							</form>
						)}
					</Formik>
				</div>
			</Container>
		);
	}
}

Register.propTypes = {
	setCurrentUser: PropTypes.func.isRequired,
	currentUser: PropTypes.instanceOf( Object ),
};

const mapStateToProps = ( state ) => ( {
	currentUser: state.currentUser,
} );

const mapDispatchToProps = ( dispatch ) => ( {
	setAuthRequesting: ( value ) => {
		dispatch( actions.setAuthRequesting( value ) );
	},
	setCurrentUser: ( user ) => {
		dispatch( actions.setCurrentUser( user ) );
	},
} );

export default connect( mapStateToProps, mapDispatchToProps )( Register );
