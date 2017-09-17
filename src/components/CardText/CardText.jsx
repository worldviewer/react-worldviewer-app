import { connect } from 'react-redux';
import CardTextComponent from './CardTextComponent.jsx';
import { withRouter } from 'react-router-dom';
// import {  } from '../../redux.js';

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.reducer.loading,
		card: state.reducer.card,
		cardStack: state.reducer.cardStack,
		discourse: state.reducer.discourse
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps}
};

const CardText = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardTextComponent);

export default withRouter(CardText);
