import { connect } from 'react-redux';
import CategorySearchResultComponent from './CategorySearchResultComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setSearchFacet, setSearchQuery } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		search: state.reducer.search
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setSearchFacet: (facetCategory, facetSubCategory, facets) => {
			return dispatch(setSearchFacet(facetCategory, facetSubCategory, facets));
		},
		setSearchQuery: (query) => {
			return dispatch(setSearchQuery(query));
		}
	}
};

const CategorySearchResult = connect(
	mapStateToProps,
	mapDispatchToProps
)(CategorySearchResultComponent);

export default withRouter(CategorySearchResult);
