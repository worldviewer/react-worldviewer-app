// React Dependencies
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

// React Router Dependences
import { withRouter } from 'react-router-dom';

// SEO Dependencies
import { setGoogleBotTitle, setGoogleBotDescription, setGoogleBotCanonical, setGoogleBotSchema } from '../../libs/seo';

// UI Dependencies
import qs from 'qs';
import OpenSeadragon from 'openseadragon';
import config from '../../config';
import { calculateMinZoomLevel } from '../../libs/utils';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import zenscroll from 'zenscroll';
import './Card.css';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

// Error/Logger Handling
import { log, logTitle } from '../../libs/utils';

// Overlays
import MainStackOverlay from '../../overlays/MainStackOverlay/MainStackOverlay';
import debounce from 'debounce';

class CardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pyramidStyle: {
				width: '100%',
				pointerEvents: 'none'
			},
			minZoomLevel: this.props.app.isMobile ?
				calculateMinZoomLevel() - 0.10 :
				calculateMinZoomLevel(),
			text: ''
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

			// Adjustments for Juan
			gestureSettingsMouse: {
				flickEnabled: true,
				clickToZoom: false,
				dblClickToZoom: false
			},
			zoomPerSecond: 0.2,
			zoomPerScroll: 1.2,
			animationTime: 0.3,
			zoomPerClick: 1,

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

		// this.viewer.addHandler('click', () => {
		// 	const osdviewer = ReactDOM.findDOMNode(this.root);

		// 	logTitle('Setting up OSD Viewer click handler ...');
		// 	log(osdviewer);
		// 	log('');

		//     osdviewer.click(event => {
		// 		this.setState(prevState => ({
		// 			pyramidStyle: {
		// 				...prevState.pyramidStyle,
		// 				pointerEvents: 'none'
		// 			}
		// 		}));
				
		// 		logTitle('Deactivating Deep Zoom ...');
		// 		log('');

		// 		this.props.enableMainStackSwipeable();
		//     });
		// });

		window.addEventListener('resize',
			() => this.setupResizeHandler());

		this.setupZoomHandler(this.viewer);

		this.debouncedZoomHandler = debounce((data) => {
			logTitle('zoom: ' + data.zoom);
			log('');

			if (this.props.app.isDesktop) {
				if (data.zoom > 0.7) {
					this.props.deactivateMainStackOverlay();
				} else {
					this.props.activateMainStackOverlay();
				}

			} else {
				if (data.zoom > 1.0) {
					this.props.disableMainStackSwipeable();

					this.setState(prevState => ({
						pyramidStyle: {
							...prevState.pyramidStyle,
							pointerEvents: 'auto'
						}
					}));

					logTitle('Activating Deep Zoom ...');
					log('');

				} else {
					this.props.enableMainStackSwipeable();

					this.setState(prevState => ({
						pyramidStyle: {
							...prevState.pyramidStyle,
							pointerEvents: 'none'
						}
					}));
					
					logTitle('Deactivating Deep Zoom ...');
					log('');
				}
			}
		}, 500);
	}

	setupResizeHandler() {
		this.setState({
			minZoomLevel: this.props.app.isMobile ?
				calculateMinZoomLevel() - 0.10 :
				calculateMinZoomLevel()
		});
	}

	// Use this to react to OpenSeadragon zoom events
	setupZoomHandler(viewer) {
		logTitle('Setting up overlay resize handler ...');
		log('');

		viewer.addHandler('zoom', (data) => this.debouncedZoomHandler(data));
	}

	constructText() {
		const
			h = new HtmlToReactParser(),
			queryString = qs.parse(this.props.location.search.slice(1)),
			activeParagraph = queryString['paragraph'] ?
				parseInt(queryString['paragraph'], 10) :
				-1;

		logTitle('constructText:')
		log('card.text:');
		log(this.props.card.data.text);
		log('activeParagraph: ' + activeParagraph);
		log('this.props.card.data.text.length: ' + this.props.card.data.text.length);
		log('');

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

		this.scrollToActiveParagraph(activeParagraph);
	}

	scrollToActiveParagraph(activeParagraph) {
		setTimeout(() => {
			const
				activeParagraphElement =
					document.getElementById('ActiveCardParagraph'),

				scrollableElement =
					document.querySelector('.TextCardPane .slide-pane__content');

				logTitle('Scrolling to Active Paragraph ' + activeParagraph);
				log('scrollableElement: ');
				log(scrollableElement);
				log('');

			// No need to scroll if the URL does not contain a paragraph query parameter
			if (activeParagraphElement && scrollableElement) {
				const scroller = zenscroll.createScroller(scrollableElement, 1000, 0);
				scroller.center(activeParagraphElement);
			}
		}, 1000);		
	}

	componentDidMount() {
		if (this.props.app.isMobile) {
			// if (!this.props.loading.card && !this.props.mainStack.swipeable) {
			// 	this.setupDeepZoom();
			// }

			if (!this.props.loading.card) {
				this.setupDeepZoom();
			}

			this.props.enableMainStackSwipeable();

		} else {
			const isText =
				this.props.router.location.pathname.split('/')[3];

			logTitle('isText: ' + isText);
			log('');

			if (isText) {
				this.props.activateDesktopText();
			}

			if (!this.props.loading.card) {
				this.setupDeepZoom();
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.app.isMobile) {
			// if (this.props.loading.card && !nextProps.loading.card &&
			// 	!nextProps.mainStack.swipeable) {
			// 	this.setupDeepZoom();
			// }

			if (this.props.loading.card && !nextProps.loading.card) {
				this.setupDeepZoom();
			}

		} else {
			if (nextProps.desktop.text && this.props.loading.card &&
				!nextProps.loading.card) {
				this.constructText();
			}

			if (this.props.loading.card && !nextProps.loading.card) {
				this.setupDeepZoom();
			}
		}

		if (this.props.loading.card && !nextProps.loading.card) {
			setGoogleBotTitle(this.props.card.data.cardName);
			setGoogleBotDescription(this.props.card.data.cardSummary);

			const schema = {
				"@context": "http://schema.org",
				"@graph": [
					{
						"@type": "ScholarlyArticle",
						"genre": this.props.card.data.cardCategory,
						"text": this.state.text,
						"thumbnailUrl": config.s3.cards.URL + this.props.card.data.slug + '/thumbnail.jpg',
						"image": config.s3.cards.URL + this.props.card.data.slug + '/large.jpg'
					}
				]
			};

			setGoogleBotSchema(schema);
		}
	}

	// componentWillMount() {
	// 	if (this.props.app.isMobile) {
	// 		this.props.enableMainStackSwipeable();
	// 	}
	// }

	async activateDeepZoom(event) {
		this.props.disableMainStackSwipeable();

		this.setState(prevState => ({
			pyramidStyle: {
				...prevState.pyramidStyle,
				pointerEvents: 'auto'
			}
		}));

		logTitle('Activating Deep Zoom ...');
		log('');		
	}

	deactivateDeepZoom(event) {
		event.stopPropagation();

		logTitle('Deactivating Deep Zoom ...');
		log('');

		if (this.viewer) {
			this.viewer.destroy();
			this.viewer = null;
		}

		this.props.enableMainStackSwipeable();
	}

	toggleDeepZoom(event) {
		// event.stopPropagation();

		if (this.props.mainStack.swipeable) {
			this.setState(prevState => ({
				pyramidStyle: {
					...prevState.pyramidStyle,
					pointerEvents: 'auto'
				}
			}));

			logTitle('Activating Deep Zoom ...');
			log('');

			this.props.disableMainStackSwipeable();

		} else {
			this.setState(prevState => ({
				pyramidStyle: {
					...prevState.pyramidStyle,
					pointerEvents: 'none'
				}
			}));
			
			logTitle('Deactivating Deep Zoom ...');
			log('');

			this.props.enableMainStackSwipeable();
		}
	}

	navigate(level) {
		this.props.setDiscourseLevel(level,
			this.props.level > level ? 'down' : 'up');

		logTitle('Clicked Overlay Level ' + level);
		log('');

		if (this.viewer) {
			this.viewer.destroy();
			this.viewer = null;
		}

		this.props.history.push('/' + this.props.card.data.shortSlug + '/' +
			this.levels[level]);
		this.props.setCardStackLevel(2, 'right');
		this.props.activateFeedImage(this.levels[level]);
		this.props.selectFeed(level);
	}

	renderMobile() {
		const
			windowHeight = window.innerHeight,
			windowHeightMid = windowHeight/2,

			staticImageStyles = {
				top: windowHeightMid,
				transform: 'translateY(-50%)',
				width: '100%',
				display: 'block',
				margin: '15px auto 0 auto',
				height: 'auto',
				position: 'absolute',
				padding: '18px'
			};

/*
			<div>
			{ !this.props.mainStack.swipeable ?

				<div onClick={this.deactivateDeepZoom.bind(this)}>

					<div ref={node => { this.root = node; }}
						className="Card"
						id="openseadragon-cards"
						style={this.state.pyramidStyle} />

				</div> :

				<div>
					{ this.props.loading.card ? null :
						<img alt='static version of controversy card'
							className="Card"
							src={config.s3.cards.URL + this.props.card.data.slug +
								'/large.jpg'}
							onClick={this.activateDeepZoom.bind(this)}
							style={staticImageStyles} /> }
				</div> }
			</div>
*/

		return (<div onClick={this.activateDeepZoom.bind(this)}>

				<div ref={node => { this.root = node; }}
					className="Card"
					id="openseadragon-cards"
					style={this.state.pyramidStyle} />

			</div>);
	}

	renderDesktop() {
		return (<div>
			<div className="Canvas"
				id='openseadragon-cards'
				style={{width: '100%', height: '100vh'}} />

			<MainStackOverlay
				discourseLevel={0}
				discourseHandler={this.navigate.bind(this)}
				active={this.props.discourse.overlay}
				deactivateOverlayHandler={this.props.deactivateMainStackOverlay} />

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
					this.props.history.push('/' + this.props.card.data.shortSlug + '/worldview/card');
				}}
				onAfterOpen={() => {
					this.props.card.data.text && this.constructText();
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
