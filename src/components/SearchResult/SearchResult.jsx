import { connect } from 'react-redux';
import SearchResultComponent from './SearchResultComponent.jsx';
import { withRouter } from 'react-router-dom';
import { showSnackbar, setSearchQuery, setSearchState } from '../../redux.js';

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
		},
		setSearchQuery: (query) => {
			return dispatch(setSearchQuery(query));
		},
		setSearchState: (searchState) => {
			return dispatch(setSearchState(searchState));
		}
	}
};

const SearchResult = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResultComponent);

export default withRouter(SearchResult);
