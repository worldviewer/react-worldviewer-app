import { connect } from 'react-redux';
import FeedCardComponent from './FeedCardComponent.jsx';
import { withRouter } from 'react-router-dom';
import { toggleNavbarState, setFeedStackLevel } from '../../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.reducer.loading,
		card: state.reducer.card,
		feed: state.reducer.feed,
		discourse: state.reducer.discourse
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		toggleNavbarState: (zoom) => {
			return dispatch(toggleNavbarState(zoom));
		},
		setFeedStackLevel: (level) => {
			return dispatch(setFeedStackLevel(level));
		}
	}
};

const FeedCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedCardComponent);

export default withRouter(FeedCard);
