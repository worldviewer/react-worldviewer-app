import React, { Component } from 'react';
import './Help.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import getBigThingsDoneImage from '../../images/get-big-things-done.jpg';

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
							<img src={getBigThingsDoneImage}
								style={{width: '100%'}}
								alt='the future' />
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(HelpComponent);
