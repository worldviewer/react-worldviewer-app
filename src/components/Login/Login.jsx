import { connect } from 'react-redux';
import LoginComponent from './LoginComponent.jsx';
import { setUserToken, setUsername, setPassword, setUserTokenLoading, unsetUserTokenLoading } from '../../redux.js';
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
		}
	};
};

const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginComponent);

export default withRouter(Login);
