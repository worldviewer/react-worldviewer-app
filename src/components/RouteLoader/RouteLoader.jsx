import { connect } from 'react-redux';
import RouteLoaderComponent from './RouteLoaderComponent.jsx';
import { withRouter } from 'react-router-dom';
// import { setAlert, dismissAlert } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		router: state.router,
		user: state.reducer.user
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps}
};

const RouteLoader = connect(
	mapStateToProps,
	mapDispatchToProps
)(RouteLoaderComponent);

export default withRouter(RouteLoader);
