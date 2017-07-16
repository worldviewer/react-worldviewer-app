import React, { Component } from 'react';
import './SearchResult.css';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { connectHighlight } from 'react-instantsearch/connectors';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

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
				if (part.isHighlighted) return <mark key={counter++}>{part.value}</mark>;
				return h.parse(part.value);
			});

		return <div>{highlightedHits}</div>;
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
		console.log(this.props);
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
