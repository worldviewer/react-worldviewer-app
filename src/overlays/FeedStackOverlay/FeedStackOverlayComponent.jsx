import React, { Component } from 'react';
import './FeedStackOverlay.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class FeedStackOverlayComponent extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	render() {
		return (
			<Grid className="FeedStackOverlay">
				<Row>
					<Col xs={4}
						className={"StackLabel" + (this.props.feedStack.level === 0 ? " active" : "")}>
						List
					</Col>

					<Col xs={4}
						className={"StackLabel" + (this.props.feedStack.level === 1 ? " active" : "")}>
						Feed
					</Col>

					<Col xs={4}
						className={"StackLabel" + (this.props.feedStack.level === 2 ? " active" : "")}>
						Comments
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default withRouter(FeedStackOverlayComponent);
