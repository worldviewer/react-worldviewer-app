import React, { Component } from 'react';
import './FeedCard.css';
import share from './share.svg';
import down from './downdown.svg';
import chris from './chris.jpg';
import 'font-awesome-sass-loader';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Badge, Image } from 'react-bootstrap';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

class FeedCardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isTextExpanded: false
		};

		this.handleClick = this.handleClick.bind(this);
		this.props = props;
	}

	handleClick() {
		this.setState({
			isTextExpanded: !this.state.isTextExpanded
		});
	}

	componentDidMount() {
	}

	render() {
		const
			h = new HtmlToReactParser(),

			imageStyles = this.state.isTextExpanded ?
				{ height: 0 } :
				{},

			chipStyles = {
				display: 'flex',
				flexWrap: 'wrap'
			},

			shareStyles = this.state.isTextExpanded ?
				{ display: 'none' } :
				{
					backgroundColor: '#1D1D1D',
					borderStyle: 'solid',
					borderWidth: '1px',
					cursor: 'pointer',
					left: '30px',
					height: '36px',
					padding: '3px',
					position: 'relative',
					top: '30px',
					width: '36px',
					zIndex: 10
				},

			updownStyles = this.state.isTextExpanded ?
				{ transform: 'scaleY(1)' } :
				{},

			// Avatar images must be a minimum of 40 x 40 pixels
			avatarStyles = {
				height: 40,
				width: 40
			}

		return (
			<div className="Feedcard">
				<Grid>
					<Row>

						<div className="image" style={imageStyles}>
							<Image src={share} style={shareStyles} className="share" circle />
						</div>

					</Row>
					<Row>

						<div className="info">
							<Image
								src={down}
								className="updown"
								style={updownStyles}
								onClick={this.handleClick}
								circle />
							<div className="title">Were dark matter filaments "predicted"?</div>
						</div>

					</Row>
					<Row>

						<div className="breadcrumbs">The History of the Birkeland Current > Clash of Worldviews > Noteworthy Online Discussions</div>

					</Row>
					<Row>

						<div className="ratings">
							<div style={chipStyles}>
								<p>Testing  <Badge>9</Badge></p>
							</div>
						</div>

					</Row>
					<Row>

						<div className="author">
							<div className="avatar">
								<Image src={chris} style={avatarStyles} circle />
							</div>
							<div className="author-info">
								<div className="name">Chris Reeve</div>
								<div className="role">Master of Controversies</div>
							</div>
						</div>

					</Row>
					<Row>

						<div className="content">{h.parse('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam faucibus tellus dui, sit amet fermentum justo venenatis ut. Cras lacinia nisl bibendum, vehicula mauris sed, mollis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}</div>

					</Row>
				</Grid>
			</div>
		);
	}
};

export default withRouter(FeedCardComponent);
