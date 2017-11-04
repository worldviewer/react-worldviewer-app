import { connect } from 'react-redux';
import SearchResultComponent from './SearchResultComponent.jsx';
import { withRouter } from 'react-router-dom';
import { showSnackbar } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.reducer.user,
		search: state.reducer.search
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		showSnackbar: (message, duration) => {
			return dispatch(showSnackbar(message, duration));
		}
	}
};

const SearchResult = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResultComponent);

export default withRouter(SearchResult);
