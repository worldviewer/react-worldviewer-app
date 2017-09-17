import React, { Component } from 'react';
import './Card.css';
import { withRouter } from 'react-router-dom';
import OpenSeadragon from 'openseadragon';
import config from '../../config';

class CardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pyramidStyle: {
				width: '100%'
			},
			minZoomLevel: this.calculateMinZoomLevel()
		};

		this.props = props;
	}

	// minZoomLevel approaches 1.4 when screen width is 0
	// minZoomLevel should be 0.95 when screen width is 480px
	// minZoomLevel should be 0.7 when screen width is 800px
	// minZoomLevel should be 0.58 when screen width is 1000px
	// minZoomLevel should be 0.48 when screen width is 1200px
	// minZoomLevel should be 0.40 when screen width is 1400px
	// minZoomLevel should be 0.34 when screen width is 1600px
	// minZoomLevel should be 0.26 when screen width is 2000px
	// minZoomLevel should be 0.14 when screen width is 3000px

	// 3rd-order polynomial cubic regression at https://www.mycurvefit.com/
	// y = 1.40601 - 0.000115417x + 3.755247 * 10-7 * x^2
	//     - 4.377216 * 10-11 * x^3
	calculateMinZoomLevel() {
		const x = window.innerWidth;

		if (window.innerWidth <= 480) {
			return 1;
		} else {
			// return 1.406101 - (0.001154107 * x) + (3.755247 * (10 ** -7) * x * x) -
			// 	(4.377216 * (10 ** -11) * x * x * x);

			return 1.30329 - (0.000973696 * x) + (2.780705 * (10 ** -7) * x * x) -
				(2.752571 * (10 ** -11) * x * x * x);
		}
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
		console.log('width: ' + window.innerWidth + ', height: ' + window.innerHeight);

		this.setState({
			minZoomLevel: this.calculateMinZoomLevel()
		});
	}

	// Use this to react to OpenSeadragon zoom events
	setupZoomHandler(viewer) {
		viewer.addHandler('zoom', (data) => {
			this.props.toggleNavbarState(data.zoom);
		});
	}

	componentDidMount() {
		if (!this.props.card.cardLoading) {
			this.setupDeepZoom();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.card.cardLoading && !nextProps.card.cardLoading) {
			this.setupDeepZoom();
		}
	}

	render() {
		return (
			<div
				ref={node => { this.root = node; }}
				className="Card"
				id="openseadragon-cards"
				style={this.state.pyramidStyle} />
		);
	}
}

export default withRouter(CardComponent);
