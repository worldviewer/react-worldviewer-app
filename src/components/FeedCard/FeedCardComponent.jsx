// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import './FeedCard.css';
import share from '../../images/share.svg';
import down from '../../images/downdown.svg';
import shareHover from '../../images/share-hover.svg';
import downHover from '../../images/downdown-hover.svg';
import chris from '../../images/chris.jpg';
import { Grid, Row, Image } from 'react-bootstrap';
// import { Badge } from 'react-bootstrap';

// React Router Dependencies
import { withRouter } from 'react-router-dom';
import qs from 'qs';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

class FeedCardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isTextExpanded: false,
			text: ''
		};

		this.handleClick = this.handleClick.bind(this);
		this.props = props;
	}

	handleClick() {
		this.setState({
			isTextExpanded: !this.state.isTextExpanded
		});
	}

	constructText() {
		console.log('this.props:');
		console.log(this.props);
		console.log('');

		const
			h = new HtmlToReactParser(),
			queryString = qs.parse(this.props.location.search.slice(1)),
			activeParagraph = queryString['paragraph'] ?
				parseInt(queryString['paragraph'], 10) :
				-1;

		let paragraphTag, text = '';

		for (let num = 0; num < this.props.feed.data.text.length; num++) {
			if (num === 0) {
				paragraphTag = "<p className='FirstParagraph'>";
			} else if (num === activeParagraph + 1) {
				paragraphTag = "<p id='ActiveFeedParagraph'>";
			} else {
				paragraphTag = "<p>";
			}

			text = text + paragraphTag + this.props.feed.data.text[num].paragraph +
				'</p><br/>';
		}

		const
			parsed = h.parse(text);

		this.setState({
			text: parsed
		});

		// setTimeout(() => {
		// 	const
		// 		activeParagraphElement =
		// 			document.getElementById('ActiveFeedParagraph'),

		// 		// This was a nightmare to locate
		// 		scrollableElement =
		// 			document.querySelector('.CardStack .react-swipeable-view-container div:nth-of-type(2)');

		// 	const scroller = zenscroll.createScroller(scrollableElement, 1000, 0);
		// 	scroller.center(activeParagraphElement);
		// }, 1000);
	}

	componentDidMount() {
		console.log('this.props.discourse.level: ' + this.props.discourse.level);
		console.log('this.props.feed.feedLoading: ' + this.props.feed.feedLoading + '\n\n');
		
		if (this.props.discourse.level !== 0 && !this.props.feed.feedLoading) {
			this.constructText();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.discourse.level !== 0 && this.props.feed.feedLoading && !nextProps.feed.feedLoading) {
			this.constructText();
		}
	}

	render() {
		const
			// h = new HtmlToReactParser(),

			imageStyles = this.state.isTextExpanded ?
				{ height: 0 } :
				{},

			// chipStyles = {
			// 	display: 'flex',
			// 	flexWrap: 'wrap'
			// },

			shareStyles = this.state.isTextExpanded ?
				{ opacity: 0 } :
				{},

			updownStyles = this.state.isTextExpanded ?
				{ transform: 'scaleY(1)' } :
				{},

			// Avatar images must be a minimum of 40 x 40 pixels
			avatarStyles = {
				height: 40,
				width: 40
			}

		return (
			<div className="Feedcard">
				<Grid>
					<Row>

						<div className="image" style={imageStyles}>
							<Image src={share} style={shareStyles} className="share normal" circle />
							<Image src={shareHover} style={shareStyles} className="share hover" circle />
						</div>

					</Row>
					<Row>

						<div className="info">
							<Image
								src={down}
								className="updown normal"
								style={updownStyles}
								onClick={this.handleClick}
								circle />
							<Image
								src={downHover}
								className="updown hover"
								style={updownStyles}
								circle />
							<div className="title">Were dark matter filaments "predicted"?</div>
						</div>

					</Row>

{/*
					<Row>

						<div className="breadcrumbs">{this.props.feed.feedName} > Clash of Worldviews > Noteworthy Online Discussions</div>

					</Row>
					<Row>

						<div className="ratings">
							<div style={chipStyles}>
								<p>Testing  <Badge>9</Badge></p>
							</div>
						</div>

					</Row>
*/}

					<Row>

						<div className="author">
							<div className="avatar">
								<Image src={chris} style={avatarStyles} circle />
							</div>
							<div className="author-info">
								<div className="name">Chris Reeve</div>
								<div className="role">Admin</div>
							</div>
						</div>

					</Row>
					<Row>

						<div className="content">{ this.state.text }</div>

					</Row>
				</Grid>
			</div>
		);
	}
};

export default withRouter(FeedCardComponent);
