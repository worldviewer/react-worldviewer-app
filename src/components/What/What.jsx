import { connect } from 'react-redux';
import WhatComponent from './WhatComponent.jsx';
import { withRouter } from 'react-router-dom';
// import { setUserToken } from '../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {...ownProps};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps};
};

const What = connect(
	mapStateToProps,
	mapDispatchToProps
)(WhatComponent);

export default withRouter(What);
