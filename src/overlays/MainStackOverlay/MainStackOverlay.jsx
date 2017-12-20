import { connect } from 'react-redux';
import MainStackOverlayComponent from './MainStackOverlayComponent.jsx';
// import clickOverlay from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		discourse: state.reducer.discourse,
		app: state.reducer.app,
		feeds: state.reducer.feeds
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
