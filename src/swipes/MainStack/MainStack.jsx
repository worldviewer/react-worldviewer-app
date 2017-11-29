import { connect } from 'react-redux';
import { setLoaded, setDiscourseLevel, activateMainStackOverlay,
	deactivateMainStackOverlay, setMainStackOverlaySize, setCardStackLevel, setFeedData, setFeedDataLoading, unsetFeedDataLoading, setFeedsData, setFeedsDataLoading, unsetFeedsDataLoading, setCardData, setCardDataLoading, unsetCardDataLoading, setNewUserInstructionsState } from '../../redux';
import MainStackComponent from './MainStackComponent.jsx';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.reducer.loading,
		fetchComplete: state.reducer.fetchComplete,
		navbar: state.reducer.navbar,
		user: state.reducer.user,
		router: state.router,
		card: state.reducer.card,
		base: state.reducer.base,
		discourse: state.reducer.discourse,
		cardStack: state.reducer.cardStack,
		mainStack: state.reducer.mainStack,
		slugs: state.reducer.slugs,
		feed: state.reducer.feed,
		feeds: state.reducer.feeds,
		instructions: state.reducer.instructions
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
		setFeedData: (feed, level) => {
			return dispatch(setFeedData(feed, level));
		},
		setFeedDataLoading: (level) => {
			return dispatch(setFeedDataLoading(level));
		},
		unsetFeedDataLoading: (level) => {
			return dispatch(unsetFeedDataLoading(level));
		},
		setFeedsData: (worldview, model, propositional, conceptual, narrative) => {
			return dispatch(setFeedsData(worldview, model, propositional, conceptual, narrative));
		},
		setFeedsDataLoading: () => {
			return dispatch(setFeedsDataLoading());
		},
		unsetFeedsDataLoading: () => {
			return dispatch(unsetFeedsDataLoading());
		},
		setCardData: (card) => {
			return dispatch(setCardData(card));
		},
		setCardDataLoading: () => {
			return dispatch(setCardDataLoading());
		},
		unsetCardDataLoading: () => {
			return dispatch(unsetCardDataLoading());
		},
		setNewUserInstructionsState: (instructions) => {
			return dispatch(setNewUserInstructionsState(instructions));
		}
	};
};

const MainStack = connect(
	mapStateToProps,
	mapDispatchToProps
)(MainStackComponent);

export default withRouter(MainStack);
