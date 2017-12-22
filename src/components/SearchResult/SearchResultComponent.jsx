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
import quote from '../../images/quote.svg';
import './SearchResult.css';
import notFoundImage from '../../images/error-thumbnail.png';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// Algolia Search Dependencies
import { connectHighlight } from 'react-instantsearch/connectors';

// HTML-to-React Parser Dependencies
import { Parser as HtmlToReactParser } from 'html-to-react';

// Click-to-Copy
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import GPlusIcon from 'react-icons/lib/ti/social-google-plus';
import CircledGPlusIcon from 'react-icons/lib/ti/social-google-plus-circular';
import LinkIcon from 'react-icons/lib/md/link';
import TitledLinkIcon from 'react-icons/lib/md/short-text';
import MarkdownIcon from 'react-icons/lib/md/subject';

// import { log } from '../../libs/utils';

// This is a custom combination of two tools:
// (1) https://www.npmjs.com/package/html-to-react
// (2) https://community.algolia.com/react-instantsearch/connectors/connectHighlight.html 
const CustomHighlight = connectHighlight(
	({ highlight, attributeName, hit, highlightProperty }) => {

		const
			h = new HtmlToReactParser(),

			parsedHit = highlight({ attributeName, hit, highlightProperty:
				'_highlightResult' });

		let highlightedHits = parsedHit.map(part => {
				if (part.isHighlighted) return '<mark>' + part.value + '</mark>';
				return part.value;
			});

		if (attributeName === "quoteParagraph") {
			// We need the actual quoted sections to appear in italics
			highlightedHits = highlightedHits.map(el => el.replace(/^"/m, '<i>"'));
			highlightedHits = highlightedHits.map(el => el.replace(/"$/m, '"</i>'));

			// If it's a quoteParagraph, then replace any carriage return characters with
			// HTML linebreaks.  This is a hack which is necessary because when it is placed
			// further up, the HTML breaks are converted back into carriage returns.
			highlightedHits = highlightedHits.map(el => el.replace(/\n/g, "<br/>"));
		} else {
			// Eliminate all anchor tags in search results
			highlightedHits = highlightedHits.map(el => el.replace(/<a href=.*>/g, ''));
			highlightedHits = highlightedHits.map(el => el.replace(/<\/a>/g, ''));
		}

		const
			reactComponent = highlightedHits.reduce((prev, cur) => prev + cur, '');

		return <div>{h.parse(reactComponent)}</div>;
	}
);

class SearchResultComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hitHeight: 0,
			// file: null
		};

		this.props = props;

		this.hitHeader = {
			'cardName': 'Card Title',
			'cardSummary': 'Card Summary',
			'postName': 'Post Name',
			'cardParagraph': 'Card Paragraph',
			'postParagraph': 'Post Paragraph',
			'quoteParagraph': 'Quote Paragraph'
		};

		this.discourseLevelGraphics = {
			'worldview': worldview,
			'model': model,
			'propositional': propositional,
			'conceptual': conceptual,
			'narrative': narrative
		}

		this.thumbnail = null;
	}
	
	componentDidMount() {
		const node = ReactDOM.findDOMNode(this.hitdiv);

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
		if (!hit || !hit.recordType) {
			return '';
		}

		if (hit.recordType === 'cardName') return 'cardName';
		if (hit.recordType === 'cardSummary') return 'cardSummary';
		if (hit.recordType === 'postName') return 'postName';
		if (hit.recordType === 'cardParagraph') return 'cardParagraph';
		if (hit.recordType === 'postParagraph') return 'postParagraph';
		if (hit.recordType === 'quote') return 'quoteParagraph';
	}

	renderQuote(attributeName) {
		const
			rightQuoteStyles = {
				height: '15px',
				position: 'relative',
				bottom: '40px',
				right: '20px'
			},

			// quoteHome = this.props.hit.quoteSeriesItem ?
			// 	`${this.props.hit.quoteSeriesHash}.${this.props.hit.quoteSeriesItem}` :
			// 	`${this.props.hit.quoteSeriesHash}`;

			quoteHome = `${this.props.hit.quoteSeriesHash}`;

		return (<div>
			<Row
				className="CardHit"
				ref={c => this.hitdiv = c}
				key={this.props.hit.objectID}>

				<div
					onClick={() => this.props.showSnackbar('Copied to clipboard', 3000)}
					data-clipboard-text={this.props.hit.quoteParagraph}
					className="QuoteHit"
					style={ {overflowWrap: 'break-word'} }>

					<Col xs={2}>
						<img
							alt="left quote"
							src={quote}
							className="LeftQuote" />
					</Col>
					<Col xs={8}>
						<a className="QuoteName"
							href={`${this.props.location.pathname}?quote=${quoteHome}`}
							onClick={(event) => {event.stopPropagation()}}>

							<p>{this.props.hit.quoteName}</p>
						</a>

						<CustomHighlight
							attributeName={attributeName}
							hit={this.props.hit} />
					</Col>
				</div>
			</Row>
			<Row>
				<Col xs={2} xsOffset={10}
					style={rightQuoteStyles}>

					<img
						alt="right quote"
						src={quote}
						className="RightQuote" />
				</Col>
			</Row>
		</div>);
	}

	renderCard(discourseLevel, hitTextStyle, isTitleOrSummary, attributeHeader,
		attributeName, isPostHit) {

		// /{shortSlug}/{discourseLevel}/card
		// /{shortSlug}/{discourseLevel}/feed/{feedSlug} ... (etc)
		let href = '/';
		if (isTitleOrSummary) {
			href = '/' + this.props.hit.shortSlug + '/worldview/card';

		// Generate pretty paragraph query strings, like so:
		// http://localhost:3000/phantom-debate/worldview/text/?paragraph=73
		} else if (this.props.hit.recordType === 'cardParagraph') {
			const splitId = this.props.hit.id.split('-');
			href = '/' + this.props.hit.shortSlug + '/worldview/text/?paragraph=' +
				splitId[splitId.length-1];

		} else if (this.props.hit.recordType === 'postParagraph') {
			const splitId = this.props.hit.id.split('-');
			href = '/' + this.props.hit.cardSlug + '/worldview/feed/' +
				this.props.hit.feedSlug + '/text/?paragraph=' +
				splitId[splitId.length-1];

		} else if (isPostHit) {
			href = '/' + this.props.hit.cardSlug + '/' +
				this.props.hit.discourseLevel + '/feed/' + this.props.hit.feedSlug
		}

		const feedLink = '/' + (this.props.hit.shortSlug || this.props.hit.cardSlug) + '/' +
			(this.props.hit.discourseLevel || 'worldview') + '/feed';

		const
			gplusLinkTooltip = (<Tooltip id="tooltip">Copy to clipboard G+ link</Tooltip>),
			titledGplusLinkTooltip = (<Tooltip id="tooltip">Copy to clipboard titled G+ link</Tooltip>),
			linkTooltip = (<Tooltip id="tooltip">Copy to clipboard new site link</Tooltip>),
			titledLinkTooltip = (<Tooltip id="tooltip">Copy to clipboard titled new site link</Tooltip>),
			searchResultTooltip = (<Tooltip id="tooltip">Copy to clipboard search result content</Tooltip>);

		// log(this.props.hit);
		// log('');

		return (<Row
			className="CardHit"
			ref={c => this.hitdiv = c}
			key={this.props.hit.objectID}>

			<Col xs={3} className="hit-image">
				<a className="CardHit" href={href} style={{overflowWrap: 'break-word'}}>
					<img ref="loaded"
						alt="controversy card"
						src={this.props.hit.images.thumbnail.url}
						className="CardThumbnail"
						onError={ e => e.target.src = notFoundImage } />
				</a>

				{ (this.props.hit.recordType === 'cardParagraph' ||
					this.props.hit.recordType === 'postParagraph' ||
					this.props.hit.recordType === 'cardSummary') &&

					<a href={feedLink} alt='Feed Posts for this Controversy Card'>
						<img
							className="hit-level Left"
							src={discourseLevel}
							alt="the level of discussion" />
					</a> }
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

				{/* G+ Link */}
				{ (this.props.hit.recordType === 'cardParagraph' ||
					this.props.hit.recordType === 'cardSummary' ||
					this.props.hit.recordType === 'cardName') &&

					<OverlayTrigger placement='top' overlay={gplusLinkTooltip}>
						<GPlusIcon className='ClickToCopyIcon'
							onClick={() => this.props.showSnackbar('Copied G+ link to clipboard:<br />' +
								'...' + this.props.hit.gplusUrl.split('Broken')[1], 3000)}
							data-clipboard-text={this.props.hit.gplusUrl} />
					</OverlayTrigger>}

				{/* Titled G+ Link (Note hack: using sortBy field for title) */}
				{ (this.props.hit.recordType === 'cardParagraph' ||
					this.props.hit.recordType === 'cardSummary' ||
					this.props.hit.recordType === 'cardName') &&

					<OverlayTrigger placement='bottom' overlay={titledGplusLinkTooltip}>
						<CircledGPlusIcon className='ClickToCopyIcon'
							onClick={() => this.props.showSnackbar('Copied titled G+ link to clipboard:<br />' +
								(this.props.hit.cardName || this.props.hit.sortBy) + ':<br />' +
								 '...' + this.props.hit.gplusUrl.split('Broken')[1], 3000)}
							data-clipboard-text={(this.props.hit.cardName || this.props.hit.sortBy) +
								'\n' + this.props.hit.gplusUrl} />
					</OverlayTrigger>}

				{/* Site Link */}
				<OverlayTrigger placement='top' overlay={linkTooltip}>
					<LinkIcon className='ClickToCopyIcon'
						onClick={() => this.props.showSnackbar('Copied link to clipboard:<br />' +
							'https://www.controversiesofscience.com' + href, 3000)}
						data-clipboard-text={'https://www.controversiesofscience.com' + href} />
				</OverlayTrigger>

				{/* Titled Site Link */}
				<OverlayTrigger placement='bottom' overlay={titledLinkTooltip}>
					<TitledLinkIcon className='ClickToCopyIcon'
						onClick={() => this.props.showSnackbar('Copied titled link to clipboard:<br />' +
							(this.props.hit.cardName || this.props.hit.sortBy) + '<br />' + 
							'https://www.controversiesofscience.com' + href, 3000)}
						data-clipboard-text={(this.props.hit.cardName || this.props.hit.postName) + '\n' + 
						'https://www.controversiesofscience.com' + href} />
				</OverlayTrigger>

				{/* Search Result Content */}
				<OverlayTrigger placement='top' overlay={searchResultTooltip}>
					<MarkdownIcon className='ClickToCopyIcon'
						onClick={() => this.props.showSnackbar('Copied search result to clipboard', 3000)}
						data-clipboard-text={this.props.hit[this.props.hit.recordType]} />
				</OverlayTrigger>

				<br />

				{ (this.props.hit.recordType !== 'cardParagraph' &&
					this.props.hit.recordType !== 'postParagraph' &&
					this.props.hit.recordType !== 'cardSummary') &&

					<a href={feedLink} alt='Feed Posts for this Controversy Card'>
						<img
							className="hit-level Right"
							src={discourseLevel}
							alt="the level of discussion" />
					</a> }
			</Col>
		</Row>)
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
				worldview,

			isPostHit = (this.getAttributeName(this.props.hit) === 'postName') ||
				(this.getAttributeName(this.props.hit) === 'postParagraph');

		// If there is no images property, then the result is a quote
		return this.props.hit ?
			(<div>

				{ this.props.hit.images ?
					this.renderCard(discourseLevel, hitTextStyle, isTitleOrSummary,
						attributeHeader, attributeName, isPostHit) :
					this.renderQuote(attributeName) }
		
			</div>) :
			null;
	}
}

export default withRouter(SearchResultComponent);
