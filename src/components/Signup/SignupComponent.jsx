// React Dependencies
import React, { Component } from 'react';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// UI Dependencies
import { HelpBlock, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../LoaderButton/LoaderButton';
import './Signup.css';
import isEmail from 'validate.io-email-address';
import elephant from '../../images/elephant.png';

// AWS Dependencies
import { signup, confirm, authenticate } from '../../libs/aws';

// Error/Logger Handling
import { logError } from '../../libs/utils';

// From http://serverless-stack.com/chapters/signup-with-aws-cognito.html
class Signup extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	validateForm() {
		return isEmail(this.props.user.username)
			&& this.getPasswordValidationState(this.props.user.password)
			&& this.props.user.password === this.props.user.confirmPassword;
	}

	validateConfirmationForm() {
		return this.props.user.confirmationCode.length > 0;
	}

	handleUsernameChange = (event) => {
		this.props.setUsername(event.target.value);
	}

	handlePasswordChange = (event) => {
		this.props.setPassword(event.target.value);
	}

	handleConfirmationChange = (event) => {
		this.props.setPasswordConfirmation(event.target.value);
	}

	// 12-character minimum password length
	getPasswordValidationState(password) {
		const validation = /^.{12,}$/;
		return validation.test(password);
	}

	updatePasswordValidationState(password) {
		const passwordValidationState = this.getPasswordValidationState(password) ?
			'success' :
			'error';
		this.props.setPasswordValidation(passwordValidationState);
	}

	updatePasswordConfirmValidationState(password, confirmPassword) {
		const validation = password === confirmPassword && confirmPassword.length > 0;
		const passwordConfirmValidationState = validation ? 'success' : 'error';
		this.props.setConfirmPasswordValidation(passwordConfirmValidationState);
	}

	updateUsernameValidationState(username) {
		const usernameValidationState = isEmail(username) ? 'success' : 'error';
		this.props.setUsernameValidation(usernameValidationState);
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

			// this.props.setAlert('Success: ', 'Check your email for validation code');
			// setTimeout(() => this.props.dismissAlert(), 5000);
		}
		catch(e) {
			let prettyMessage = e.message;

			if (e.message === 'User already exists') {
				prettyMessage = 'User already exists. Please try another username.';
			}

			logError(e, 'Error Creating Account: ' + prettyMessage, this.props.user.token);

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
			logError(e, 'Error Confirming Account: ' + e.message, this.props.user.token);
		}

		this.props.unsetUserTokenLoading();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.password !== this.props.user.password ||
			nextProps.user.confirmPassword !== this.props.user.confirmPassword) {

			this.updatePasswordValidationState(nextProps.user.password);
			this.updatePasswordConfirmValidationState(nextProps.user.password, nextProps.user.confirmPassword);
		}

		if (nextProps.user.username !== this.props.user.username) {
			this.updateUsernameValidationState(nextProps.user.username);
		}
	}

	renderConfirmationForm() {
		return (
			<form onSubmit={this.handleConfirmationSubmit}>

				<FormGroup controlId="confirmationCode">
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

				<FormGroup
					validationState={this.props.validations.username}
					controlId="username">

					<ControlLabel>Email</ControlLabel>
					<FormControl
						autoFocus
						type="email"
						value={this.props.user.username}
						onChange={this.handleUsernameChange} />
					<FormControl.Feedback />

				</FormGroup>

				<FormGroup
					validationState={this.props.validations.password}
					controlId="password">

					<ControlLabel>Password</ControlLabel>
					<FormControl
						placeholder="12-character minimum"
						value={this.props.user.password}
						onChange={this.handlePasswordChange}
						type="password" />
					<FormControl.Feedback />

				</FormGroup>

				<FormGroup
					validationState={this.props.validations.confirmPassword}
					controlId="confirmPassword">

					<ControlLabel>Confirm Password</ControlLabel>
					<FormControl
						value={this.props.user.confirmPassword}
						onChange={this.handleConfirmationChange}
						type="password" />
					<FormControl.Feedback />

				</FormGroup>

				<LoaderButton
					block
					disabled={ !this.validateForm() }
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
				<div style={{position: "relative"}}>
					<img
						alt="blind men and the elephant logo"
						src={elephant}
						className="Logo" />

					{ this.props.user.newUser === null
						? this.renderForm()
						: this.renderConfirmationForm() }
				</div>
			</div>
		);
	}
}

export default withRouter(Signup);
