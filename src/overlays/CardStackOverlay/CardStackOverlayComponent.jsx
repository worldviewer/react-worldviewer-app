import React, { Component } from 'react';
import './CardStackOverlay.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class CardStackOverlayComponent extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	render() {
		return (
			<Grid className="CardStackOverlay">
				<Row>
					<Col xs={2}
						className={"StackLabel" + (this.props.cardStack.level === 0 ? " active" : "")}>
						Browser
					</Col>

					<Col xs={2}
						className={"StackLabel" + (this.props.cardStack.level === 1 ? " active" : "")}>
						Text
					</Col>

					<Col xs={2}
						className={"StackLabel" + (this.props.cardStack.level === 2 ? " active" : "")}>
						Card
					</Col>

					<Col xs={2}
						className={"StackLabel" + (this.props.cardStack.level === 3 ? " active" : "")}>
						List
					</Col>

					<Col xs={2}
						className={"StackLabel" + (this.props.cardStack.level === 4 ? " active" : "")}>
						Feed
					</Col>

					<Col xs={2}
						className={"StackLabel" + (this.props.cardStack.level === 5 ? " active" : "")}>
						Comments
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default withRouter(CardStackOverlayComponent);
