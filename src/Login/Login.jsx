import { connect } from 'react-redux';
import LoginComponent from './LoginComponent.jsx';
import { setUserToken } from '../redux.js';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		userToken: state.reducer.user.token
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setUserToken: (token) => {
			return dispatch(setUserToken(token));
		}
	};
};

const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginComponent);

export default withRouter(Login);
