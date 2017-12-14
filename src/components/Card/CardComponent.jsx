// React Dependencies
import React, { Component } from 'react';

// React Router Dependences
import { withRouter } from 'react-router-dom';

// UI Dependencies
import './Card.css';
import OpenSeadragon from 'openseadragon';
import config from '../../config';
import { calculateMinZoomLevel } from '../../libs/utils';

class CardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pyramidStyle: {
				width: '100%'
			},
			minZoomLevel: calculateMinZoomLevel()
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
			minZoomLevel: calculateMinZoomLevel()
		});
	}

	// Use this to react to OpenSeadragon zoom events
	setupZoomHandler(viewer) {
		viewer.addHandler('zoom', (data) => {

		});
	}

	componentDidMount() {
		if (!this.props.loading.card) {
			this.setupDeepZoom();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.loading.card && !nextProps.loading.card) {
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
