import { connect } from 'react-redux';
import CardComponent from './CardComponent.jsx';
import { withRouter } from 'react-router-dom';
import { toggleNavbarState } from '../../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.reducer.loading,
		pathname: state.router.location.pathname,
		card: state.reducer.card
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		toggleNavbarState: (zoom) => {
			return dispatch(toggleNavbarState(zoom));
		}
	};
};

const Card = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardComponent);

export default withRouter(Card);
