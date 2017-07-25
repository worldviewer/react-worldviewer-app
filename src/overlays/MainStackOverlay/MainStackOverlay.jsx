import { connect } from 'react-redux';
import MainStackOverlayComponent from './MainStackOverlayComponent.jsx';
// import clickOverlay from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		discourse: state.discourse
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps};
};

const MainStackOverlay = connect(
	mapStateToProps,
	mapDispatchToProps
)(MainStackOverlayComponent);

export default MainStackOverlay;
