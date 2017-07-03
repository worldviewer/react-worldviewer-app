import React, { Component } from 'react';
import './Comments.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

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
			<div className="Comments">
				<Grid>
					<Row>
						<Col>
							<h3><code>Comments</code></h3>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}

}

export default withRouter(CommentsComponent);
