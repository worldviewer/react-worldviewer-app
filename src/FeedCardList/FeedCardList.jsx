import { connect } from 'react-redux';
import FeedCardListComponent from './FeedCardListComponent.jsx';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		card: state.card
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps}
};

const FeedCardList = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedCardListComponent);

export default withRouter(FeedCardList);
