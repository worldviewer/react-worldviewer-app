// React Dependencies
import React, { Component } from 'react';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// React Bootstrap
import { HelpBlock, FormGroup, FormControl, ControlLabel, Tooltip, OverlayTrigger } from 'react-bootstrap';
import LoaderButton from '../LoaderButton/LoaderButton';

// AWS Dependencies
import { signup, confirm, authenticate } from '../../libs/awsLib';

import './Signup.css';
import isemail from 'isemail';

// From http://serverless-stack.com/chapters/signup-with-aws-cognito.html
class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tooltipPlacement: window.innerWidth > 713 ? "left" : "top"
		}

		window.addEventListener('resize', this.setTooltipPlacement);

		this.props = props;
		this.passwordTooltip = (
			<Tooltip id="tooltip">
				8 character minimum length: Use at least one uppercase, one lowercase, one special character & one number
			</Tooltip>
		);
	}

	validateForm() {
		return isemail.validate(this.props.user.username)
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

	// NOTE: Cognito User Pools default to password requirement:
	// uppercase letters, lowercase letters, special characters, numbers,
	// min length 8 characters
	getPasswordValidationState(password) {
		const validation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !#$%&?()[\]\\=+-_{}':;<>.,|~`"@^*/]).{8,}$/;
		return validation.test(password);
	}

	updatePasswordValidationState(password) {
		const passwordValidationState = this.getPasswordValidationState(password) ?
			'success' :
			'error';
		this.props.setPasswordValidation(passwordValidationState);
	}

	updatePasswordConfirmValidationState(password, confirmPassword) {
		const validation = password === confirmPassword;
		const passwordConfirmValidationState = validation ? 'success' : 'error';
		this.props.setConfirmPasswordValidation(passwordConfirmValidationState);
	}

	updateUsernameValidationState(username) {
		const usernameValidationState = isemail.validate(username) ? 'success' : 'error';
		this.props.setUsernameValidation(usernameValidationState);
	}

	handleConfirmationCodeChange = (event) => {
		this.props.setConfirmationCode(event.target.value);
	}

	setTooltipPlacement() {
		const placement = window.innerWidth > 713 ? "left" : "top";
		this.setState({tooltipPlacement: placement});
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

				<FormGroup
					validationState={this.props.validations.username}
					controlId="username"
					bsSize="small">

					<ControlLabel>Email</ControlLabel>
					<FormControl
						placeholder="e.g. chris@controversiesofscience.com"
						autoFocus
						type="email"
						value={this.props.user.username}
						onChange={this.handleUsernameChange} />
					<FormControl.Feedback />

				</FormGroup>

				<OverlayTrigger placement={this.state.tooltipPlacement} overlay={this.passwordTooltip}>
					<FormGroup
						validationState={this.props.validations.password}
						controlId="password"
						bsSize="small">

						<ControlLabel>Password</ControlLabel>
						<FormControl
							placeholder="e.g. A1%bama!"
							value={this.props.user.password}
							onChange={this.handlePasswordChange}
							type="password" />
						<FormControl.Feedback />

					</FormGroup>
				</OverlayTrigger>

				<FormGroup
					validationState={this.props.validations.confirmPassword}
					controlId="confirmPassword"
					bsSize="small">

					<ControlLabel>Confirm Password</ControlLabel>
					<FormControl
						value={this.props.user.confirmPassword}
						onChange={this.handleConfirmationChange}
						type="password" />
					<FormControl.Feedback />

				</FormGroup>

				<LoaderButton
					block
					bsSize="small"
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
				{ this.props.user.newUser === null
					? this.renderForm()
					: this.renderConfirmationForm() }
			</div>
		);
	}
}

export default withRouter(Signup);
