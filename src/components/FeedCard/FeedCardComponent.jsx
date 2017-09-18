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
import zenscroll from 'zenscroll';
import OpenSeadragon from 'openseadragon';
// import { Badge } from 'react-bootstrap';

// React Router Dependencies
import { withRouter } from 'react-router-dom';
import qs from 'qs';

// AWS Dependencies
import config from '../../config';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

// Error/Logger Handling
import { log, logObject, logTitle } from '../../libs/utils';

class FeedCardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isTextExpanded: false,
			text: '',
			pyramidStyle: {
				width: '100%'
			},
			image: null
		};

		this.discourseLevels = [
			'worldview',
			'model',
			'propositional',
			'conceptual',
			'narrative'
		];

		this.handleClick = this.handleClick.bind(this);
		this.props = props;
	}

	setupDeepZoom() {
		const feed = this.props.feed.data;

		this.viewer = OpenSeadragon({
			id: 'openseadragonfeeds',
			constrainDuringPan: true,
			visibilityRatio: 1.0,
			defaultZoomLevel: 1,
			minZoomLevel: 1,
			maxZoomLevel: feed.images.pyramid.maxZoomLevel,
			autoResize: true,
			showZoomControl: false,
			showHomeControl: false,
			showFullPageControl: false,
			showSequenceControl: false,
			tileSources: {
				Image: {
					xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
					Url: config.s3['feeds'].URL + feed.cardSlug + '/' +
						feed.discourseLevel + '/' + feed.feedSlug +
						'/pyramid_files/',
					Format: 'jpg',
					Overlap: '0',
					TileSize: feed.images.pyramid.TileSize,
					Size: {
						Height: feed.images.large.height,
						Width: feed.images.large.width
					}
				}
			}
		});

		console.log(this.viewer);

		// const resize = () => this.setupResizeHandler();
		// window.addEventListener('resize', resize);

		this.setupZoomHandler(this.viewer);
	}

	// Use this to react to OpenSeadragon zoom events
	setupZoomHandler(viewer) {
		viewer.addHandler('zoom', (data) => {
			this.props.toggleNavbarState(data.zoom);
		});
	}

	handleClick() {
		this.setState({
			isTextExpanded: !this.state.isTextExpanded
		});
	}

	titleCase(string) {
		return string.split(' ')
			.map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
			.join(' ');
	}

	constructText() {
		const
			h = new HtmlToReactParser(),
			queryString = qs.parse(this.props.location.search.slice(1)),
			activeParagraph = queryString['paragraph'] ?
				parseInt(queryString['paragraph'], 10) :
				-1;

		let paragraphTag, text = '';

		logTitle(this.titleCase(this.props.level) + ' Feedcard props:');
		logObject(this.props);
		log('');

		for (let num = 0; num < this.props.feed.data.text.length; num++) {
			if (num === 0) {
				paragraphTag = "<p className='FirstFeedParagraph'>";
			} else if (num === activeParagraph + 1) {
				paragraphTag = "<p id='ActiveFeedParagraph'>";
			} else {
				paragraphTag = "<p>";
			}

			text = text + paragraphTag + this.props.feed.data.text[num].paragraph +
				'</p>';
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
		// 			document.querySelector('.FeedStack .react-swipeable-view-container div:nth-of-type(2)');

		// 	if (activeParagraphElement && scrollableElement) {
		// 		const scroller = zenscroll.createScroller(scrollableElement, 1000, 0);
		// 		scroller.center(activeParagraphElement);	
		// 	}
		// }, 1000);
	}

	fetchImage() {
		this.feedImage = config.s3['feeds'].URL + this.props.feed.data.cardSlug + '/' +
			this.props.feed.data.discourseLevel + '/' + this.props.feed.data.feedSlug +
			'/large.jpg';

		this.setState({
			image: this.feedImage
		})
	}

	componentDidMount() {
		logTitle('Feed card data:');
		log('this.props.discourse.level: ' + this.props.discourse.level);
		log('this.props.feed.data.discourseLevel: ' + this.props.feed.data.discourseLevel);
		log('');
		
		if (!this.props.loading.feed) {
			this.constructText();
		}

		if (this.props.discourse.level ===
			this.discourseLevels.indexOf(this.props.feed.data.discourseLevel) &&
			!this.props.loading.feed) {

			// this.setupDeepZoom();
			this.fetchImage();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.loading.feed &&
			!nextProps.loading.feed) {

			this.constructText();
		}

		if (nextProps.discourse.level ===
			this.discourseLevels.indexOf(nextProps.feed.data.discourseLevel) &&
			this.props.loading.feed && !nextProps.loading.feed) {

			// this.setupDeepZoom();
			this.fetchImage();
		}
	}

	render() {
		const
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
			};

		return (
			<div className="Feedcard">
				<Grid>
					<Row>
					{/*	<div
							ref={node => { this.root = node; }}
							id="openseadragonfeeds"
							className="image"
							style={this.state.pyramidStyle} /> */}

						<img
							alt="feed post"
							src={this.state.image}
							className="image"
							style={this.state.pyramidStyle} />

					{/*	<Image src={share} style={shareStyles} className="share normal" circle />
						<Image src={shareHover} style={shareStyles} className="share hover" circle /> */}
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
							<div className="title">{this.props.feed.data.feedName}</div>
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

						<div id="FeedParagraphs">{ this.state.text }</div>

					</Row>
				</Grid>
			</div>
		);
	}
};

export default withRouter(FeedCardComponent);
