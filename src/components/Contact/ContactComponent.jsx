import React, { Component } from 'react';
import './Contact.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class ContactComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div className="Contact">
				<Grid>
					<Row>
						<Col>
							<h3><code>Contact</code></h3>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(ContactComponent);
