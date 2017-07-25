// React Dependencies
import React, {Component} from 'react';

// UI Dependencies
import { Grid, Row } from 'react-bootstrap';
import debounce from 'debounce';
import './MainStack.css';

// Components
// import Preload from '../Preload/Preload.jsx';
import SwipeableViews from 'react-swipeable-views';
import CardStack from '../CardStack/CardStack';
import FeedStack from '../FeedStack/FeedStack';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Overlays
import SwipeOverlay from '../../overlays/SwipeOverlay/SwipeOverlay';
import FeedStackOverlay from '../../overlays/FeedStackOverlay/FeedStackOverlay';
import CardStackOverlay from '../../overlays/CardStackOverlay/CardStackOverlay';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// Permits HTML markup encoding in controversy card text
// import { Parser as HtmlToReactParser } from 'html-to-react';

class MainStackComponent extends Component {
	constructor(props, match) {
		super(props);

		injectTapEventPlugin();

		this.state = {
			id: null
		}

		this.props = props;

		this.discourseLevels = [
			'worldview',
			'model',
			'propositional',
			'conceptual',
			'narrative'
		];

		this.cardStackLevels = [
			'/browser',
			'/text',
			'/card',
			'',
			'/' + this.props.match.params.feed || '/feed',
			'/comments'
		];

		this.feedStackLevels = [
			'',
			'/' + (this.props.match.params.feed || 'feed'),
			'/comments'			
		];

		// When we land on this page without swiping, we determine and set the horizontal swipe
		// position according to the cardStackLevel prop passed on by the router
		if (this.props.cardStackLevel) {
			this.props.setCardStackLevel(this.props.cardStackLevel, 'right');			
		}

		// Same sort of situation for discourse level, but we have to also reverse-engineer the
		// discourse level number from the :level route parameter, and we use the discourseLevel
		// router prop to differentiate a landing from a swipe.  On landing, we must set the
		// discourse level (since this is otherwise set by swiping).
		if (this.props.discourseLevel) {
			this.props.setDiscourseLevel(this.discourseLevels.indexOf(this.props.match.params.level), 'up');
		}

		this.handleSwipe = this.handleSwipe.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
	}

	componentDidMount() {
		this.deactivateSwipeOverlay = debounce(this.props.deactivateSwipeOverlay,
			this.props.discourse.isFullScreen ? 3000 : 6000);

		window.onscroll = function () { window.scrollTo(0, 0); };
	}

	handleSwipe(index, previous) {
		const
			swipeDirection = index > previous ? 'up' : 'down';

		this.props.setDiscourseLevel(index, swipeDirection);
		this.handleSwipeOverlay();
	}

	// When we swipe, we need to update the URL.  This may not be the sort of behavior we
	// want for feedStack; it might be better for swiping to always start the person at
	// the FeedList component (?)
	changeRoute() {
		const
			route = '/' + this.props.match.params.controversy +
				'/' + this.discourseLevels[this.props.discourse.level] +
				(this.props.discourse.level === 0 ?
					this.cardStackLevels[this.props.cardStack.level] :
					this.feedStackLevels[this.props.feedStack.level]);

			this.props.history.push(route);
	}

	handleSwipeOverlay() {
		this.props.activateSwipeOverlay();
		this.deactivateSwipeOverlay();
	}

	showSettings(event) {
		event.preventDefault();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.discourse.level !== this.props.discourse.level) {
			this.deactivateSwipeOverlay();
		}
	}

	render() {
		const
			// h = new HtmlToReactParser(),

			containerStyles = {
				height: '100vh'
			};

		return (
			<div ref={c => this.container = c} className="MainStack">
				{ this.props.discourse.level === 0 ?
					<CardStackOverlay /> :
					<FeedStackOverlay /> }

				<Grid>
					<Row>
					
						<SwipeOverlay
							isFullScreen={this.props.discourse.isFullScreen}
							discourseLevel={this.props.discourse.level}
							active={this.props.discourse.overlay}
							discourseHandler={this.props.setDiscourseLevel}
							deactivateOverlayHandler={this.props.deactivateSwipeOverlay} />

						<SwipeableViews
							axis='y'
							containerStyle={containerStyles}
							resistance
							ignoreNativeScroll
							index={this.props.discourse.level}
							onChangeIndex={this.handleSwipe}
							onTransitionEnd={this.changeRoute}>

							<div className="Worldview">
								<CardStack level="worldview" />
							</div>					

							<div className="Model">
								<FeedStack level="model" />
							</div>

							<div className="Propositional">
								<FeedStack level="propositional" />
							</div>

							<div className="Conceptual">
								<FeedStack level="conceptual" />
							</div>

							<div className="Narrative">
								<FeedStack level="narrative" />
							</div>
						</SwipeableViews>

					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(MainStackComponent);
