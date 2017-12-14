// React Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// UI Dependencies
import { Grid } from 'react-bootstrap';
import OpenSeadragon from 'openseadragon';
import { calculateMinZoomLevel } from '../../libs/utils';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './FeedCard.css';

// import zenscroll from 'zenscroll';

// mobiscroll.Image + mobiscroll.Form
import mobiscroll from '../../libs/mobiscroll.custom-4.0.0-beta2.min';
import '../../libs/mobiscroll.custom-4.0.0-beta2.min.css';

// React Router Dependencies
import { withRouter } from 'react-router-dom';
import qs from 'qs';

// AWS Dependencies
import { invokeApig } from '../../libs/aws';
import config from '../../config';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

// Error/Logger Handling
import { log, logObject, logTitle, logError, isEmptyObject } from '../../libs/utils';

class FeedCardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isTextExpanded: false,
			text: '',
			pyramidStyle: {
				width: '100%'
			},
			image: null,
			minZoomLevel: calculateMinZoomLevel()
		};

		this.levels = [
			'worldview',
			'model',
			'propositional',
			'conceptual',
			'narrative'
		];

		this.props = props;
	}

	setupDeepZoom(isMobile) {
		const feed = this.props.feed[this.props.level];

		logTitle('Deep Zoom for level ' + this.props.level);
		log('feed:');
		log(feed);
		log('isMobile: ' + isMobile);
		log('');

		this.viewer = OpenSeadragon({
			id: 'openseadragonfeed' + this.props.level,
			constrainDuringPan: true,
			visibilityRatio: 1.0,
			defaultZoomLevel: isMobile ? 1 : this.state.minZoomLevel,
			minZoomLevel: isMobile ? 1 : this.state.minZoomLevel,
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
						feed.discourseLevel + '/' +
						feed.feedSlug + '/pyramid_files/',
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

		window.addEventListener('resize',
			() => this.setupResizeHandler());

		logTitle('Setting up Deep Zoom ...');
		log('feed:');
		log(feed);
		log('viewer:');
		log(this.viewer);
		log('');

		// this.setupZoomHandler(this.viewer);
	}

	setupResizeHandler() {
		this.setState({
			minZoomLevel: calculateMinZoomLevel()
		});
	}

	// Use this to react to OpenSeadragon zoom events
	setupZoomHandler(viewer) {
		viewer.addHandler('zoom', (data) => {

		});
	}

	titleCase(string) {
		return string.split(' ')
			.map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
			.join(' ');
	}

	constructText() {
		const
			feed = this.props.feed[this.props.level],
			h = new HtmlToReactParser(),
			queryString = qs.parse(this.props.location.search.slice(1)),
			activeParagraph = queryString['paragraph'] ?
				parseInt(queryString['paragraph'], 10) :
				-1;

		let paragraphTag, text = '';

		for (let num = 0; num < feed.text.length; num++) {
			if (num === 0) {
				paragraphTag = "<p className='FirstFeedParagraph'>";
			} else if (num === activeParagraph + 1) {
				paragraphTag = "<p id='ActiveFeedParagraph'>";
			} else {
				paragraphTag = "<p>";
			}

			text = text + paragraphTag + feed.text[num].paragraph +
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
		const level = this.props.level;

		this.feedImage = config.s3['feeds'].URL + this.props.feed[level].cardSlug + '/' +
			this.props.feed[level].discourseLevel + '/' + this.props.feed[level].feedSlug +
			'/large.jpg';

		this.setState({
			image: this.feedImage
		});
	}

	selectFeedHandler() {
		const domNode = ReactDOM.findDOMNode(this.feedCard).querySelector('.FeedSelect input');
		domNode.click();

		this.props.unselectFeed();
	}

	// Selection of feed post by wheel (feedString) or route (feedSlug)
	async getFeedPostFromFeedString(feedString, feedSlug) {
		if (!feedSlug) {
			const posts = this.props.feeds[this.props.level];
			feedSlug = posts.filter(post => feedString === post.title)[0].slug;
		}

		const
			shortSlug = this.props.router.location.pathname.split('/')[1],
			cardSlug = this.props.slugs.hash[shortSlug];

		logTitle('Slug data:');
		log('Short slug: ' + shortSlug);
		log('Feed slug: ' + feedSlug);
		log('');

		let feedPost = null;

		this.props.setFeedDataLoading(this.props.level);

		try {
			feedPost = await invokeApig( {base: 'feeds', path: '/feeds/' +
				cardSlug + '/' + feedSlug }, this.props.user.token);
		} catch(e) {
			logError(e, 'Error Fetching Feed Post: ' + e.message, this.props.user.token);
		}

		logTitle('Fetching controversy feed data for level ' + this.props.level + ' ...');
		logObject(feedPost);
		log('');

		await this.props.setFeedData(feedPost, this.props.level);
		this.props.unsetFeedDataLoading(this.props.level);
	}

	// Selection of feed post by wheel (callback)
	setFeedPost(selection) {
		if (selection.valueText) {
			this.getFeedPostFromFeedString(selection.valueText);
			this.props.activateFeedImage(this.props.level);
		}
	}

	// Selection of feed post by clicking thumbnail
	async clickFeedPost(index) {
		const
			posts = this.props.feeds[this.props.level],
			feedSlug = posts[index].slug,
			shortSlug = this.props.router.location.pathname.split('/')[1],
			cardSlug = this.props.slugs.hash[shortSlug];

		let feedPost = null;

		this.props.setFeedDataLoading(this.props.level);

		try {
			feedPost = await invokeApig( {base: 'feeds', path: '/feeds/' +
				cardSlug + '/' + feedSlug }, this.props.user.token);
		} catch(e) {
			logError(e, 'Error Fetching Feed Post: ' + e.message, this.props.user.token);
		}

		logTitle('Fetching controversy feed data for level ' + this.props.level + ' ...');
		logObject(feedPost);
		log('');

		await this.props.setFeedData(feedPost, this.props.level);
		this.props.activateFeedimage(this.props.level);
		this.props.unsetFeedDataLoading(this.props.level);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.app.isMobile) {
			// We don't care unless the current feed post level is the active one
			if (this.props.discourse.level === this.levels.indexOf(this.props.level)) {
				const
					thisFeedLoading = this.props.loading.feed[this.props.level],
					nextFeedLoading = nextProps.loading.feed[this.props.level],
					nextFeed = nextProps.feed[this.props.level],
					nextFeedStack = nextProps.feedStack[this.props.level];

				if (this.props.mainStack.selectFeedPopup === -1 &&
					nextProps.mainStack.selectFeedPopup ===
					this.levels.indexOf(nextProps.level)) {

					this.selectFeedHandler();
				}

				// logTitle('componentWillReceiveProps for level ' + this.props.level + ':');
				// log('thisFeedLoading: ' + thisFeedLoading);
				// log('!nextFeedLoading: ' + !nextFeedLoading);
				// log('nextFeedStack.image: ' + nextFeedStack.image);
				// log(this.deepZoomWidget);
				// log(this.textWidget);
				// log('');

				// Triggers when component finishes loading before the feed
				if (thisFeedLoading && !nextFeedLoading && nextFeedStack.image) {
					logTitle('Detected deep zoom widget activation (feedLoading change)');
					log('path: ' + this.props.router.location.pathname);
					log('');

					this.deepZoomWidget.instance.show();
					this.props.history.push('/' + this.props.card.data.shortSlug + '/' +
						nextFeed.discourseLevel + '/feed/' + nextFeed.feedSlug);
				}
			}

		} else {
			logTitle('FeedCard componentWillReceiveProps:');
			log('this.props.app.isDesktop: ' + this.props.app.isDesktop);
			log('this.props.level: ' + this.props.level);
			log('this.props.loading.feed[this.props.level]: ' +
				this.props.loading.feed[this.props.level]);

			log('this.props.loading.feeds: ' + this.props.loading.feeds);
			log('nextProps.loading.feeds: ' + nextProps.loading.feeds);

			log('this.props.loading.feed[this.props.level]: ' +
				this.props.loading.feed[this.props.level]);
			log('nextProps.loading.feed[nextProps.level]: ' +
				nextProps.loading.feed[nextProps.level]);			

			log('feed exists: ' + !isEmptyObject(this.props.feed[this.props.level]));
			log('');

			if (!nextProps.loading.feeds &&
				this.props.loading.feed[this.props.level] &&
				!nextProps.loading.feed[nextProps.level]) {

				const [, shortSlug, discourseLevel,, feedSlug, isText] =
					this.props.router.location.pathname.split('/');

				this.setupDeepZoom(false);
			}

			if (this.props.mainStack.selectFeedPopup === -1 &&
				nextProps.mainStack.selectFeedPopup ===
				this.levels.indexOf(nextProps.level)) {

				this.props.activateFeedImage(this.props.level);
			}
		}
	}

	async componentDidMount() {
		if (this.props.app.isMobile) {
			// We don't care unless the current feed post level is the active one
			if (this.props.discourse.level === this.levels.indexOf(this.props.level)) {
				const [, shortSlug, discourseLevel,, feedSlug, isText] =
					this.props.router.location.pathname.split('/');

				logTitle('Determining feed post state from route ...');
				log('full path: ' + this.props.router.location.pathname);
				log('shortSlug: ' + shortSlug);
				log('discourseLevel: ' + discourseLevel);
				log('feedSlug: ' + feedSlug);
				log('isText route:');
				log(isText === 'text');
				log('');

				if (feedSlug && isText) {
					await this.getFeedPostFromFeedString(null, feedSlug);
					await this.props.activateFeedText(this.props.level);

					this.textWidget.instance.show();

				} else if (feedSlug) {
					await this.getFeedPostFromFeedString(null, feedSlug);
					await this.props.activateFeedImage(this.props.level);

					this.deepZoomWidget.instance.show();
				}
			}

		} else {
			logTitle('FeedCard componentDidMount:');
			log('this.props.app.isDesktop: ' + this.props.app.isDesktop);
			log('this.props.level: ' + this.props.level);
			log('this.props.loading.feed[this.props.level]: ' +
				this.props.loading.feed[this.props.level]);
			log('this.props.loading.feeds: ' + this.props.loading.feeds);
			log('feed exists: ' + !isEmptyObject(this.props.feed[this.props.level]));
			log('');

			if (this.props.app.isDesktop && !this.props.loading.feeds &&
				!this.props.loading.feed[this.props.level] &&
				!isEmptyObject(this.props.feed[this.props.level])) {

				const [, shortSlug, discourseLevel,, feedSlug, isText] =
					this.props.router.location.pathname.split('/');

				this.setupDeepZoom(false);
			}	
		}
	}

	renderMobile() {
		const feeds = !this.props.loading.feeds ?
			this.props.feeds[this.props.level] :
			[];

		const base = config.s3.feeds.URL +
			this.props.card.data.slug + '/' +
			this.props.level + '/';

		const imgStyles = {
			width: '150px',
			height: '150px'
		};

		const
			windowHeight = window.innerHeight,
			windowWidth = window.innerWidth,
			rows = Math.floor(windowHeight / 150);

		const gridWidth = !this.props.loading.feeds ?
			Math.ceil(190 * this.props.feeds[this.props.level].length / rows) : 0;

		const level = this.props.level;

		return (<div>
				<div style={{position: 'fixed', width: '100%'}}
					className='FeedDeepZoomHome'
					ref={node => this.topOverlay = node}>
				</div>

				<div style={{position: 'fixed', width: '100%'}}
					className='FeedTextHome'
					ref={node => this.bottomOverlay = node}>
				</div>

				<Grid>

					<div className="FeedSelect">
						<mobiscroll.Select
							theme="ios-dark"
							display="bottom"
							multiline={3}
							height={50}
							onSet={this.setFeedPost.bind(this)}>

							{ feeds.map((post, i) => <option value={i}
								key={i}>{post.title}</option>) }

						</mobiscroll.Select>
					</div>

					<div className="FeedDeepZoom" style={{top: '51px'}}>
						<mobiscroll.Widget
							ref={widget => this.deepZoomWidget = widget}
							theme="ios-dark"
							display="top"
							context={this.topOverlay}

							buttons={[{ text: 'Exit', cssClass: 'mbsc-fr-btn0 mbsc-fr-btn-e mbsc-fr-btn',
								handler: (event, inst) => {
									logTitle('Exit the Image Viewer ...');
									log(this.viewer);
									log('');

									// If you don't do this, the first clicked viewer
									// image will appear
									this.viewer.destroy();
									this.viewer = null;

									inst.hide();
									this.props.enableMainStackSwipeable();

									this.props.history.push('/' + this.props.card.data.shortSlug + '/' +
										this.props.feed[this.props.level].discourseLevel + '/feed');
								}},
								{ text: 'View Text', handler: (event, inst) => {
									logTitle('Feed Image --> Feed Text ...');
									log('');

									this.textWidget.instance.show();
								}}]}

							onShow={(event, inst) => {
								this.setupDeepZoom(true);
								this.props.disableMainStackSwipeable();

								logTitle('Feed Image onShow() ...');
								log('');

								this.props.history.push('/' +
									this.props.router.location.pathname.split('/')[1] + '/' +
									this.props.feed[this.props.level].discourseLevel + '/feed/' +
									this.props.feed[this.props.level].feedSlug);
							}}>

							<div className="md-dialog-image" style={{top: '51px'}}>
								<div id={'openseadragonfeed' + level} style={{width: '100%', height: windowWidth,
								top: 0, bottom: 0, left: 0, right: 0}}></div>
							</div>

						</mobiscroll.Widget>
					</div>

					<div className="FeedText">
						<mobiscroll.Widget
							ref={widget => this.textWidget = widget}
							theme="ios"
							display="bottom"
							context={this.bottomOverlay}

							buttons={[{ text: 'Exit', cssClass: 'mbsc-fr-btn0 mbsc-fr-btn-e mbsc-fr-btn',
								handler: (event, inst) => {
									logTitle('Exit the Image Viewer ...');
									log(this.viewer);
									log('');

									// If you don't do this, the first clicked viewer
									// image will appear
									this.viewer.destroy();
									this.viewer = null;

									inst.hide();
									this.props.enableMainStackSwipeable();

									this.props.history.push('/' + this.props.card.data.shortSlug + '/' +
										this.props.feed[this.props.level].discourseLevel + '/feed');
								}},
								{ text: 'View Image', handler: (event, inst) => {
									logTitle('Feed Text --> Feed Image ...');
									log('');

									this.deepZoomWidget.instance.show();
								}}]}

							onShow={(event, inst) => {
								logTitle('Constructing text ...');
								log('');

								this.constructText();
								this.props.disableMainStackSwipeable();

								logTitle('Feed Text onShow() ...');
								log('');

								this.props.history.push('/' +
									this.props.router.location.pathname.split('/')[1] + '/' +
									this.props.feed[this.props.level].discourseLevel + '/feed/' +
									this.props.feed[this.props.level].feedSlug + '/text');
							}}>

							<div className="md-dialog-text" style={{height: windowWidth,
								top: 0, bottom: 0, left: 0, right: 0}}>

								<h3 style={{marginTop: 0, marginBottom: '20px'}}>
									{this.props.feed[this.props.level].feedName}
								</h3>

								{this.state.text}
							</div>

						</mobiscroll.Widget>
					</div>

					{ !this.props.loading.feeds && <div className='GridContainer' style={{width: gridWidth}}>

						{ feeds.map((feed, index) =>
							<img src={base + feed.slug + '/small.jpg'} alt={feed.title}
								style={imgStyles} className='GridItem' key={index}
								onClick={this.clickFeedPost.bind(this, index)} /> ) }

					</div> }

				</Grid>
			</div>)
	}

	renderDesktop() {
		return (<div>
			<div className="Canvas"
				id={'openseadragonfeed' + this.props.level}
				style={{width: '100%', height: '100vh'}} />

			<SlidingPane
				className='FeedPane'
				overlayClassName='FeedPaneOverlay'
				isOpen={this.props.feedStack[this.props.level].image}
				title='Feeds'
				width={this.props.app.isLargest ? '450px' : '300px'}
				subtitle='Feeds are like controversy subtopics'
				onRequestClose={() => {
					// triggered on "<" on left top click or on outside click
					this.props.deactivateFeedImage(this.props.level);
					this.props.unselectFeed();
				}}>

				stuff!

			</SlidingPane>
		</div>);
	}

	// Example of a small image URL:
	// https://s3-us-west-2.amazonaws.com/controversy-cards-feeds/
	// halton-arp-the-modern-galileo/worldview/10-times-quasar-superluminal-motion/small.jpg
	render() {
		return (
			<div className="FeedCard"
				ref={input => this.feedCard = input}>

				{ this.props.app.isMobile && this.renderMobile() }
				{ this.props.app.isDesktop && this.renderDesktop() }

			</div>
		);
	}
};

export default withRouter(FeedCardComponent);
