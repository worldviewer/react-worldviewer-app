// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../LoaderButton/LoaderButton.js';
import './Login.css';
import elephant from '../../images/elephant.png';

// AWS Dependencies
import { login } from '../../libs/awsLib';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

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

		try {
			const token = await login(this.props.user.username, this.props.user.password);
			this.props.setUserToken(token);
			this.props.unsetUserTokenLoading();
			this.props.history.push('/');
		}
		catch(e) {
			this.props.setAlert('Error Logging In: ', e.message);
			setTimeout(() => this.props.dismissAlert(), 5000);
			this.props.unsetUserTokenLoading();
		}
	}

	render() {
		return (
			<div className="Login">
				<div style={{position: "relative"}}>
					<img
						alt="blind men and the elephant logo"
						src={elephant}
						className="Logo" />

					<form onSubmit={this.handleSubmit}>

						<FormGroup
							controlId="username"
							bsSize="small">

							<ControlLabel>Email</ControlLabel>
							<FormControl
								autoFocus
								placeholder="Login with email"
								type="email"
								value={this.props.user.username}
								onChange={this.handleUsernameChange} />

						</FormGroup>

						<FormGroup
							controlId="password"
							bsSize="small">

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
			</div>
		);
	}
}

export default withRouter(LoginComponent);
