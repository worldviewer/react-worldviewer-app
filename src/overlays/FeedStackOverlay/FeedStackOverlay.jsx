import { connect } from 'react-redux';
import FeedStackOverlayComponent from './FeedStackOverlayComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setFeedStackLevel } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		feedStack: state.reducer.feedStack
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setFeedStackLevel: (level) => {
			dispatch(setFeedStackLevel(level));
		}
	}
};

const FeedStackOverlay = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedStackOverlayComponent);

export default withRouter(FeedStackOverlay);
