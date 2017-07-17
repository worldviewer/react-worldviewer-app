// React Dependencies
import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';

// UI Dependencies
import { Row, Col } from 'react-bootstrap';
import './SearchResult.css';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// Algolia Search Dependencies
import { connectHighlight } from 'react-instantsearch/connectors';

// HTML-to-React Parser Dependencies
import { Parser as HtmlToReactParser } from 'html-to-react';
import HtmlToReact from 'html-to-react';

const isValidNode = () => {
	return true;
};

// Order matters. Instructions are processed in the order they're defined.
let processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
let processingInstructions = [
	{
		// Custom <mark> processing 
		shouldProcessNode: function (node) {
			return node.parent && node.parent.name && node.parent.name === 'mark';
		},
		processNode: function (node, children) {
			return node.data;
		}
	}, {
		// Anything else 
		shouldProcessNode: function (node) {
			// console.log('shouldProcessNode: ', node);
			return true;
		},
		processNode: processNodeDefinitions.processDefaultNode
	}];

let counter = 0;

// TODO: Fix this so that the mark tag does not disrupt the HTML styling.
// https://www.npmjs.com/package/html-to-react
const CustomHighlight = connectHighlight(
	({ highlight, attributeName, hit, highlightProperty }) => {
		const
			h = new HtmlToReactParser(),
			parsedHit = highlight({ attributeName, hit, highlightProperty:
				'_highlightResult' }),
			highlightedHits = parsedHit.map(part => {
				if (part.isHighlighted) return '<mark>' + part.value + '</mark>';
				return part.value;
			});

		const
			reactComponent = highlightedHits.reduce((prev, cur) => prev + cur);

		// const
		// 	reactComponent = h.parse(highlightedHits);
			// reactComponent = h.parseWithInstructions(highlightedHits,
				// isValidNode, processingInstructions);
			// reactHtml = ReactDOMServer.renderToStaticMarkup(reactComponent);

		return <div>{h.parse(reactComponent)}</div>;
	}
);

class SearchResultComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;

		this.hitHeader = {
			'cardName': 'Card Title',
			'cardSummary': 'Card Summary',
			'postName': 'Post Name',
			'cardParagraph': 'Card Paragraph',
			'postParagraph': 'Post Paragraph'
		};
	}

	componentDidMount() {

	}

	// Notice that we pass attributeName prop into the CustomHighlight component.
	// Because a search hit can be one of five different types of attributes, we
	// have to determine which attribute exists in the hit object, and adjust both
	// the header and attributeName prop accordingly.
	getAttributeName(hit) {
		const hitKeys = Object.keys(hit);

		if (hitKeys.includes('cardName')) return 'cardName';
		if (hitKeys.includes('cardSummary')) return 'cardSummary';
		if (hitKeys.includes('postName')) return 'postName';
		if (hitKeys.includes('cardParagraph')) return 'cardParagraph';
		if (hitKeys.includes('postParagraph')) return 'postParagraph';
	}

	render() {
		const
			attributeName = this.props.hit ?
				this.getAttributeName(this.props.hit) :
				null,

			isTitleOrSummary = attributeName === 'cardName' 
				|| attributeName === 'cardSummary',

			hitTextStyle = isTitleOrSummary ?
				{
					fontFamily: 'LeagueGothic',
					textTransform: 'uppercase',
					fontSize: '20px',
					letterSpacing: '1px',
					lineHeight: '1.2'
				} :
				null,

			// For cardName and cardSummary, we will use the League Gothic font in white
			attributeHeader = this.props.hit && isTitleOrSummary ?
				<b>{this.hitHeader[attributeName] + ':'}</b> :
				null,

			discourseLevel = this.props.hit && this.props.hit.discourseLevel ?
				<span><b>Discourse Level: </b>{this.props.hit.discourseLevel}</span> :
				null;

		return this.props.hit ?
			(<Row
				className="hit"
				key={this.props.hit.objectID}>

				<Col xs={3} className="hit-image">
					<img
						alt="controversy card"
						src={this.props.hit.images.thumbnail.url}
						className="CardThumbnail" />
				</Col>
				<Col xs={9}>
					<span className="hit-text" style={hitTextStyle}>
						{isTitleOrSummary ? null : attributeHeader}
						<CustomHighlight
							attributeName={attributeName}
							hit={this.props.hit} />
					</span>
					<span className="hit-level">
						{discourseLevel}
					</span>
				</Col>
		
			</Row>) :
			null;
	}
}

export default withRouter(SearchResultComponent);
