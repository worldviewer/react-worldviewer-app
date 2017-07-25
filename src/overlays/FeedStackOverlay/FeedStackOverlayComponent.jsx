import React, { Component } from 'react';
import './FeedStackOverlay.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class FeedStackOverlayComponent extends Component {
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
		this.props.setFeedStackLevel(index);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.feedStack.level !== this.props.feedStack.level) {
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
			<Grid className="FeedStackOverlay" style={CardStackStyle}>
				<Row>
					<Col xs={4}
						onClick={this.clickHandler.bind(this, 0)}
						className={"StackLabel" +
							(this.props.feedStack.level === 0 ? " active" : "")}>
						List
					</Col>

					<Col xs={4}
						onClick={this.clickHandler.bind(this, 1)}
						className={"StackLabel" +
							(this.props.feedStack.level === 1 ? " active" : "")}>
						Feed
					</Col>

					<Col xs={4}
						onClick={this.clickHandler.bind(this, 2)}
						className={"StackLabel" +
							(this.props.feedStack.level === 2 ? " active" : "")}>
						Comments
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default withRouter(FeedStackOverlayComponent);
