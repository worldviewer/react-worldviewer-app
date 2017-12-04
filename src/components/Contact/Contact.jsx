import { connect } from 'react-redux';
import ContactComponent from './ContactComponent.jsx';
import { withRouter } from 'react-router-dom';
import { setPyramidStyles, showSnackbar } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		router: state.router,
		pyramid: state.reducer.pyramid
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setPyramidStyles: (styles) => {
			return dispatch(setPyramidStyles(styles));
		},
		showSnackbar: (message, duration) => {
			return dispatch(showSnackbar(message, duration));
		}
	}
};

const Contact = connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactComponent);

export default withRouter(Contact);
