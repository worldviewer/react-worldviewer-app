import React, { Component } from 'react';
import './Home.scss';
import { withRouter } from 'react-router-dom';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

class HomeComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div>
				<h3><code>Home</code></h3>
			</div>
		);
	}

}

export default withRouter(HomeComponent);