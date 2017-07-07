// React Dependencies
import React, {Component} from 'react';

// UI Dependencies
import { Grid, Row } from 'react-bootstrap';
import debounce from 'debounce';
import './CardStack.css';

// Components
// import Preload from '../Preload/Preload.jsx';
import SwipeableViews from 'react-swipeable-views';
import FeedCard from '../FeedCard/FeedCard.jsx';
import FeedCardList from '../FeedCardList/FeedCardList.jsx';
import SwipeOverlay from '../SwipeOverlay/SwipeOverlay.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// Permits HTML markup encoding in controversy card text
// import { Parser as HtmlToReactParser } from 'html-to-react';

class CardStackComponent extends Component {
	constructor(props, match) {
		super(props);

		injectTapEventPlugin();

		this.state = {
			id: null
		}

		this.props = props;
		this.handleSwipe = this.handleSwipe.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
	}

	componentDidMount() {
		this.deactivateSwipeOverlay = debounce(this.props.deactivateSwipeOverlay, this.props.discourse.isFullScreen ? 3000 : 6000);

		window.onscroll = function () { window.scrollTo(0, 0); };
	}

	handleAssetLoadError(error) {
		console.log('Error loading overlay images ...');
		console.log(error);
	}

	handleAssetLoadSuccess() {
		console.log('All assets loaded successfully.');
		this.props.setLoaded();
	}

	handleSwipe(index, previous) {
		const
			swipeDirection = index > previous ? 'up' : 'down';

		this.props.setDiscourseLevel(index, swipeDirection);
		this.handleSwipeOverlay();
	}

	// When we change routes, we need to update the URL
	changeRoute() {
		const
			level = [
				'worldview',
				'model',
				'propositional',
				'conceptual',
				'narrative'
			],
			route = '/' + this.props.match.params.controversy +
				'/' + level[this.props.discourse.level] +
				(this.props.discourse.level === 0 ? '/card' : '');

			// this.props.history.push(route);
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
			<div ref={c => this.container = c} className="CardStack">
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
								<FeedCard level="worldview" />
							</div>					

							<div className="Model">
								<FeedCardList level="model" />
							</div>

							<div className="Propositional">
								<FeedCardList level="propositional" />
							</div>

							<div className="Conceptual">
								<FeedCardList level="conceptual" />
							</div>

							<div className="Narrative">
								<FeedCardList level="narrative" />
							</div>
						</SwipeableViews>

					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(CardStackComponent);
