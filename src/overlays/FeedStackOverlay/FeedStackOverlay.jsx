import { connect } from 'react-redux';
import FeedStackOverlayComponent from './FeedStackOverlayComponent.jsx';
import { withRouter } from 'react-router-dom';
// import { setUserToken } from '../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		feedStack: state.reducer.feedStack
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps}
};

const FeedStackOverlay = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedStackOverlayComponent);

export default withRouter(FeedStackOverlay);
