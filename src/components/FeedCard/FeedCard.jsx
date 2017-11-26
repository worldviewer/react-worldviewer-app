import { connect } from 'react-redux';
import FeedCardComponent from './FeedCardComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setFeedStackLevel, unselectFeed } from '../../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.reducer.loading,
		card: state.reducer.card,
		feed: state.reducer.feed,
		feeds: state.reducer.feeds,
		discourse: state.reducer.discourse,
		mainStack: state.reducer.mainStack
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setFeedStackLevel: (level) => {
			return dispatch(setFeedStackLevel(level));
		},
		unselectFeed: () => {
			return dispatch(unselectFeed());
		}
	}
};

const FeedCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedCardComponent);

export default withRouter(FeedCard);
