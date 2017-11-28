import { connect } from 'react-redux';
import SubmitControversyComponent from './SubmitControversyComponent.jsx';
import { withRouter } from 'react-router-dom';
// import { setUserToken } from '../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {...ownProps};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps};
};

const SubmitControversy = connect(
	mapStateToProps,
	mapDispatchToProps
)(SubmitControversyComponent);

export default withRouter(SubmitControversy);
