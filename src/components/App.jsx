import { connect } from 'react-redux';
import AppComponent from './AppComponent.jsx';
import { setUserTokenLoading, unsetUserTokenLoading, setUserToken, setTokenFetchComplete, setCredentialsFetchComplete, setSlugsFetchComplete, setCardSlugs, setSlugsLoading, unsetSlugsLoading, setAppLoading, unsetAppLoading, clearUser, setSearchFacet, setSearchQuery } from '../redux.js';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		fetchComplete: state.reducer.fetchComplete,
		loading: state.reducer.loading,
		cardStack: state.reducer.cardStack,
		navbar: state.reducer.navbar,
		slugs: state.reducer.slugs,
		user: state.reducer.user,
		notification: state.reducer.notification,
		router: state.router,
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
		setCredentialsFetchComplete: () => {
			return dispatch(setCredentialsFetchComplete());
		},
		setSlugsFetchComplete: () => {
			return dispatch(setSlugsFetchComplete());
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
		},
		clearUser: () => {
			return dispatch(clearUser());
		},
		setSearchFacet: (facetCategory, facetSubCategory, facetString) => {
			return dispatch(setSearchFacet(facetCategory, facetSubCategory, facetString));
		},
		setSearchQuery: (query) => {
			return dispatch(setSearchQuery(query));
		}
	}
};

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppComponent);

export default withRouter(App);
