// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import { Grid, Row } from 'react-bootstrap';
import debounce from 'debounce';
import './CardStack.css';

// Components
import SwipeableViews from 'react-swipeable-views';
import Browser from '../../components/Browser/Browser.jsx';
import FeedCard from '../../components/FeedCard/FeedCard.jsx';
import FeedCardList from '../../components/FeedCardList/FeedCardList.jsx';
import SwipeOverlay from '../../components/SwipeOverlay/SwipeOverlay.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

class CardStackComponent extends Component {
	constructor(props) {
		super(props);

		injectTapEventPlugin();

		this.state = {
			id: null
		}

		this.props = props;
		// this.handleSwipe = this.handleSwipe.bind(this);
		// this.changeRoute = this.changeRoute.bind(this);

		// this.levels = [
		// 	'worldview',
		// 	'model',
		// 	'propositional',
		// 	'conceptual',
		// 	'narrative'
		// ];

		// this.classNames = [
		// 	'Worldview',
		// 	'Model',
		// 	'Propositional',
		// 	'Conceptual',
		// 	'Narrative'
		// ];

		// // Testing
		// this.route = '/' + this.props.match.params.controversy +
		// 	'/' + this.levels[this.props.discourse.level] +
		// 	(this.props.discourse.level === 0 ? '/card' : '');
	}

	componentDidMount() {
		// this.deactivateSwipeOverlay = debounce(this.props.deactivateSwipeOverlay, this.props.discourse.isFullScreen ? 3000 : 6000);

		// window.onscroll = function () { window.scrollTo(0, 0); };
	}

	// handleAssetLoadError(error) {
	// 	console.log('Error loading overlay images ...');
	// 	console.log(error);
	// }

	// handleAssetLoadSuccess() {
	// 	console.log('All assets loaded successfully.');
	// 	this.props.setLoaded();
	// }

	handleSwipe(index, previous) {
		// const
		// 	swipeDirection = index > previous ? 'right' : 'left';

		// this.props.setDiscourseLevel(index, swipeDirection);
		// this.handleSwipeOverlay();
	}

	// When we change routes, we need to update the URL
	changeRoute() {
		// this.props.history.push(route);
	}

	handleSwipeOverlay() {
		// this.props.activateSwipeOverlay();
		// this.deactivateSwipeOverlay();
	}

	showSettings(event) {
		event.preventDefault();
	}

	componentWillReceiveProps(nextProps) {
		// if (nextProps.discourse.level !== this.props.discourse.level) {
		// 	this.deactivateSwipeOverlay();
		// }
	}

	render() {
		const
			// h = new HtmlToReactParser(),

			containerStyles = {
				height: '100vh'
			},

			// currentLevel = this.levels[this.props.discourse.level],
			// upperLevel = currentLevel === 0 ?
			// 	null :
			// 	this.levels[this.props.discourse.level - 1],
			// lowerLevel = currentLevel === 4 ?
			// 	null :
			// 	this.levels[this.props.discourse.level + 1],

			// currentClass = this.classNames[this.props.discourse.level],
			// upperClass = currentLevel === 0 ?
			// 	null :
			// 	this.classNames[this.props.discourse.level - 1],
			// lowerClass = currentLevel === 4 ?
			// 	null :
			// 	this.classNames[this.props.discourse.level + 1];			

			// console.log(upperLevel);
			// console.log(currentLevel);
			// console.log(lowerLevel);

			// console.log(upperClass);
			// console.log(currentClass);
			// console.log(lowerClass);

		return (
			<div ref={c => this.container = c} className="CardStack">
				<Grid>
					<Row>
					
{/*
						<SwipeOverlay
							isFullScreen={this.props.discourse.isFullScreen}
							discourseLevel={this.props.discourse.level}
							active={2}
							discourseHandler={this.props.setDiscourseLevel}
							deactivateOverlayHandler={this.props.deactivateSwipeOverlay} />
*/}

						<SwipeableViews
							axis='x'
							containerStyle={containerStyles}
							resistance
							ignoreNativeScroll
							index={this.props.cardStack.level}
							onChangeIndex={this.handleSwipe}
							onTransitionEnd={this.changeRoute}>

							<div className="Browser">
								<Browser />
							</div>

							<div className="CardText">
								<CardText />
							</div>

							<div className="Card">
								<Card />
							</div>

							<div ClassName="FeedCardList">
								<FeedCardList level="worldview">
							</div>

							<div className="Comments">
								<Comments />
							</div>
						</SwipeableViews>

					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(CardStackComponent);
