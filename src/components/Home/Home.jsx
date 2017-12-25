import { connect } from 'react-redux';
import HomeComponent from './HomeComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setSearchQuery, setSearchFacet, setSearchState, unselectFacet, setNewUserInstructionsState, setSearchIsActive, unsetSearchIsActive } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.reducer.user,
		slugs: state.reducer.slugs,
		search: state.reducer.search,
		searchState: state.reducer.searchState,
		navbar: state.reducer.navbar,
		instructions: state.reducer.instructions,
		router: state.router,
		desktop: state.reducer.desktop
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setSearchQuery: (query) => {
			return dispatch(setSearchQuery(query));
		},
		setSearchFacet: (facetCategory, facetSubCategory, facets) => {
			return dispatch(setSearchFacet(facetCategory, facetSubCategory, facets));
		},
		setSearchState: (searchState) => {
			return dispatch(setSearchState(searchState));
		},
		unselectFacet: () => {
			return dispatch(unselectFacet());
		},
		setNewUserInstructionsState: (instructions) => {
			return dispatch(setNewUserInstructionsState(instructions));
		},
		setSearchIsActive: () => {
			return dispatch(setSearchIsActive());
		},
		unsetSearchIsActive: () => {
			return dispatch(unsetSearchIsActive());
		}
	}
};

const Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeComponent);

export default withRouter(Home);
