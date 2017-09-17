import { connect } from 'react-redux';
import HomeComponent from './HomeComponent.jsx';
import { withRouter } from 'react-router-dom';
// import { setCardSlugs } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.reducer.user,
		slugs: state.reducer.slugs
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps}
};

const Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeComponent);

export default withRouter(Home);
