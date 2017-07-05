import { connect } from 'react-redux';
import AppComponent from './AppComponent.jsx';
import { setUserTokenLoading, unsetUserTokenLoading, setUserToken, setAlert, dismissAlert } from '../redux.js';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.reducer.user,
		notification: state.reducer.notification,
		pathname: state.router.location.pathname
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setUserTokenLoading: () => {
			return dispatch(setUserTokenLoading());
		},
		unsetUserTokenLoading: () => {
			return dispatch(unsetUserTokenLoading());
		},
		setUserToken: (token) => {
			return dispatch(setUserToken(token));
		},
		setAlert: (title, message) => {
			return dispatch(setAlert(title, message));
		},
		dismissAlert: () => {
			return dispatch(dismissAlert());
		}
	}
};

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppComponent);

export default withRouter(App);
