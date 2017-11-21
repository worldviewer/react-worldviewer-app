import { connect } from 'react-redux';
import FeedComponent from './FeedComponent.jsx';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.reducer.loading,
		feeds: state.reducer.feeds,
		user: state.reducer.user
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps}
};

const Feed = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedComponent);

export default withRouter(Feed);
