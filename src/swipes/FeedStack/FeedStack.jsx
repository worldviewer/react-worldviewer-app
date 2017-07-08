import { connect } from 'react-redux';
import FeedStackComponent from './FeedStackComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setFeedStackLevel } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		pathname: state.router.location.pathname,
		feedStack: state.reducer.feedStack,
		discourse: state.reducer.discourse
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setFeedStackLevel: (level, direction) => {
			return dispatch(setFeedStackLevel(level, direction));
		}
	};
};

const FeedStack = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedStackComponent);

export default withRouter(FeedStack);
