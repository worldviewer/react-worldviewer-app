import { connect } from 'react-redux';
import FeedCardComponent from './FeedCardComponent.jsx';
import { withRouter } from 'react-router-dom';
import { unselectFeed, setFeedDataLoading, unsetFeedDataLoading, setFeedData, activateFeed, deactivateFeed, activateFeedText, deactivateFeedText } from '../../redux';

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
		feedStack: state.reducer.feedStack
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
		activateFeed: (levelName) => {
			return dispatch(activateFeed(levelName));
		},
		deactivateFeed: (levelName) => {
			return dispatch(deactivateFeed(levelName));
		},
		activateFeedText: (levelName) => {
			return dispatch(activateFeedText(levelName));
		},
		deactivateFeedText: (levelName) => {
			return dispatch(deactivateFeedText(levelName));
		}
	}
};

const FeedCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedCardComponent);

export default withRouter(FeedCard);
