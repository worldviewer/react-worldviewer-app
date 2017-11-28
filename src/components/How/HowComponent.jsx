import React, { Component } from 'react';
import './How.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class HowComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div className="How">
				<Grid>
					<Row>
						<Col>
							<h3><code>How</code></h3>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(HowComponent);
