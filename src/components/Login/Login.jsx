import { connect } from 'react-redux';
import LoginComponent from './LoginComponent.jsx';
import { setUserToken, setUsername, setPassword, setUserTokenLoading, unsetUserTokenLoading, setAlert, dismissAlert } from '../../redux.js';
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
		setAlert: (title, message) => {
			return dispatch(setAlert(title, message));
		},
		dismissAlert: () => {
			return dispatch(dismissAlert());
		}
	};
};

const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginComponent);

export default withRouter(Login);
