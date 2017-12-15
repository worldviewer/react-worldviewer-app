import { connect } from 'react-redux';
import FeedCardComponent from './FeedCardComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setDiscourseLevel, unselectFeed, setFeedDataLoading, unsetFeedDataLoading, setFeedData, activateFeedImage, deactivateFeedImage, activateFeedText, deactivateFeedText, activateFeedImageAndText, enableMainStackSwipeable, disableMainStackSwipeable } from '../../redux';

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
		unselectFeed: () => {
			return dispatch(unselectFeed());
		},
		setFeedDataLoading: (level) => {
			return dispatch(setFeedDataLoading(level));
		},
		unsetFeedDataLoading: (level) => {
			return dispatch(unsetFeedDataLoading(level));
		},
		setFeedData: (feed, level) => {
			return dispatch(setFeedData(feed, level));
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
		setDiscourseLevel: (level, direction) => {
			return dispatch(setDiscourseLevel(level, direction));
		}
	}
};

const FeedCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedCardComponent);

export default withRouter(FeedCard);
