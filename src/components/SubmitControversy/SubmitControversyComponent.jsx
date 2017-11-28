import React, { Component } from 'react';
import './SubmitControversy.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class SubmitControversyComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div className="SubmitControversy">
				<Grid>
					<Row>
						<Col>
							<h3><code>SubmitControversy</code></h3>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(SubmitControversyComponent);
