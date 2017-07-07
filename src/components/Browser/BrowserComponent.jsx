import React, { Component } from 'react';
import './Browser.css';
import { withRouter } from 'react-router-dom';

class BrowserComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div>
				<h3><code>Browser</code></h3>
			</div>
		);
	}
}

export default withRouter(BrowserComponent);
