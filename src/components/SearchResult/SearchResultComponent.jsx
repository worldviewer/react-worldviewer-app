// React Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// UI Dependencies
import { Row, Col } from 'react-bootstrap';
import worldview from '../../images/worldview-node.svg';
import model from '../../images/model-node.svg';
import propositional from '../../images/propositional-node.svg';
import conceptual from '../../images/conceptual-node.svg';
import narrative from '../../images/narrative-node.svg';

import './SearchResult.css';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// Algolia Search Dependencies
import { connectHighlight } from 'react-instantsearch/connectors';

// HTML-to-React Parser Dependencies
import { Parser as HtmlToReactParser } from 'html-to-react';

// This is a custom combination of two tools:
// (1) https://www.npmjs.com/package/html-to-react
// (2) https://community.algolia.com/react-instantsearch/connectors/connectHighlight.html 
const CustomHighlight = connectHighlight(
	({ highlight, attributeName, hit, highlightProperty }) => {
		const
			h = new HtmlToReactParser(),

			parsedHit = highlight({ attributeName, hit, highlightProperty:
				'_highlightResult' }),

			highlightedHits = parsedHit.map(part => {
				if (part.isHighlighted) return '<mark>' + part.value + '</mark>';
				return part.value;
			}),

			reactComponent = highlightedHits.reduce((prev, cur) => prev + cur);

		return <div>{h.parse(reactComponent)}</div>;
	}
);

class SearchResultComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hitHeight: 0
		};

		this.props = props;

		this.hitHeader = {
			'cardName': 'Card Title',
			'cardSummary': 'Card Summary',
			'postName': 'Post Name',
			'cardParagraph': 'Card Paragraph',
			'postParagraph': 'Post Paragraph'
		};

		this.discourseLevelGraphics = {
			'worldview': worldview,
			'model': model,
			'propositional': propositional,
			'conceptual': conceptual,
			'narrative': narrative
		}
	}

	componentDidMount() {
		const node = ReactDOM.findDOMNode(this.refs['Hit']);

		if (node) {
			this.setState({
				hitHeight: node.clientHeight
			});
		}
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
				this.discourseLevelGraphics[this.props.hit.discourseLevel] :
				worldview;

		return this.props.hit ?
			(<Row
				className="hit"
				ref="Hit"
				key={this.props.hit.objectID}>

				<Col xs={3} className="hit-image">
					<img
						alt="controversy card"
						src={this.props.hit.images.thumbnail.url}
						className="CardThumbnail" />

					{ this.state.hitHeight > 147 && <img
						className="hit-level"
						src={discourseLevel}
						alt="the level of discussion" /> }
				</Col>
				<Col xs={9}>
					<span
						className="hit-text"
						style={hitTextStyle}>

						{isTitleOrSummary ? null : attributeHeader}
						<CustomHighlight
							attributeName={attributeName}
							hit={this.props.hit} />

					</span>
					{ this.state.hitHeight <= 147 && <img
						className="hit-level"
						src={discourseLevel}
						alt="the level of discussion" /> }
				</Col>
		
			</Row>) :
			null;
	}
}

export default withRouter(SearchResultComponent);
