import React, { Component } from 'react';
import './Home.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

// Permits HTML markup encoding in feed text
// import { Parser as HtmlToReactParser } from 'html-to-react';

class HomeComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div className="Home">
				<Grid>
					<Row>
						<Col>
							<img
								alt="blind men and the elephant logo"
								src="./elephant.png"
								className="Logo" />
							<p className="testing">Testing 1 2 3 ...</p>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(HomeComponent);
