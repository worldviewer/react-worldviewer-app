import React, { Component } from 'react';
import './Card.css';
import { withRouter } from 'react-router-dom';
import OpenSeadragon from 'openseadragon';
import config from '../../config';

class CardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cardStyle: {
				width: '100%'
			}
		};

		this.props = props;
	}

	setupDeepZoom() {
		const card = this.props.card.data;

		this.viewer = OpenSeadragon({
			id: 'openseadragon',
			constrainDuringPan: true,
			visibilityRatio: 1.0,
			defaultZoomLevel: 1,
			minZoomLevel: 1,
			maxZoomLevel: card.images.pyramid.maxZoomLevel,
			autoResize: true,
			showZoomControl: false,
			showHomeControl: false,
			showFullPageControl: false,
			showSequenceControl: false,
			tileSources: {
				Image: {
					xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
					Url: config.s3.URL + card.slug + '/pyramid_files/',
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
				id="openseadragon"
				style={this.state.cardStyle} />
		);
	}
}

export default withRouter(CardComponent);
