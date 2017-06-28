import React, { Component } from 'react';
import './Comments.scss';
import { withRouter } from 'react-router-dom';

// Permits HTML markup encoding in feed text
// import { Parser as HtmlToReactParser } from 'html-to-react';

class CommentsComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div>
				<h3><code>Comments</code></h3>
			</div>
		);
	}

}

export default withRouter(CommentsComponent);
