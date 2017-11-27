import { connect } from 'react-redux';
import FeedCardComponent from './FeedCardComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setFeedStackLevel, unselectFeed, setFeedDataLoading, unsetFeedDataLoading, setFeedData } from '../../redux';

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
		router: state.router
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setFeedStackLevel: (level) => {
			return dispatch(setFeedStackLevel(level));
		},
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
		}
	}
};

const FeedCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedCardComponent);

export default withRouter(FeedCard);
