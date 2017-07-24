import { connect } from 'react-redux';
import HomeComponent from './HomeComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setAlert, dismissAlert } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {...ownProps};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setAlert: (title, message) => {
			return dispatch(setAlert(title, message));
		},
		dismissAlert: () => {
			return dispatch(dismissAlert());
		}
	}
};

const Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeComponent);

export default withRouter(Home);
