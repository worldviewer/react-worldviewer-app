import { connect } from 'react-redux';
import FeedComponent from './FeedComponent.jsx';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		card: state.card
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
