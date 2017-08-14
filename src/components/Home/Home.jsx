import { connect } from 'react-redux';
import HomeComponent from './HomeComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setAlert, dismissAlert, setCardSlugs } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.reducer.user,
		slugs: state.reducer.slugs
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setAlert: (title, message) => {
			return dispatch(setAlert(title, message));
		},
		dismissAlert: () => {
			return dispatch(dismissAlert());
		},
		setCardSlugs: (slugsHash) => {
			return dispatch(setCardSlugs(slugsHash));
		}
	}
};

const Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeComponent);

export default withRouter(Home);
