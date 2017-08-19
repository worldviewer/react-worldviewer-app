import { connect } from 'react-redux';
import CardStackComponent from './CardStackComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setDiscourseLevel, setCardStackLevel, enableMainStackSwipeable, disableMainStackSwipeable, setCardData, setCardDataLoading, unsetCardDataLoading } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		pathname: state.router.location.pathname,
		discourse: state.reducer.discourse,
		cardStack: state.reducer.cardStack,
		mainStack: state.reducer.mainStack,
		slugs: state.reducer.slugs,
		router: state.router,
		user: state.reducer.user
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setDiscourseLevel: (level, direction) => {
			return dispatch(setDiscourseLevel(level, direction));
		},
		setCardStackLevel: (level, direction) => {
			return dispatch(setCardStackLevel(level, direction));
		},
		enableMainStackSwipeable: () => {
			return dispatch(enableMainStackSwipeable());
		},
		disableMainStackSwipeable: () => {
			return dispatch(disableMainStackSwipeable());
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

const CardStack = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardStackComponent);

export default withRouter(CardStack);
