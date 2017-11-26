// React Dependencies
import React, { Component } from 'react';

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
		});
	}

	componentDidMount() {
		this.props.setFeedStackLevel(1);
		
		if (!this.props.loading.feed && this.props.feed.data.text) {
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
			!nextProps.loading.feed && this.props.feed.data.text) {

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

		return (
			<div className="Feedcard">
				<Grid>
					<mobiscroll.Select
						ref="select"
						theme="ios-dark"
						display="bottom"
						multiline={3}
						height={50}>

						<option value="1">Percentage of assets covered by systematic risk assessments (99)</option>
						<option value="2">Number of personal vacancies in the security roles required for ISMS (Nil)</option>
						<option value="3">Time taken to grant, change and remove access privileges (Max. 2 hours)</option>
						<option value="4">Percentage of agents covered by an effective security awareness program (100%)</option>
						<option value="5">Number of security access violations (2)</option>
						<option value="6">Number of emergency changes (5)</option>
						<option value="7">Number of security incidents involving malicious code (Max. 2)</option>
						<option value="8">Number of systems where security requirements are not met (Max. 2)</option>
						<option value="9">Average turnaround time of incidents (Max. 2 hours)</option>
						<option value="10">Number of pending actions to meet response and recovery requirements (Max. 5)</option>
						<option value="11">Number of scheduled internal audits not done (Max. 1)</option>
						<option value="12">Number of scheduled penetration tests not done (Max. 1)</option>
						<option value="13">Number of overdue actions arising out of audit reports (Max. 5)</option>
						<option value="14">Number of changes not carried out as per change control procedure (Max. 1)</option>

					</mobiscroll.Select>

				</Grid>
			</div>
		);
	}
};

export default withRouter(FeedCardComponent);
