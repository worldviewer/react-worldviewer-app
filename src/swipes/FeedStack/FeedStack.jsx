import { connect } from 'react-redux';
import FeedStackComponent from './FeedStackComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setDiscourseLevel, activateSwipeOverlay, deactivateSwipeOverlay, setSwipeOverlaySize } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		pathname: state.router.location.pathname,
		discourse: state.reducer.discourse
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setDiscourseLevel: (level, direction) => {
			return dispatch(setDiscourseLevel(level, direction));
		},
		activateSwipeOverlay: (timeoutId) => {
			return dispatch(activateSwipeOverlay(timeoutId));
		},
		deactivateSwipeOverlay: () => {
			return dispatch(deactivateSwipeOverlay());
		},
		setSwipeOverlaySize: (isFullScreen) => {
			return dispatch(setSwipeOverlaySize(isFullScreen));
		}
	};
};

const FeedStack = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedStackComponent);

export default withRouter(FeedStack);
