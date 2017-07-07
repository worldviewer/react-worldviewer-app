import React, { Component } from 'react';
import './Card.css';
import { withRouter } from 'react-router-dom';

class CardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div>
				<h3><code>Card</code></h3>
			</div>
		);
	}
}

export default withRouter(CardComponent);
