import { connect } from 'react-redux';
import { setLoaded, setDiscourseLevel, activateMainStackOverlay,
	deactivateMainStackOverlay, setMainStackOverlaySize, setCardStackLevel, setCardData, setCardDataLoading, unsetCardDataLoading } from '../../redux';
import MainStackComponent from './MainStackComponent.jsx';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.reducer.user,
		router: state.router,
		card: state.reducer.card,
		base: state.reducer.base,
		discourse: state.reducer.discourse,
		cardStack: state.reducer.cardStack,
		feedStack: state.reducer.feedStack,
		slugs: state.reducer.slugs
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
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
		},
		setCardData: (card) => {
			return dispatch(setCardData(card));
		},
		setCardDataLoading: () => {
			return dispatch(setCardDataLoading());
		},
		unsetCardDataLoading: () => {
			return dispatch(unsetCardDataLoading());
		}
	};
};

const MainStack = connect(
	mapStateToProps,
	mapDispatchToProps
)(MainStackComponent);

export default withRouter(MainStack);
