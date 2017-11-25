// React Dependencies
import React, { Component } from 'react';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// UI Dependencies
import { Grid, Row, Col } from 'react-bootstrap';
import './Feed.css';

// Image Manipulation Dependencies
import getPixels from 'get-pixels';
import convert from 'color-convert';

// AWS Dependencies
import { s3Download } from '../../libs/aws';
import config from '../../config';

// Error/Logger/Notifications Handling
import { log, logTitle, logError } from '../../libs/utils';

class FeedComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			images: []
		};

		this.props = props;
	}

	componentDidMount() {
		this.getFeedPostImage();
	}

	// componentWillReceiveProps(nextProps) {
	// 	if (this.props.loading.feeds && !nextProps.loading.feeds) {
	// 		this.getFeedPostImage();
	// 	}
	// }

	async getFeedPostImage() {
		// feed post title: Quasar Exhibits 10x Superluminal Motions at Inferred Distance
		const s3Key = 'halton-arp-the-modern-galileo/worldview/10-times-quasar-superluminal-motion/small.jpg';
		
		const image = await s3Download(s3Key, 'image/jpeg', 'feeds',
			this.props.user.token);

		this.getPixels(image.src);

		this.setState({images: [image]});
	}

	// captioning options:
	// 5 x 3 (xlarge-caption format, just top or bottom),
	// 3 x 2 (large-caption format, just top or bottom),
	// 1 x 3 (medium-caption format, just left or right) and
	// 2 x 1 tiles (small-caption format, any side)

	// non-captioning options:
	// 3 x 3 (large-image format)
	// 2 x 2 (medium-image format)
	// 1 x 1 (small-image format)

	// The first step is to generate a set of options for captioning an
	// image.  The logic should go like this: (1) How long is the title text?  We
	// need a way to identify if the text is going to fit into each possible
	// caption possibility; (2) Now, combine that information with the image
	// caption options; (3) What if we permit ellipses for titles, and what if we
	// allow captions to just have black backgrounds? These must necessarily add
	// to the total number of options (even though they should not be the first).

	// Now, the final step: given the total set of feed posts, where a set of
	// caption options has been specified for each one, we should randomly select
	// a grid format and populate it from a randomized list of the total feed posts
	// for that specific controversy card.
	getTitleCaptionOptions(imageEdges, title) {

	}

	// inputs: content / format / caption details
	// If isCaptioned === false, then position === null
	createCaptionedImage({src, title}, {isCaptioned, size}, {position, bgColor, fgColor}) {
		const captionStyles = {
			backgroundColor: bgColor,
			color: fgColor
		};

		const imageStyles = {

		};

		const captionedImageStyles = {

		};

		// Just to make sure
		if (!isCaptioned) {
			position = null;
			title = null;
		}

		switch (position) {
			case 'left':
				return (<div className='CaptionedImage' style={captionedImageStyles}>
						<div className='Caption' style={captionStyles}>

						</div>
						<div className='Image'>
							<img src={src} alt='feed post' style={imageStyles} />
						</div>
					</div>);

			case 'right':
				return (<div className='CaptionedImage' style={captionedImageStyles}>
						<div className='Image'>

						</div>
						<div className='Caption' style={captionStyles}>
							<img src={src} alt='feed post' style={imageStyles} />
						</div>
					</div>);

			case 'top':
				return (<div className='CaptionedImage' style={captionedImageStyles}>
						<div className='Caption' style={captionStyles}>

						</div>
						<div className='Image'>
							<img src={src} alt='feed post' style={imageStyles} />
						</div>
					</div>);

			case 'bottom':
				return (<div className='CaptionedImage' style={captionedImageStyles}>
						<div className='Image'>

						</div>
						<div className='Caption' style={captionStyles}>
							<img src={src} alt='feed post' style={imageStyles} />
						</div>
					</div>);

			// No caption
			default:
				return (<div className='CaptionedImage' style={captionedImageStyles}>
						<img src={src} alt='feed post' style={imageStyles} />
					</div>);

				break;
		}
	}

	getRandomGrid() {

	}

	generateRandomFeedPostList(card) {

	}

	createGrid() {

	}

	// pixels.get(0, 0, 0) prints red color for top-left pixel.
	// pixels.get(1, 0, 1) prints green color for 1 pixel to the right from that.
	// pixels.get(0, 1, 2) prints blue color for 1 pixel down from top-left.

	// the stride value takes care of translating our parameters into actual pixel
	// values since the data has to be encoded linearly.  For example, the x stride
	// value is 4 because to get to the next value, we have to pass by red, green,
	// and then blue for current pixel value.  Similarly, the y-axis stride value
	// for a 640-pixel wide image would be 640x4 = 2560.  The stride value for RGB
	// by this same logic is just 1.
	getPixels(image) {
		getPixels(image, (err, pixels) => {
			if (err) {
				console.log("Bad image path")
    			return;
			}

			logTitle('Pixels:');
			log(pixels);
			log('');

			const results = this.getImageCaptionOptions(pixels);

			logTitle('Image Edges:');
			log(results);
			log('');
		});
	}

	// Note: this method currently expects perfect color match
	getImageCaptionOptions(pixels) {
		let results = {
			top: {
				captionable: true
			},
			bottom: {
				captionable: true
			},
			left: {
				captionable: true
			},
			right: {
				captionable: true
			}
		};

		const
			topLeftColor = convert.rgb.hex([
				pixels.get(0, 0, 0), // R
				pixels.get(0, 0, 1), // G
				pixels.get(0, 0, 2)  // B
			]),

			// pixels.shape[0]-1 is the last x pixel,
			// pixels.shape[1]-1 is the last y pixel
			bottomRightColor = convert.rgb.hex([
				pixels.get(pixels.shape[0]-1, pixels.shape[1]-1, 0),
				pixels.get(pixels.shape[0]-1, pixels.shape[1]-1, 1),
				pixels.get(pixels.shape[0]-1, pixels.shape[1]-1, 2)
			]);

		// Top Edge
		let x = 0;

		while (x < pixels.shape[0] && results.top.captionable) {
			let color = convert.rgb.hex([
				pixels.get(x, 0, 0),
				pixels.get(x, 0, 1),
				pixels.get(x, 0, 2)
			]);

			if (color !== topLeftColor) {
				results.top.captionable = false;
			}

			++x;
		}

		if (results.top.captionable) {
			results.top.color = '#' + topLeftColor;
		}

		// Bottom Edge
		let y = 0,
			bottom = pixels.shape[1]-1;

		while (x < pixels.shape[0] && results.bottom.captionable) {
			let color = convert.rgb.hex([
				pixels.get(x, bottom, 0),
				pixels.get(x, bottom, 1),
				pixels.get(x, bottom, 2)
			]);

			if (color !== bottomRightColor) {
				results.bottom.captionable = false;
			}

			++x;
		}

		if (results.bottom.captionable) {
			results.bottom.color = '#' + bottomRightColor;
		}

		// Left Edge
		y = 0;

		while (y < pixels.shape[1] && results.left.captionable) {
			let color = convert.rgb.hex([
				pixels.get(0, y, 0),
				pixels.get(0, y, 1),
				pixels.get(0, y, 2)
			]);

			if (color !== topLeftColor) {
				results.left.captionable = false;
			}

			++y;
		}

		if (results.left.captionable) {
			results.left.color = '#' + topLeftColor;
		}

		// Right Edge
		y = 0;
		let right = pixels.shape[0]-1;

		while (y < pixels.shape[1] && results.right.captionable) {
			let color = convert.rgb.hex([
				pixels.get(right, y, 0),
				pixels.get(right, y, 1),
				pixels.get(right, y, 2)
			]);

			if (color !== bottomRightColor) {
				results.right.captionable = false;
			}

			++y;
		}

		if (results.right.captionable) {
			results.right.color = '#' + bottomRightColor;
		}

		return results;
	}

	render() {
		return (
			<div className="Feed">
				<Grid>
					<Row>
						<img src={this.state.images[0] ?
							this.state.images[0].src : null}
							width="33.33%" alt="feed post" />
					</Row>
				</Grid>
			</div>
		);
	}

}

export default withRouter(FeedComponent);
