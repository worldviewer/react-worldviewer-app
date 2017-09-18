// React Dependencies
import React, {Component} from 'react';

// UI Dependencies
import { Grid, Row } from 'react-bootstrap';
import debounce from 'debounce';
import './MainStack.css';

// Components
import SwipeableViews from 'react-swipeable-views';
import CardStack from '../CardStack/CardStack';
import FeedStack from '../FeedStack/FeedStack';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Overlays
import MainStackOverlay from '../../overlays/MainStackOverlay/MainStackOverlay';
import FeedStackOverlay from '../../overlays/FeedStackOverlay/FeedStackOverlay';
import CardStackOverlay from '../../overlays/CardStackOverlay/CardStackOverlay';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// AWS Dependencies
import { invokeApig } from '../../libs/aws';

// Error/Logger Handling
import { log, logTitle, logObject } from '../../libs/utils';

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
			'/' + this.props.match.params.feed || this.props.feed.data.feedSlug,
			'/comments'
		];

		this.feedStackLevels = [
			'',
			'/' + (this.props.match.params.feed || this.props.feed.data.feedSlug),
			'/comments'			
		];

		// When we land on this page without swiping, we determine and set the horizontal swipe
		// position according to the cardStackLevel prop passed on by the router
		if (this.props.cardStackLevel) {
			this.props.setCardStackLevel(this.props.cardStackLevel, 'right');			
		}

		this.parameterDiscourseLevel =
			this.discourseLevels.indexOf(this.props.match.params.level);

		// Same sort of situation for discourse level, but we have to also reverse-engineer the
		// discourse level number from the :level route parameter, and we use the discourseLevel
		// router prop to differentiate a landing from a swipe.  On landing, we must set the
		// discourse level (since this is otherwise set by swiping).
		if (this.props.discourseLevel) {
			this.props.setDiscourseLevel(this.parameterDiscourseLevel, 'up');
		}

		this.handleSwipe = this.handleSwipe.bind(this);
		this.changeRoute = this.changeRoute.bind(this);

		this.props.setFeedDataLoading();
		this.props.setFeedsDataLoading();
	}

	async loadFeedData() {
		const
			shortSlug = this.props.router.location.pathname.split('/')[1],
			cardSlug = this.props.slugs.hash[shortSlug],
			feedSlug = this.props.router.location.pathname.split('/')[4];

		logTitle('Slug data:');
		log('Short slug: ' + shortSlug);
		log('Feed slug: ' + feedSlug);
		log('');

		const feed = await invokeApig( {base: 'feeds', path: '/feeds/' +
			cardSlug + '/' + feedSlug }, this.props.user.token);

		logTitle('Data Step 3: Fetching controversy feed data ...');
		logObject(feed);
		log('');

		this.props.setFeedData(feed);
		this.props.unsetFeedDataLoading();
	}

	async loadFeedsData() {
		const
			shortSlug = this.props.router.location.pathname.split('/')[1],
			cardSlug = this.props.slugs.hash[shortSlug];

		const feedsList = await invokeApig( {base: 'feeds', path: '/feeds/' +
			cardSlug }, this.props.user.token);

		logTitle('Feeds list:');
		logObject(feedsList);
		log('');

		this.props.setFeedsData(feedsList);
		this.props.unsetFeedsDataLoading();
	}

	async componentDidMount() {
		this.deactivateMainStackOverlay = debounce(this.props.deactivateMainStackOverlay,
			this.props.discourse.isFullScreen ? 3000 : 6000);

		// window.onscroll = function () { window.scrollTo(0, 0); };

		// If the slugs finish loading before the component has loaded ...
		if (!this.props.loading.slugs &&
			this.props.fetchComplete.slugs) {

			// We handle this FeedCard data here because we only
			// want to run this once, and we are instantiating 4
			// different instances ...
			await this.loadFeedData();
			await this.loadFeedsData();
		}
	}

	async componentWillReceiveProps(nextProps) {
		if (nextProps.discourse.level !== this.props.discourse.level) {
			this.deactivateMainStackOverlay();
		}

		// If the slugs finish loading after the component has mounted ...
		if (!this.props.fetchComplete.slugs &&
			nextProps.fetchComplete.slugs) {

			await this.loadFeedData();
			await this.loadFeedsData();
		}

		if (nextProps.loading.feed && !this.props.loading.feed) {
			this.props.unsetFeedDataLoading();
		}
	}

	handleSwipe(index, previous) {
		const
			swipeDirection = index > previous ? 'up' : 'down';

		this.props.setDiscourseLevel(index, swipeDirection);
		this.handleMainStackOverlay();
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

	handleMainStackOverlay() {
		this.props.activateMainStackOverlay();
		this.deactivateMainStackOverlay();
	}

	showSettings(event) {
		event.preventDefault();
	}

	render() {
		const
			// h = new HtmlToReactParser(),

			containerStyles = {
				height: '100vh'
			},

			mainStackStyles = this.props.navbar.hidden
				&& this.props.cardStack.level === 2 ?
				{ top: '-55px' } :
				{ top: '50px' };

		return (
			<div
				style={mainStackStyles}
				ref={c => this.container = c}
				className="MainStack">

				{ this.props.discourse.level === 0 ?
					<CardStackOverlay /> :
					<FeedStackOverlay /> }

				<Grid>
					<Row>
					
						<MainStackOverlay
							isFullScreen={this.props.discourse.isFullScreen}
							discourseLevel={this.props.discourse.level}
							active={this.props.discourse.overlay}
							discourseHandler={this.props.setDiscourseLevel}
							deactivateOverlayHandler={this.props.deactivateMainStackOverlay} />

						<SwipeableViews
							axis='y'
							containerStyle={containerStyles}
							resistance
							ignoreNativeScroll
							disabled={!this.props.mainStack.swipeable}
							index={this.props.discourse.level}
							onChangeIndex={this.handleSwipe}
							onTransitionEnd={this.changeRoute}>

							<div className="Worldview">
								<CardStack level="worldview" />
							</div>					

							<div className="Model">
								{ !this.props.loading.feed &&
									<FeedStack level="model" /> }
							</div>

							<div className="Propositional">
								{ !this.props.loading.feed &&
									<FeedStack level="propositional" /> }
							</div>

							<div className="Conceptual">
								{ !this.props.loading.feed &&
									<FeedStack level="conceptual" /> }
							</div>

							<div className="Narrative">
								{ !this.props.loading.feed &&
									<FeedStack level="narrative" /> }
							</div>
						</SwipeableViews>

					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(MainStackComponent);
