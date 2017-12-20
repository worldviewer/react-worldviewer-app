import { connect } from 'react-redux';
import AppComponent from './AppComponent.jsx';
import { deactivateDesktopText, activateDesktopText, deactivateFeedText, activateFeedText, deactivateFeedImage, setUserTokenLoading, unsetUserTokenLoading, setUserToken, setTokenFetchComplete, setCredentialsFetchComplete, setSlugsFetchComplete, setCardSlugs, setSlugsLoading, unsetSlugsLoading, setAppLoading, unsetAppLoading, clearUser, setSearchFacet, setSearchQuery, showSnackbar, selectFeed, unselectFeed, selectFacet, setNewUserInstructionsState, setPyramidStyles, setCardStackLevel, setDiscourseLevel } from '../redux.js';
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
		card: state.reducer.card,
		snackbar: state.reducer.snackbar,
		discourse: state.reducer.discourse,
		instructions: state.reducer.instructions,
		pyramid: state.reducer.pyramid,
		mainStack: state.reducer.mainStack,
		app: state.reducer.app,
		feedStack: state.reducer.feedStack,
		desktop: state.reducer.desktop
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
		setSearchFacet: (facetCategory, facetSubCategory, facets) => {
			return dispatch(setSearchFacet(facetCategory, facetSubCategory, facets));
		},
		setSearchQuery: (query) => {
			return dispatch(setSearchQuery(query));
		},
		showSnackbar: (message, duration) => {
			return dispatch(showSnackbar(message, duration));
		},
		selectFeed: (levelNumber) => {
			return dispatch(selectFeed(levelNumber));
		},
		unselectFeed: () => {
			return dispatch(unselectFeed());
		},
		selectFacet: () => {
			return dispatch(selectFacet());
		},
		setNewUserInstructionsState: (instructions) => {
			return dispatch(setNewUserInstructionsState(instructions));
		},
		setPyramidStyles: (styles) => {
			return dispatch(setPyramidStyles(styles));
		},
		deactivateFeedImage: (levelName) => {
			return dispatch(deactivateFeedImage(levelName));
		},
		activateFeedText: (levelName) => {
			return dispatch(activateFeedText(levelName));
		},
		deactivateFeedText: (levelName) => {
			return dispatch(deactivateFeedText(levelName));
		},
		activateDesktopText: () => {
			return dispatch(activateDesktopText());
		},
		deactivateDesktopText: () => {
			return dispatch(deactivateDesktopText());
		},
		setCardStackLevel: (levelNumber, direction) => {
			return dispatch(setCardStackLevel(levelNumber, direction));
		},
		setDiscourseLevel: (levelNumber, direction) => {
			return dispatch(setDiscourseLevel(levelNumber, direction));
		}
	}
};

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppComponent);

export default withRouter(App);
