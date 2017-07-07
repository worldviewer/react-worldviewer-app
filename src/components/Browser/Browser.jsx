import { connect } from 'react-redux';
import BrowserComponent from './BrowserComponent.jsx';
import { withRouter } from 'react-router-dom';
// import { setUserToken } from '../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		card: state.reducer.card
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps};
};

const Browser = connect(
	mapStateToProps,
	mapDispatchToProps
)(BrowserComponent);

export default withRouter(Browser);
