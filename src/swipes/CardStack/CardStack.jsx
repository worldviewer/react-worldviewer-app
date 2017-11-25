import { connect } from 'react-redux';
import CardStackComponent from './CardStackComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setDiscourseLevel, setCardStackLevel, enableMainStackSwipeable, disableMainStackSwipeable } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.reducer.loading,
		fetchComplete: state.reducer.fetchComplete,
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
		}
	};
};

const CardStack = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardStackComponent);

export default withRouter(CardStack);
