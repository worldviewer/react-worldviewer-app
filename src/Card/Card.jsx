import { connect } from 'react-redux';
import { fetchCard, fetchCardRequest, fetchCardSuccess, fetchCardError,
	setLoaded, setDiscourseLevel, activateSwipeOverlay,
	deactivateSwipeOverlay, setSwipeOverlaySize } from '../redux';
import CardComponent from './CardComponent.jsx';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		card: state.reducer.card,
		base: state.reducer.base,
		discourse: state.reducer.discourse
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchCard: (id, url) => {
			return dispatch(fetchCard(id, url));
		},
		fetchCardRequest: (id) => {
			return dispatch(fetchCardRequest(id));
		},
		fetchCardSuccess: (json) => {
			return dispatch(fetchCardSuccess(json));
		},
		fetchCardError: (error) => {
			return dispatch(fetchCardError(error));
		},
		setLoaded: () => {
			return dispatch(setLoaded());
		},
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

const Card = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardComponent);

export default withRouter(Card);
