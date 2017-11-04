import { connect } from 'react-redux';
import CategorySearchResultComponent from './CategorySearchResultComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setSearchFacet } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		search: state.reducer.search
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setSearchFacet: (facetCategory, facetSubCategory, facetString) => {
			dispatch(setSearchFacet(facetCategory, facetSubCategory, facetString));
		}
	}
};

const CategorySearchResult = connect(
	mapStateToProps,
	mapDispatchToProps
)(CategorySearchResultComponent);

export default withRouter(CategorySearchResult);
