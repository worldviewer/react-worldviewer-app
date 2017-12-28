import { connect } from 'react-redux';
import CardComponent from './CardComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setCardStackLevel, activateFeedImage, setDiscourseLevel, activateDesktopText, deactivateDesktopText, setNewUserInstructionsState, deactivateMainStackOverlay, activateMainStackOverlay, selectFeed, enableMainStackSwipeable, disableMainStackSwipeable } from '../../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.reducer.loading,
		pathname: state.router.location.pathname,
		card: state.reducer.card,
		instructions: state.reducer.instructions,
		app: state.reducer.app,
		desktop: state.reducer.desktop,
		discourse: state.reducer.discourse,
		router: state.router,
		mainStack: state.reducer.mainStack
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setNewUserInstructionsState: (instructions) => {
			return dispatch(setNewUserInstructionsState(instructions));
		},
		activateDesktopText: () => {
			return dispatch(activateDesktopText());
		},
		deactivateDesktopText: () => {
			return dispatch(deactivateDesktopText());
		},
		setDiscourseLevel: (levelNumber, direction) => {
			return dispatch(setDiscourseLevel(levelNumber, direction));
		},
		activateFeedImage: (levelName) => {
			return dispatch(activateFeedImage(levelName));
		},
		setCardStackLevel: (levelNumber, direction) => {
			return dispatch(setCardStackLevel(levelNumber, direction));
		},
		deactivateMainStackOverlay: () => {
			return dispatch(deactivateMainStackOverlay());
		},
		activateMainStackOverlay: () => {
			return dispatch(activateMainStackOverlay());
		},
		selectFeed: (levelNumber) => {
			return dispatch(selectFeed(levelNumber));
		},
		enableMainStackSwipeable: () => {
			return dispatch(enableMainStackSwipeable());
		},
		disableMainStackSwipeable: () => {
			return dispatch(disableMainStackSwipeable());
		}
	};
};

const Card = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardComponent);

export default withRouter(Card);
