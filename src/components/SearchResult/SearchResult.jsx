import { connect } from 'react-redux';
import SearchResultComponent from './SearchResultComponent.jsx';
import { withRouter } from 'react-router-dom';
// import { setUserToken } from '../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		hit: state.reducer.hit,
		search: state.reducer.search
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps}
};

const SearchResult = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResultComponent);

export default withRouter(SearchResult);
