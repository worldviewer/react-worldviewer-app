import { connect } from 'react-redux';
import SignupComponent from './SignupComponent.jsx';
import { setUserTokenLoading, unsetUserTokenLoading, setUsername, setPassword, setNewUser, setAlert, dismissAlert, setPasswordConfirmation, setConfirmationCode, setUserToken, setPasswordValidation, setUsernameValidation, setConfirmPasswordValidation } from '../../redux.js';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.reducer.user,
		validations: state.reducer.validations,
		notification: state.reducer.notification
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setUserToken: (token) => {
			return dispatch(setUserToken(token));
		},
		setUserTokenLoading: () => {
			return dispatch(setUserTokenLoading());
		},
		unsetUserTokenLoading: () => {
			return dispatch(unsetUserTokenLoading());
		},
		setUsername: (username) => {
			return dispatch(setUsername(username));
		},
		setPassword: (password) => {
			return dispatch(setPassword(password));
		},
		setNewUser: (newUser) => {
			return dispatch(setNewUser(newUser));
		},
		setAlert: (title, message) => {
			return dispatch(setAlert(title, message));
		},
		dismissAlert: () => {
			return dispatch(dismissAlert());
		},
		setPasswordConfirmation: (confirmPassword) => {
			return dispatch(setPasswordConfirmation(confirmPassword));
		},
		setConfirmationCode: (confirmationCode) => {
			return dispatch(setConfirmationCode(confirmationCode));
		},
		setUsernameValidation: (validation) => {
			return dispatch(setUsernameValidation(validation));
		},
		setPasswordValidation: (validation) => {
			return dispatch(setPasswordValidation(validation));
		},
		setConfirmPasswordValidation: (validation) => {
			return dispatch(setConfirmPasswordValidation(validation));
		}
	}
};

const Signup = connect(
	mapStateToProps,
	mapDispatchToProps
)(SignupComponent);

export default withRouter(Signup);
