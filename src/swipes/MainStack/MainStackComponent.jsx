// React Dependencies
import React, {Component} from 'react';

// UI Dependencies
import { Grid, Row } from 'react-bootstrap';
import debounce from 'debounce';
import './MainStack.css';

// Components
import SwipeableViews from 'react-swipeable-views';
import CardStack from '../CardStack/CardStack';
import FeedCard from '../../components/FeedCard/FeedCard';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Overlays
import MainStackOverlay from '../../overlays/MainStackOverlay/MainStackOverlay';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// AWS Dependencies
import { invokeApig } from '../../libs/aws';

// Error/Logger Handling
import { log, logTitle, logObject } from '../../libs/utils';

// LocalStorage / New User Instructions
import { setDiskInstructions } from '../../libs/utils';

// mobiscroll.Image + mobiscroll.Form
import mobiscroll from '../../libs/mobiscroll.custom-4.0.0-beta.min';
import '../../libs/mobiscroll.custom-4.0.0-beta.min.css';

// Permits HTML markup encoding in controversy card text
// import { Parser as HtmlToReactParser } from 'html-to-react';

class MainStackComponent extends Component {
	constructor(props, match) {
		super(props);

		injectTapEventPlugin();

		this.props = props;

		this.levels = [
			'worldview',
			'model',
			'propositional',
			'conceptual',
			'narrative'
		];

		this.cardStackLevels = [
			'/text',
			'/card',
			'/feed'
		];

		logTitle('this.cardStackLevels:');
		log(this.cardStackLevels);
		log('');

		// When we land on this page without swiping, we determine and set the horizontal swipe
		// position according to the cardStackLevel prop passed on by the router
		if (this.props.cardStackLevel) {
			this.props.setCardStackLevel(this.props.cardStackLevel, 'right');			
		}

		this.initialDiscourseLevel =
			this.levels.indexOf(this.props.match.params.level);

		// Same sort of situation for discourse level, but we have to also reverse-engineer the
		// discourse level number from the :level route parameter, and we use the discourseLevel
		// router prop to differentiate a landing from a swipe.  On landing, we must set the
		// discourse level (since this is otherwise set by swiping).
		if (this.props.discourseLevel) {
			this.props.setDiscourseLevel(this.initialDiscourseLevel, 'up');
		}

		this.handleSwipe = this.handleSwipe.bind(this);
		this.changeRoute = this.changeRoute.bind(this);


		this.debouncedCardInstructionHandler = debounce(() => this.handleInstructionState('firstControversyCard',
			'Click the controversy card to zoom into it. The URL is sharable. Swipe left to read the text, right to more information about the controversy (search on "Halton Arp" for a full example).'), 500);

		this.debouncedFeedInstructionHandler = debounce(() => this.handleInstructionState('firstFeed',
			'Feeds are like subtopics for controversy cards. Swipe vertically to adjust your "level" of discussion. Scroll horizontally to view more feed content. Click the menu to select feed posts by title.'), 500);
	}

	// This fetches data for a specific feed
	async loadFeedData() {
		const
			shortSlug = this.props.router.location.pathname.split('/')[1],
			cardSlug = this.props.slugs.hash[shortSlug],
			feedSlug = this.props.router.location.pathname.split('/')[4] || '';

		logTitle('Slug data:');
		log('Short slug: ' + shortSlug);
		log('Feed slug: ' + feedSlug);
		log('this.props.router.location:');
		log(this.props.router.location);
		log('');

		const
			feed = await invokeApig( {base: 'feeds', path: '/feeds/' +
				cardSlug + '/' + feedSlug }, this.props.user.token);

		logTitle('Data Step 3: Fetching controversy feed data ...');
		logObject(feed);
		log('');

		this.props.setFeedData(feed, this.levels[this.props.discourse.level]);
		this.props.unsetFeedDataLoading(this.levels[this.props.discourse.level]);
	}

	// This fetches the feed list data for this particular controversy
	async loadFeedsData() {
		const
			shortSlug = this.props.router.location.pathname.split('/')[1],
			cardSlug = this.props.slugs.hash[shortSlug];

		const feedsList = await invokeApig( {base: 'feeds', path: '/feeds/' +
			cardSlug }, this.props.user.token),

			worldview = feedsList.filter(post => post.level === 'worldview'),
			model = feedsList.filter(post => post.level === 'model'),
			propositional = feedsList.filter(post => post.level === 'propositional'),
			conceptual = feedsList.filter(post => post.level === 'conceptual'),
			narrative = feedsList.filter(post => post.level === 'narrative');

		logTitle('Feeds list:');
		logObject(feedsList);
		log('');

		this.props.setFeedsData(worldview, model, propositional, conceptual, narrative);
		this.props.unsetFeedsDataLoading();
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

	handleInstructionState(type, message) {
		if (this.props.instructions.all &&
			this.props.instructions[type]) {

			mobiscroll.snackbar({
				message,
				duration: 50000
			});

			const newInstructionState = {
				...this.props.instructions,
				[type]: false
			};

			this.props.setNewUserInstructionsState(newInstructionState);
			setDiskInstructions(newInstructionState);
		}
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
			await this.loadCardData();
			// await this.loadFeedData();
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

			// await this.loadFeedData();
			await this.loadFeedsData();
		}

		if (nextProps.instructions.firstControversyCard &&
			nextProps.instructions.all &&
			nextProps.router.location.pathname.match(/worldview\/card$/)) {

			this.debouncedCardInstructionHandler();
		}

		if (nextProps.instructions.firstFeed &&
			nextProps.instructions.all &&
			nextProps.router.location.pathname.match(/\/feed/)) {

			this.debouncedFeedInstructionHandler();
		}

		// if (nextProps.loading.feed && !this.props.loading.feed) {
		// 	this.props.unsetFeedDataLoading();
		// }
	}

	componentWillMount() {
		this.props.setCardDataLoading();
		this.props.setFeedDataLoading(this.levels[this.props.discourse.level]);
		this.props.setFeedsDataLoading();
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
				'/' + this.levels[this.props.discourse.level] +
				(this.props.discourse.level === 0 ?
					this.cardStackLevels[this.props.cardStack.level] : '');

		this.props.history.push(route);
	}

	handleMainStackOverlay() {
		this.props.activateMainStackOverlay();
		this.deactivateMainStackOverlay();
	}

	render() {
		const
			containerStyles = {
				height: '100vh'
			},

			mainStackStyles = { top: '50px' };

		return (
			<div
				style={mainStackStyles}
				ref={c => this.container = c}
				className="MainStack">

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
								<FeedCard level="model" />
							</div>

							<div className="Propositional">
								<FeedCard level="propositional" />
							</div>

							<div className="Conceptual">
								<FeedCard level="conceptual" />
							</div>

							<div className="Narrative">
								<FeedCard level="narrative" />
							</div>
						</SwipeableViews>

					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(MainStackComponent);
