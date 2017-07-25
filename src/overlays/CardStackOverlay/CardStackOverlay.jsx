import { connect } from 'react-redux';
import CardStackOverlayComponent from './CardStackOverlayComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setCardStackLevel } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		cardStack: state.reducer.cardStack
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setCardStackLevel: (level) => {
			dispatch(setCardStackLevel(level));
		}
	}
};

const CardStackOverlay = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardStackOverlayComponent);

export default withRouter(CardStackOverlay);
