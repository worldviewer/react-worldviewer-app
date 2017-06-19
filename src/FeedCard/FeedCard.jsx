import { connect } from 'react-redux';
import FeedCardComponent from './FeedCardComponent.jsx';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		card: state.card
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps}
};

const FeedCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedCardComponent);

export default withRouter(FeedCard);
