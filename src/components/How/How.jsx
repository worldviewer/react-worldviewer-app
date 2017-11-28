import { connect } from 'react-redux';
import HowComponent from './HowComponent.jsx';
import { withRouter } from 'react-router-dom';
// import { setUserToken } from '../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {...ownProps};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps};
};

const How = connect(
	mapStateToProps,
	mapDispatchToProps
)(HowComponent);

export default withRouter(How);
