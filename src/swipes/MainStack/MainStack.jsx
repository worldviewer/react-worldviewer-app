import { connect } from 'react-redux';
import { setLoaded, setDiscourseLevel, activateMainStackOverlay,
	deactivateMainStackOverlay, setMainStackOverlaySize, setCardStackLevel, setFeedData, setFeedDataLoading, unsetFeedDataLoading, setFeedsData, setFeedsDataLoading, unsetFeedsDataLoading, setCardDataLoading } from '../../redux';
import MainStackComponent from './MainStackComponent.jsx';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.reducer.loading,
		fetchComplete: state.reducer.fetchComplete,
		navbar: state.reducer.navbar,
		user: state.reducer.user,
		router: state.router,
		card: state.reducer.card,
		base: state.reducer.base,
		discourse: state.reducer.discourse,
		cardStack: state.reducer.cardStack,
		feedStack: state.reducer.feedStack,
		mainStack: state.reducer.mainStack,
		slugs: state.reducer.slugs,
		feed: state.reducer.feed,
		feeds: state.reducer.feeds
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setLoaded: () => {
			return dispatch(setLoaded());
		},
		setDiscourseLevel: (level, direction) => {
			return dispatch(setDiscourseLevel(level, direction));
		},
		activateMainStackOverlay: (timeoutId) => {
			return dispatch(activateMainStackOverlay(timeoutId));
		},
		deactivateMainStackOverlay: () => {
			return dispatch(deactivateMainStackOverlay());
		},
		setMainStackOverlaySize: (isFullScreen) => {
			return dispatch(setMainStackOverlaySize(isFullScreen));
		},
		setCardStackLevel: (level, direction) => {
			return dispatch(setCardStackLevel(level, direction));
		},
		setFeedData: (feed) => {
			return dispatch(setFeedData(feed));
		},
		setFeedDataLoading: () => {
			return dispatch(setFeedDataLoading());
		},
		unsetFeedDataLoading: () => {
			return dispatch(unsetFeedDataLoading());
		},
		setFeedsData: (feedsList) => {
			return dispatch(setFeedsData(feedsList));
		},
		setFeedsDataLoading: () => {
			return dispatch(setFeedsDataLoading());
		},
		unsetFeedsDataLoading: () => {
			return dispatch(unsetFeedsDataLoading());
		},
		setCardDataLoading: () => {
			return dispatch(setCardDataLoading());
		}
	};
};

const MainStack = connect(
	mapStateToProps,
	mapDispatchToProps
)(MainStackComponent);

export default withRouter(MainStack);
