import React, { Component } from 'react';
import './FeedCard.css';
import share from './share.svg';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import chris from './chris.jpg';
import 'font-awesome-sass-loader';
import { withRouter } from 'react-router-dom';

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

			chipStyles = {
				chip: {
					margin: 4,
					fontFamily: ['Lato', 'Helvetica']
				},
				wrapper: {
					display: 'flex',
					flexWrap: 'wrap'
				},
			},

			imageStyles = this.state.isTextExpanded ?
				{ height: 0 } :
				{},

			outerShareStyles = this.state.isTextExpanded ?
				{
					width: 0,
				 	height: 0,
				 	opacity: 0,
				 	margin: '18px' } :
				{
					margin: 0,
					opacity: 0.6
				},

			innerShareStyles = this.state.isTextExpanded ?
				{
					width: 0,
				 	height: 0,
				 	opacity: 0 } :
				{
					margin: 0,
					opacity: 1
				};

		return (
			<div className="feedcard">
				<div className="image" style={imageStyles}>
					<div className="share-outer-circle" style={outerShareStyles}>
						<div className="share-inner-circle" style={innerShareStyles}>
							<img className="share" alt="share" src={share} style={innerShareStyles} />
						</div>
					</div>
				</div>

				<div className="info">

						<span className="chevron fa-stack" onClick={this.handleClick}>
							<i className="fa fa-circle fa-stack-2x fa-inverse"></i>

							{this.state.isTextExpanded ?
								<i className="circles fa fa-chevron-down fa-stack-1x"></i> :
								<i className="circles fa fa-chevron-up fa-stack-1x"></i>
							}
						</span>

					<div className="title">Were dark matter filaments "predicted"?</div>

					<div className="breadcrumbs">The History of the Birkeland Current > Clash of Worldviews > Noteworthy Online Discussions</div>

					<div className="ratings">
						<div style={chipStyles.wrapper}>
							<Chip style={chipStyles.chip}>
								<Avatar size={32}>9</Avatar>
								Testing
							</Chip>
						</div>
					</div>

					<div className="author">
						<div className="avatar">
							<Avatar src={chris} />
						</div>
						<div className="author-info">
							<div className="name">Chris Reeve</div>
							<div className="role">Master of Controversies</div>
						</div>
					</div>

					<div className="content">{h.parse('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam faucibus tellus dui, sit amet fermentum justo venenatis ut. Cras lacinia nisl bibendum, vehicula mauris sed, mollis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}</div>
				</div>
			</div>
		);
	}
};

export default withRouter(FeedCardComponent);
