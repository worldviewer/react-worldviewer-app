import { connect } from 'react-redux';
import CardComponent from './CardComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setCardStackLevel, activateFeedImage, setDiscourseLevel, activateDesktopText, deactivateDesktopText, setNewUserInstructionsState } from '../../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.reducer.loading,
		pathname: state.router.location.pathname,
		card: state.reducer.card,
		instructions: state.reducer.instructions,
		app: state.reducer.app,
		desktop: state.reducer.desktop
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
		setDiscourseLevel: (level, direction) => {
			return dispatch(setDiscourseLevel(level, direction));
		},
		activateFeedImage: (levelName) => {
			return dispatch(activateFeedImage(levelName));
		},
		setCardStackLevel: (level, direction) => {
			return dispatch(setCardStackLevel(level, direction));
		}
	};
};

const Card = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardComponent);

export default withRouter(Card);
