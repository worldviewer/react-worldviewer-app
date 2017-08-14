import { connect } from 'react-redux';
import AppComponent from './AppComponent.jsx';
import { setUserTokenLoading, unsetUserTokenLoading, setUserToken, setAlert, dismissAlert, setCardSlugs, setSlugsLoading, unsetSlugsLoading } from '../redux.js';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		slugs: state.reducer.slugs,
		user: state.reducer.user,
		notification: state.reducer.notification,
		router: state.router
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
		},
		setCardSlugs: (slugsHash) => {
			return dispatch(setCardSlugs(slugsHash));
		},
		setSlugsLoading: () => {
			return dispatch(setSlugsLoading());
		},
		unsetSlugsLoading: () => {
			return dispatch(unsetSlugsLoading());
		}
	}
};

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppComponent);

export default withRouter(App);
