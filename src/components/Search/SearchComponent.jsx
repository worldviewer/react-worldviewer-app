import React, { Component } from 'react';
import './Search.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

// Permits HTML markup encoding in feed text
// import { Parser as HtmlToReactParser } from 'html-to-react';

class SearchComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div className="Search">
				<Grid>
					<Row>
						<Col>
							<h3><code>Search</code></h3>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}

}

export default withRouter(SearchComponent);
