import { connect } from 'react-redux';
import FeedCardComponent from './FeedCardComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setDiscourseLevel, selectFeed, unselectFeed, setFeedDataLoading, unsetFeedDataLoading, setFeedData, activateFeedImage, deactivateFeedImage, activateFeedText, deactivateFeedText, activateFeedImageAndText, enableMainStackSwipeable, disableMainStackSwipeable, deactivateMainStackOverlay, activateMainStackOverlay, setCardStackLevel } from '../../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.reducer.loading,
		card: state.reducer.card,
		feed: state.reducer.feed,
		feeds: state.reducer.feeds,
		slugs: state.reducer.slugs,
		discourse: state.reducer.discourse,
		mainStack: state.reducer.mainStack,
		user: state.reducer.user,
		router: state.router,
		feedStack: state.reducer.feedStack,
		app: state.reducer.app
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		selectFeed: (levelNumber) => {
			return dispatch(selectFeed(levelNumber));
		},
		unselectFeed: () => {
			return dispatch(unselectFeed());
		},
		setFeedDataLoading: (levelName) => {
			return dispatch(setFeedDataLoading(levelName));
		},
		unsetFeedDataLoading: (levelName) => {
			return dispatch(unsetFeedDataLoading(levelName));
		},
		setFeedData: (feed, levelName) => {
			return dispatch(setFeedData(feed, levelName));
		},
		activateFeedImage: (levelName) => {
			return dispatch(activateFeedImage(levelName));
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
		activateFeedImageAndText: (levelName) => {
			return dispatch(activateFeedImageAndText(levelName));
		},
		enableMainStackSwipeable: () => {
			return dispatch(enableMainStackSwipeable());
		},
		disableMainStackSwipeable: () => {
			return dispatch(disableMainStackSwipeable());
		},
		setDiscourseLevel: (levelNumber, direction) => {
			return dispatch(setDiscourseLevel(levelNumber, direction));
		},
		deactivateMainStackOverlay: () => {
			return dispatch(deactivateMainStackOverlay());
		},
		activateMainStackOverlay: () => {
			return dispatch(activateMainStackOverlay());
		},
		setCardStackLevel: (levelNumber, direction) => {
			return dispatch(setCardStackLevel(levelNumber, direction));
		}
	}
};

const FeedCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedCardComponent);

export default withRouter(FeedCard);
