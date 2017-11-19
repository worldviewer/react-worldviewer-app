// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import { Grid, Row } from 'react-bootstrap';
import './CardStack.css';

// Components
import SwipeableViews from 'react-swipeable-views';
import Browser from '../../components/Browser/Browser.jsx';
import CardText from '../../components/CardText/CardText.jsx';
import Feed from '../../components/Feed/Feed.jsx';
import Card from '../../components/Card/Card.jsx';
import FeedCard from '../../components/FeedCard/FeedCard.jsx';
import FeedCardList from '../../components/FeedCardList/FeedCardList.jsx';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// AWS Dependencies
import { invokeApig } from '../../libs/aws';

// Error/Logger Handling
import { log, logTitle, logObject } from '../../libs/utils';

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

	componentDidMount() {
		// If the slugs finish loading before the component has loaded ...
		if (!this.props.loading.slugs && this.props.fetchComplete.slugs) {
			this.loadCardData();
		}
	}

	componentWillReceiveProps(nextProps) {
		// If the slugs finish loading after the component has mounted ...
		if (!nextProps.loading.slugs &&
			!this.props.fetchComplete.slugs &&
			nextProps.fetchComplete.slugs) {
			
			this.loadCardData();
		}
	}

	async loadCardData() {
		const
			shortSlug = this.props.router.location.pathname.split('/')[1];

		this.props.setCardDataLoading();

		const card = await invokeApig( {base: 'cards', path: '/controversies/' +
			this.props.slugs.hash[shortSlug]}, this.props.user.token);
		this.props.setCardData(card);

		logTitle('Data Step 2: Fetching controversy card data ...');
		logObject(card);
		log('');

		this.props.unsetCardDataLoading();
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

							<div className="Browser">
								<Browser />
							</div>

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

							<div className="FeedCardList">
								<FeedCardList level="worldview" />
							</div>

							<div className="FeedCard">
								<FeedCard level="worldview" />
							</div>

							<div className="Feed">
								<Feed />
							</div>
						</SwipeableViews>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(CardStackComponent);
