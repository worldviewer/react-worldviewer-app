import { connect } from 'react-redux';
import AppComponent from './AppComponent.jsx';
import { setUserTokenLoading, unsetUserTokenLoading, setUserToken, setTokenFetchComplete, setAlert, dismissAlert, setCardSlugs, setSlugsLoading, unsetSlugsLoading, setAppLoading, unsetAppLoading } from '../redux.js';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		cardStack: state.reducer.cardStack,
		navbar: state.reducer.navbar,
		slugs: state.reducer.slugs,
		user: state.reducer.user,
		notification: state.reducer.notification,
		router: state.router,
		app: state.reducer.app,
		feeds: state.reducer.feeds,
		feed: state.reducer.feed,
		card: state.reducer.card
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
		setTokenFetchComplete: () => {
			return dispatch(setTokenFetchComplete());
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
		},
		setAppLoading: () => {
			return dispatch(setAppLoading());
		},
		unsetAppLoading: () => {
			return dispatch(unsetAppLoading());
		}
	}
};

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppComponent);

export default withRouter(App);
