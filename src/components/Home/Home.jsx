import { connect } from 'react-redux';
import HomeComponent from './HomeComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setSearchFacet, setHitHappens, unsetHitHappens } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.reducer.user,
		slugs: state.reducer.slugs,
		search: state.reducer.search
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setSearchFacet: (facetCategory, facetSubCategory) => {
			return dispatch(setSearchFacet(facetCategory, facetSubCategory));
		},
		setHitHappens: () => {
			return dispatch(setHitHappens());
		},
		unsetHitHappens: () => {
			return dispatch(unsetHitHappens());
		}
	}
};

const Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeComponent);

export default withRouter(Home);
