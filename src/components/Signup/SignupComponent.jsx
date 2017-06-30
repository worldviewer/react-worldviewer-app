// React Dependencies
import React, { Component } from 'react';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// React Bootstrap
import { HelpBlock, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../LoaderButton/LoaderButton';

// AWS Dependencies
import { signup, confirm, authenticate } from '../../libs/awsLib';

import './Signup.css';

// From http://serverless-stack.com/chapters/signup-with-aws-cognito.html
class Signup extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	// TODO: Check for NPM package that does this; either way, pull this
	// out of this component so that we can reuse it for signup too
	// NOTE: Cognito User Pools default to password requirement:
	// uppercase letters, lowercase letters, special characters, numbers,
	// min length 8 characters
	validateForm() {
		return this.props.user.username.length > 0
			&& this.props.user.password.length > 0
			&& this.props.user.password === this.props.user.confirmPassword;
	}

	validateConfirmationForm() {
		return this.props.user.confirmationCode.length > 0;
	}

	handlePasswordChange = (event) => {
		this.props.setPassword(event.target.value);
	}

	handleUsernameChange = (event) => {
		this.props.setUsername(event.target.value);
	}

	handleConfirmationChange = (event) => {
		this.props.setPasswordConfirmation(event.target.value);
	}

	handleConfirmationCodeChange = (event) => {
		this.props.setConfirmationCode(event.target.value);
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		this.props.setUserTokenLoading();

		try {
			const newUser = await signup(this.props.user.username, this.props.user.password);
			this.props.setNewUser(newUser);
			this.props.unsetUserTokenLoading();
		}
		catch(e) {
			alert(e);
			this.props.unsetUserTokenLoading();
		}
	}

	// TODO: Fix
	// If the user refreshes their page at the confirm step, they won’t
	// be able to get back and confirm that account. It forces them to 
	// create a new account instead. We are keeping things intentionally 
	// simple here but you can fix this by creating a separate page that 
	// handles the confirm step based on the email address.
	handleConfirmationSubmit = async (event) => {
		event.preventDefault();

		this.props.setUserTokenLoading();

		try {
			await confirm(this.props.user.newUser, this.props.user.confirmationCode);

			const userToken = await authenticate(
				this.props.user.newUser,
				this.props.user.username,
				this.props.user.password
			);

			this.props.setUserToken(userToken);
			this.props.history.push('/');
		}
		catch(e) {
			alert(e);
			this.props.unsetUserTokenLoading();
		}
	}

	renderConfirmationForm() {
		return (
			<form onSubmit={this.handleConfirmationSubmit}>

				<FormGroup controlId="confirmationCode" bsSize="small">
					<ControlLabel>Confirmation Code</ControlLabel>
					<FormControl
						autoFocus
						type="tel"
						value={this.props.user.confirmationCode}
						onChange={this.handleConfirmationCodeChange} />
					<HelpBlock>Please check your email for the code.</HelpBlock>
				</FormGroup>

				<LoaderButton
					block
					bsSize="small"
					disabled={ !this.validateConfirmationForm() }
					type="submit"
					isLoading={this.props.user.tokenLoading}
					text="Verify"
					loadingText="Verifying…" />

			</form>
		);
	}

	renderForm() {
		return (
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

				<FormGroup controlId="confirmPassword" bsSize="small">
					<ControlLabel>Confirm Password</ControlLabel>
					<FormControl
						value={this.props.user.confirmPassword}
						onChange={this.handleConfirmationChange}
						type="password" />
				</FormGroup>

				<LoaderButton
					block
					bsSize="small"
					disabled={ ! this.validateForm() }
					type="submit"
					isLoading={this.props.user.tokenLoading}
					text="Signup"
					loadingText="Signing up…" />
			</form>
		);
	}

	render() {
		return (
			<div className="Signup">
				{ this.props.user.newUser === null
					? this.renderForm()
					: this.renderConfirmationForm() }
			</div>
		);
	}
}

export default withRouter(Signup);
