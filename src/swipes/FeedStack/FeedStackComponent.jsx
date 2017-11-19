// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import { Grid, Row } from 'react-bootstrap';
import './FeedStack.css';

// Components
import SwipeableViews from 'react-swipeable-views';
import FeedCardList from '../../components/FeedCardList/FeedCardList.jsx';
import FeedCard from '../../components/FeedCard/FeedCard.jsx';
import Feed from '../../components/Feed/Feed.jsx';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

class FeedStackComponent extends Component {
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

	// We have to take a look at the pathname to determine where in the FeedStack we are.
	// Once we know, we need to save our spot.
	componentWillMount() {
		if (this.props.match.params.level && this.props.match.params.level !== 'worldview') {
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
	}

	handleSwipe(index, previous) {
		const
			swipeDirection = index > previous ? 'right' : 'left';

		this.props.setFeedStackLevel(index, swipeDirection);
	}

	showSettings(event) {
		event.preventDefault();
	}

	render() {
		const
			containerStyles = {
				height: '100vh'
			},

			currentLevel = this.levels[this.props.discourse.level];

		return (
			<div ref={c => this.container = c} className="FeedStack">
				<Grid>
					<Row>
						<SwipeableViews
							axis='x'
							containerStyle={containerStyles}
							resistance
							ignoreNativeScroll
							index={this.props.feedStack.level}
							onChangeIndex={this.handleSwipe}>

							<div className="FeedCardList">
								<FeedCardList level={currentLevel} />
							</div>					

							<div className="FeedCard">
								<FeedCard level={currentLevel} />
							</div>

							<div className="Feed">
								<Feed level={currentLevel} />
							</div>
						</SwipeableViews>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(FeedStackComponent);
