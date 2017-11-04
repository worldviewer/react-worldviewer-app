import { connect } from 'react-redux';
import CategorySearchResultComponent from './CategorySearchResultComponent.jsx';
import { withRouter } from 'react-router-dom';
// import { setUserToken } from '../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		search: state.reducer.search
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps}
};

const CategorySearchResult = connect(
	mapStateToProps,
	mapDispatchToProps
)(CategorySearchResultComponent);

export default withRouter(CategorySearchResult);
