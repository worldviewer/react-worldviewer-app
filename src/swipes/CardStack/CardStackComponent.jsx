// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import { Grid, Row } from 'react-bootstrap';
import './CardStack.css';

// Components
import SwipeableViews from 'react-swipeable-views';
import CardText from '../../components/CardText/CardText.jsx';
import Card from '../../components/Card/Card.jsx';
import FeedCard from '../../components/FeedCard/FeedCard.jsx';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

class CardStackComponent extends Component {
	constructor(props) {
		super(props);

		this.props = props;
		this.handleSwipe = this.handleSwipe.bind(this);

		this.levels = [
			'worldview',
			'model',
			'propositional',
			'conceptual',
			'narrative'
		];
	}

	handleSwipe(index, previous) {
		const
			swipeDirection = index > previous ? 'right' : 'left';

		this.props.setCardStackLevel(index, swipeDirection);
	}

	toggleReading() {
		if (this.props.mainStack.swipeable) {
			this.props.disableMainStackSwipeable();
		} else {
			this.props.enableMainStackSwipeable();
		}
	}

	showSettings(event) {
		event.preventDefault();
	}

	render() {
		const
			containerStyles = {
				height: '100vh'
			};

		return (
			<div ref={c => this.container = c} className="CardStack">
				<Grid>
					<Row>
						<SwipeableViews
							axis='x'
							containerStyle={containerStyles}
							disabled={!this.props.mainStack.swipeable}
							resistance
							ignoreNativeScroll
							index={this.props.cardStack.level}
							onChangeIndex={this.handleSwipe}>

							{/* We have to do this because there app needs help differentiating
							    swipes from scrolls ... */}
							<div className="CardText">
								<div className="TextSwitch" onClick={this.toggleReading.bind(this)}>
									{ this.props.mainStack.swipeable ?
										'Click to Read' :
										'Click to Finish Reading' }
								</div>
								<CardText />
							</div>

							<div className="CardStackParent">
								<Card />
							</div>

							<div className="FeedCard">
								<FeedCard level="worldview" />
							</div>
						</SwipeableViews>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(CardStackComponent);
