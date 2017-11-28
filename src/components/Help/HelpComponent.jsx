import React, { Component } from 'react';
import './Help.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class HelpComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div className="Help">
				<Grid>
					<Row>
						<Col>
							<h3><code>Help</code></h3>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(HelpComponent);
