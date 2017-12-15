// React Dependencies
import React, { Component } from 'react';

// React Router Dependences
import { withRouter } from 'react-router-dom';

// UI Dependencies
import qs from 'qs';
import OpenSeadragon from 'openseadragon';
import config from '../../config';
import { calculateMinZoomLevel } from '../../libs/utils';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './Card.css';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

// Error/Logger Handling
import { log, logTitle, logObject } from '../../libs/utils';

class CardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pyramidStyle: {
				width: '100%'
			},
			minZoomLevel: calculateMinZoomLevel() + 0.19,
			text: ''
		};

		this.props = props;
	}

	setupDeepZoom() {
		const card = this.props.card.data;

		this.viewer = OpenSeadragon({
			id: 'openseadragon-cards',
			constrainDuringPan: true,
			visibilityRatio: 1.0,
			defaultZoomLevel: this.state.minZoomLevel,
			minZoomLevel: this.state.minZoomLevel,
			maxZoomLevel: card.images.pyramid.maxZoomLevel,
			autoResize: true,
			showZoomControl: false,
			showHomeControl: false,
			showFullPageControl: false,
			showSequenceControl: false,
			tileSources: {
				Image: {
					xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
					Url: config.s3['cards'].URL + card.slug + '/pyramid_files/',
					Format: 'jpg',
					Overlap: '0',
					TileSize: card.images.pyramid.TileSize,
					Size: {
						Height: card.images.large.height,
						Width: card.images.large.width
					}
				}
			}
		});

		window.addEventListener('resize',
			() => this.setupResizeHandler());

		this.setupZoomHandler(this.viewer);
	}

	setupResizeHandler() {
		this.setState({
			minZoomLevel: calculateMinZoomLevel() + 0.19
		});
	}

	// Use this to react to OpenSeadragon zoom events
	setupZoomHandler(viewer) {
		viewer.addHandler('zoom', (data) => {

		});
	}

	constructText() {
		logTitle('Card data:')
		logObject(this.props.card);
		log('');

		const
			h = new HtmlToReactParser(),
			queryString = qs.parse(this.props.location.search.slice(1)),
			activeParagraph = queryString['paragraph'] ?
				parseInt(queryString['paragraph'], 10) :
				-1;

		let paragraphTag, text = '';

		for (let num = 1; num < this.props.card.data.text.length; num++) {
			if (num === 0) {
				paragraphTag = "<p className='FirstCardParagraph'>";
			} else if (num === activeParagraph + 1) {
				paragraphTag = "<p id='ActiveCardParagraph'>";
			} else {
				paragraphTag = "<p>";
			}

			text = text + paragraphTag + this.props.card.data.text[num].paragraph +
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
		// 			document.getElementById('ActiveCardParagraph'),

		// 		// This was a nightmare to locate
		// 		scrollableElement =
		// 			document.querySelector('.CardStack .react-swipeable-view-container div:nth-of-type(2)');

		// 	// No need to scroll if the URL does not contain a paragraph query parameter
		// 	if (activeParagraphElement && scrollableElement) {
		// 		const scroller = zenscroll.createScroller(scrollableElement, 1000, 0);
		// 		scroller.center(activeParagraphElement);
		// 	}
		// }, 1000);
	}

	componentDidMount() {
		if (this.props.app.isMobile) {

		} else {

		}

		if (!this.props.loading.card) {
			this.setupDeepZoom();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.app.isMobile) {

		} else {
			
		}

		if (this.props.loading.card && !nextProps.loading.card) {
			this.setupDeepZoom();
		}
	}

	renderMobile() {
		return (
			<div
				ref={node => { this.root = node; }}
				className="Card"
				id="openseadragon-cards"
				style={this.state.pyramidStyle} />
		);
	}

	renderDesktop() {
		return (<div>
			<div className="Canvas"
				id='openseadragon-cards'
				style={{width: '100%', height: '100vh'}} />

			<SlidingPane
				ref={pane => this.leftPane = pane}
				className='TextCardPane'
				overlayClassName='CardPaneOverlay'
				isOpen={this.props.desktop.text}
				title={this.props.card.data.cardName}
				from='left'
				width={this.props.app.isLargest ? '450px' : '300px'}
				subtitle={this.props.card.data.cardSummary}
				onRequestClose={() => {
					this.props.deactivateDesktopText();
				}}
				onAfterOpen={() => {
					this.constructText();
				}}>

				{this.state.text}

			</SlidingPane>
		</div>);
	}

	render() {
		return (
			<div className="ControversyCard"
				ref={input => this.controversyCard = input}>

				{ this.props.app.isMobile && this.renderMobile() }
				{ this.props.app.isDesktop && this.renderDesktop() }

			</div>
		);
	}
}

export default withRouter(CardComponent);
