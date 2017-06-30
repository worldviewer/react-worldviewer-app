import { connect } from 'react-redux';
import SwipeOverlayComponent from './SwipeOverlayComponent.jsx';
// import clickOverlay from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		discourse: state.discourse
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps};
};

const SwipeOverlay = connect(
	mapStateToProps,
	mapDispatchToProps
)(SwipeOverlayComponent);

export default SwipeOverlay;
