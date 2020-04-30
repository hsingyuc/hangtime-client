import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

class Login extends React.PureComponent {
	constructor( props ) {
		super( props );
		this.state = {
			email: '',
			password: '',
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
		console.log(json);
	}

	render() {
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
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
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
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>

							<Grid item>
								<Link href="#" variant="body2">
									Don't have an account? Sign Up
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}

export default Login;
