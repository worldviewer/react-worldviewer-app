import { connect } from 'react-redux';
import CardStackComponent from './CardStackComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setDiscourseLevel, activateSwipeOverlay, deactivateSwipeOverlay, setSwipeOverlaySize, setCardStackLevel } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		pathname: state.router.location.pathname,
		discourse: state.reducer.discourse,
		cardStack: state.reducer.cardStack
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
		},
		setCardStackLevel: (level, direction) => {
			return dispatch(setCardStackLevel(level, direction));
		}
	};
};

const CardStack = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardStackComponent);

export default withRouter(CardStack);
