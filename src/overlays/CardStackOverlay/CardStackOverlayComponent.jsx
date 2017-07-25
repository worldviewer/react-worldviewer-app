import React, { Component } from 'react';
import './CardStackOverlay.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class CardStackOverlayComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false
		};

		this.props = props;
	}

	activateOverlay() {
		this.setState({
			active: true
		});

		clearTimeout(this.timerID);

		this.timerID = setTimeout(() => {
			this.setState({
				active: false
			})
		}, 5000);
	}

	clickHandler(index, event) {
		this.props.setCardStackLevel(index);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.cardStack.level !== this.props.cardStack.level) {
			this.activateOverlay();
		}
	}

	componentDidMount() {
		this.activateOverlay();
	}

	componentWillUnmount() {
		clearTimeout(this.timerID);

		this.setState({
			active: false
		});
	}

	render() {
		const CardStackStyle = {
			bottom: this.state.active ? 0 : -50
		};

		return (
			<Grid className="CardStackOverlay" style={CardStackStyle}>
				<Row>
					<Col xs={2}
						onClick={this.clickHandler.bind(this, 0)}
						className={"StackLabel" +
							(this.props.cardStack.level === 0 ? " active" : "")}>
						Browser
					</Col>

					<Col xs={2}
						onClick={this.clickHandler.bind(this, 1)}
						className={"StackLabel" +
							(this.props.cardStack.level === 1 ? " active" : "")}>
						Text
					</Col>

					<Col xs={2}
						onClick={this.clickHandler.bind(this, 2)}
						className={"StackLabel" +
							(this.props.cardStack.level === 2 ? " active" : "")}>
						Card
					</Col>

					<Col xs={2}
						onClick={this.clickHandler.bind(this, 3)}
						className={"StackLabel" +
							(this.props.cardStack.level === 3 ? " active" : "")}>
						List
					</Col>

					<Col xs={2}
						onClick={this.clickHandler.bind(this, 4)}
						className={"StackLabel" +
							(this.props.cardStack.level === 4 ? " active" : "")}>
						Feed
					</Col>

					<Col xs={2}
						onClick={this.clickHandler.bind(this, 5)}
						className={"StackLabel" +
							(this.props.cardStack.level === 5 ? " active" : "")}>
						Comments
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default withRouter(CardStackOverlayComponent);
