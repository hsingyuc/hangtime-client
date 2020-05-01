import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
		const response = await fetch( 'http://localhost:8080/auth/register', {
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

export default Login;
