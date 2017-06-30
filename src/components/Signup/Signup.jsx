import { connect } from 'react-redux';
import SignupComponent from './SignupComponent.jsx';
import { setUserTokenLoading, unsetUserTokenLoading, setUsername, setPassword, setNewUser, setPasswordConfirmation, setConfirmationCode, setUserToken } from '../../redux.js';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.reducer.user
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
		setPasswordConfirmation: (confirmPassword) => {
			return dispatch(setPasswordConfirmation(confirmPassword));
		},
		setConfirmationCode: (confirmationCode) => {
			return dispatch(setConfirmationCode(confirmationCode));
		}
	}
};

const Signup = connect(
	mapStateToProps,
	mapDispatchToProps
)(SignupComponent);

export default withRouter(Signup);
