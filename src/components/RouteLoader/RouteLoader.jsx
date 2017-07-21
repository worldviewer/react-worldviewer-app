import { connect } from 'react-redux';
import RouteLoaderComponent from './RouteLoaderComponent.jsx';
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

const RouteLoader = connect(
	mapStateToProps,
	mapDispatchToProps
)(RouteLoaderComponent);

export default withRouter(RouteLoader);
