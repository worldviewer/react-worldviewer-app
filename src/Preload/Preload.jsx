import { connect } from 'react-redux';
import { fetchCard, fetchCardRequest, fetchCardSuccess, fetchCardError } from '../redux';
import PreloadComponent from './PreloadComponent.jsx';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
	return {
		card: state.card,
		base: state.base,
		overlays: state.overlays,
		urls: state.urls
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchCard: (id, url) => {
			return dispatch(fetchCard(id, url));
		},
		fetchCardRequest: (id) => {
			return dispatch(fetchCardRequest(id));
		},
		fetchCardSuccess: (json) => {
			return dispatch(fetchCardSuccess(json));
		},
		fetchCardError: (error) => {
			return dispatch(fetchCardError(error));
		}		
	};
};

const Preload = connect(
	mapStateToProps,
	mapDispatchToProps
)(PreloadComponent);

export default withRouter(Preload);