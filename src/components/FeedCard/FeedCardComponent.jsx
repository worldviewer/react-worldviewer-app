// React Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// UI Dependencies
import { Grid } from 'react-bootstrap';
import OpenSeadragon from 'openseadragon';
import './FeedCard.css';

// import share from '../../images/share.svg';
// import down from '../../images/downdown.svg';
// import shareHover from '../../images/share-hover.svg';
// import downHover from '../../images/downdown-hover.svg';
// import chris from '../../images/chris.jpg';
// import zenscroll from 'zenscroll';
// import { Badge } from 'react-bootstrap';

// mobiscroll.Image + mobiscroll.Form
import mobiscroll from '../../libs/mobiscroll.custom-4.0.0-beta.min';
import '../../libs/mobiscroll.custom-4.0.0-beta.min.css';

// React Router Dependencies
import { withRouter } from 'react-router-dom';
import qs from 'qs';

// AWS Dependencies
import { invokeApig } from '../../libs/aws';
import config from '../../config';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

// Error/Logger Handling
import { log, logObject, logTitle, logError } from '../../libs/utils';

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

		this.levels = [
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

	async getFeedPostFromFeedString(feedString) {
		const
			posts = this.props.feeds[this.props.level],
			feedSlug = posts.filter(post => feedString === post.title)[0].slug,
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

		this.props.setFeedData(feedPost, this.props.level);
		this.props.unsetFeedDataLoading(this.props.level);
	}

	setFeedPost(selection) {
		if (selection.valueText) {
			this.getFeedPostFromFeedString(selection.valueText);
		}
	}

	componentDidMount() {
		this.props.setFeedStackLevel(1);
		
		if (!this.props.loading.feed && this.props.feed.data.text) {
			this.constructText();
		}

		if (!this.props.loading.feed[this.props.level]) {

			// this.setupDeepZoom();
			this.fetchImage();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.loading.feed &&
			!nextProps.loading.feed && this.props.feed.data.text) {

			this.constructText();
		}

		if (this.props.loading.feed[this.props.level] &&
			!nextProps.loading.feed[this.props.level]) {

			// this.setupDeepZoom();
			this.fetchImage();
		}

		if (this.props.mainStack.selectFeedPopup === -1 &&
			nextProps.mainStack.selectFeedPopup ===
			this.levels.indexOf(nextProps.level)) {

			this.selectFeedHandler();
		}
	}

	render() {
		const feeds = !this.props.loading.feeds ?
			this.props.feeds[this.props.level] :
			[];

		return (
			<div className="FeedCard"
				ref={input => this.feedCard = input}>

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

				</Grid>
			</div>
		);
	}
};

export default withRouter(FeedCardComponent);
