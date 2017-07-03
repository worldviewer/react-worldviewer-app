import React, { Component } from 'react';
import './CardText.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

// Permits HTML markup encoding in feed text
// import { Parser as HtmlToReactParser } from 'html-to-react';

class CardTextComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div className="CardText">
				<Grid>
					<Row>
						<Col>
							<h3><code>CardText</code></h3>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}

}

export default withRouter(CardTextComponent);
