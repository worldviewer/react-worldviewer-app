import React, { Component } from 'react';
import './Browser.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
// import s3bucket from 'https://s3-us-west-2.amazonaws.com/controversy-cards-images/halton-arp-the-modern-galileo/thumbnail.jpg';

class BrowserComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div className="Browser">
				<Grid>
					<Row>
						<Col>
							<h3><code>Browser</code></h3>
							{/* <img src={s3bucket} alt="stuff" /> */}
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(BrowserComponent);
