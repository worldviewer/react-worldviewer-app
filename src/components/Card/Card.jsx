import { connect } from 'react-redux';
import CardComponent from './CardComponent.jsx';
import { withRouter } from 'react-router-dom';
import { activateDesktopText, deactivateDesktopText, setNewUserInstructionsState } from '../../redux';

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
		}
	};
};

const Card = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardComponent);

export default withRouter(Card);
