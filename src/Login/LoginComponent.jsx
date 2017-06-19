import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import config from '../config.js';
import { withRouter } from 'react-router-dom';

import './Login.css';

// Much of this code comes from http://serverless-stack.com/chapters/create-a-login-page.html
class LoginComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};

		this.props = props;
	}

	// TODO: Check for NPM package that does this
	// NOTE: Cognito User Pools default to password requirement:
	// uppercase letters, lowercase letters, special characters, numbers,
	// min length 8 characters
	validateForm() {
		return this.state.username.length > 0
			&& this.state.password.length > 0;
	}

	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		// TODO: Switch alert on error to flash messaging
		try {
			const token = await this.login(this.state.username, this.state.password);
			this.props.setUserToken(token);
			this.props.history.push('/');
		}
		catch(e) {
			alert(e);
		}
	}

	// From http://serverless-stack.com/chapters/login-with-aws-cognito.html
	login = (username, password) => {
		const userPool = new CognitoUserPool({
			UserPoolId: config.cognito.USER_POOL_ID,
			ClientId: config.cognito.APP_CLIENT_ID
		});

		const authenticationData = {
			Username: username,
			Password: password
		};

		const user = new CognitoUser({
			Username: username,
			Pool: userPool
		});

		const authenticationDetails = new AuthenticationDetails(authenticationData);

		return new Promise((resolve, reject) => (
			user.authenticateUser(authenticationDetails, {
				onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
				onFailure: (err) => reject(err)
			})
		));
	}

	render() {
		return (
			<div className="Login">
				<form onSubmit={this.handleSubmit}>

					<FormGroup controlId="username" bsSize="small">
						<ControlLabel>Email</ControlLabel>
						<FormControl
							autoFocus
							type="email"
							value={this.state.username}
							onChange={this.handleChange} />
					</FormGroup>

					<FormGroup controlId="password" bsSize="small">
						<ControlLabel>Password</ControlLabel>
						<FormControl
							value={this.state.password}
							onChange={this.handleChange}
							type="password" />
					</FormGroup>

					<Button
						block
						bsSize="small"
						disabled={ !this.validateForm() }
						type="submit">
						Login
					</Button>

				</form>
			</div>
		);
	}
}

export default withRouter(LoginComponent);
