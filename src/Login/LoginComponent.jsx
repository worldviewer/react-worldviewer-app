// React Dependencies
import React, { Component } from 'react';

// React Bootstrap Dependencies
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../LoaderButton/LoaderButton.js';

// AWS Dependencies
import { login } from '../libs/awsLib';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

import './Login.css';

// Much of this code comes from http://serverless-stack.com/chapters/create-a-login-page.html
class LoginComponent extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	// TODO: Check for NPM package that does this
	// NOTE: Cognito User Pools default to password requirement:
	// uppercase letters, lowercase letters, special characters, numbers,
	// min length 8 characters
	validateForm() {
		return this.props.user.username.length > 0
			&& this.props.user.password.length > 0;
	}

	handlePasswordChange = (event) => {
		this.props.setPassword(event.target.value);
	}

	handleUsernameChange = (event) => {
		this.props.setUsername(event.target.value);
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		this.props.setUserTokenLoading();

		// TODO: Switch alert on error to flash messaging
		try {
			const token = await login(this.props.user.username, this.props.user.password);
			this.props.setUserToken(token);
			this.props.unsetUserTokenLoading();
			this.props.history.push('/');
		}
		catch(e) {
			alert(e);
			this.props.unsetUserTokenLoading();
		}
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
							value={this.props.user.username}
							onChange={this.handleUsernameChange} />
					</FormGroup>

					<FormGroup controlId="password" bsSize="small">
						<ControlLabel>Password</ControlLabel>
						<FormControl
							value={this.props.user.password}
							onChange={this.handlePasswordChange}
							type="password" />
					</FormGroup>

					<LoaderButton
						block
						bsSize="small"
						disabled={ !this.validateForm() }
						type="submit"
						isLoading={this.props.user.tokenLoading}
						text="Login"
						loadingText="Logging in…" />

				</form>
			</div>
		);
	}
}

export default withRouter(LoginComponent);
