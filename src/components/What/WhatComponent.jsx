import React, { Component } from 'react';
import './What.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class WhatComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div className="What">
				<Grid>
					<Row>
						<Col>
							<h3><code>What</code></h3>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(WhatComponent);
