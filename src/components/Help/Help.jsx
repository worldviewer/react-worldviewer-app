import { connect } from 'react-redux';
import HelpComponent from './HelpComponent.jsx';
import { withRouter } from 'react-router-dom';
// import { setUserToken } from '../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {...ownProps};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps};
};

const Help = connect(
	mapStateToProps,
	mapDispatchToProps
)(HelpComponent);

export default withRouter(Help);
