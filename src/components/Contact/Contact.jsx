import { connect } from 'react-redux';
import ContactComponent from './ContactComponent.jsx';
import { withRouter } from 'react-router-dom';
// import { setUserToken } from '../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {...ownProps};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps}
};

const Contact = connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactComponent);

export default withRouter(Contact);
