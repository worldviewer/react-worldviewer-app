// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import { Grid, Row } from 'react-bootstrap';
// import debounce from 'debounce';
import './FeedStack.css';

// Components
import SwipeableViews from 'react-swipeable-views';
import FeedCardList from '../../components/FeedCardList/FeedCardList.jsx';
import FeedCard from '../../components/FeedCard/FeedCard.jsx';
import Comments from '../../components/Comments/Comments.jsx';
// import SwipeOverlay from '../../components/SwipeOverlay/SwipeOverlay.jsx';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

class FeedStackComponent extends Component {
	constructor(props) {
		super(props);

		// injectTapEventPlugin();

		this.state = {
			id: null
		}

		this.props = props;
		this.handleSwipe = this.handleSwipe.bind(this);
		// this.changeRoute = this.changeRoute.bind(this);

		this.levels = [
			'worldview',
			'model',
			'propositional',
			'conceptual',
			'narrative'
		];
	}

	// We have to take a look at the pathname to determine where in the FeedStack we are.
	// Once we know, we need to save our spot.
	componentWillMount() {
		if (this.props.match.params.level && this.props.match.level !== 'worldview') {
			if (this.props.match.params.feed) {
				this.props.setFeedStackLevel(1);
			} else if (this.props.pathname.match(/comments$/)) {
				this.props.setFeedStackLevel(2);
			} else {
				this.props.setFeedStackLevel(0);
			}
		}
	}

	componentDidMount() {
		// this.deactivateSwipeOverlay = debounce(this.props.deactivateSwipeOverlay, this.props.discourse.isFullScreen ? 3000 : 6000);

		// window.onscroll = function () { window.scrollTo(0, 0); };
	}

	handleSwipe(index, previous) {
		const
			swipeDirection = index > previous ? 'right' : 'left';

		this.props.setFeedStackLevel(index, swipeDirection);
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

			currentLevel = this.levels[this.props.discourse.level];

		return (
			<div ref={c => this.container = c} className="FeedStack">
				<Grid>
					<Row>

{/*
						<SwipeOverlay
							isFullScreen={this.props.discourse.isFullScreen}
							discourseLevel={this.props.discourse.level}
							active={this.props.discourse.overlay}
							discourseHandler={this.props.setDiscourseLevel}
							deactivateOverlayHandler={this.props.deactivateSwipeOverlay} />
*/}

						<SwipeableViews
							axis='x'
							containerStyle={containerStyles}
							resistance
							ignoreNativeScroll
							index={this.props.feedStack.level}
							onChangeIndex={this.handleSwipe}
							onTransitionEnd={this.changeRoute}>

							<div className="FeedCardList">
								<FeedCardList level={currentLevel} />
							</div>					

							<div className="FeedCard">
								<FeedCard level={currentLevel} />
							</div>

							<div className="Comments">
								<Comments level={currentLevel} />
							</div>
						</SwipeableViews>

					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(FeedStackComponent);
