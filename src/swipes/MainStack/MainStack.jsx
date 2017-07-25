import { connect } from 'react-redux';
import { fetchCard, fetchCardRequest, fetchCardSuccess, fetchCardError,
	setLoaded, setDiscourseLevel, activateMainStackOverlay,
	deactivateMainStackOverlay, setMainStackOverlaySize, setCardStackLevel } from '../../redux';
import MainStackComponent from './MainStackComponent.jsx';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		card: state.reducer.card,
		base: state.reducer.base,
		discourse: state.reducer.discourse,
		pathname: state.router.location.pathname,
		cardStack: state.reducer.cardStack,
		feedStack: state.reducer.feedStack
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
		activateMainStackOverlay: (timeoutId) => {
			return dispatch(activateMainStackOverlay(timeoutId));
		},
		deactivateMainStackOverlay: () => {
			return dispatch(deactivateMainStackOverlay());
		},
		setMainStackOverlaySize: (isFullScreen) => {
			return dispatch(setMainStackOverlaySize(isFullScreen));
		},
		setCardStackLevel: (level, direction) => {
			return dispatch(setCardStackLevel(level, direction));
		}
	};
};

const MainStack = connect(
	mapStateToProps,
	mapDispatchToProps
)(MainStackComponent);

export default withRouter(MainStack);
