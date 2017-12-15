// React Dependencies
import React, { Component } from 'react';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// UI Dependencies
import qs from 'qs';
import zenscroll from 'zenscroll';
import './CardText.css';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

// Error/Logger Handling
import { log, logTitle, logObject } from '../../libs/utils';

class CardTextComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ''
		}

		this.props = props;
	}

	constructText() {
		logTitle('Card data:')
		logObject(this.props.card);
		log('');

		const
			h = new HtmlToReactParser(),
			queryString = qs.parse(this.props.location.search.slice(1)),
			activeParagraph = queryString['paragraph'] ?
				parseInt(queryString['paragraph'], 10) :
				-1;

		let paragraphTag, text = '';

		for (let num = 0; num < this.props.card.data.text.length; num++) {
			if (num === 0) {
				paragraphTag = "<p className='FirstCardParagraph'>";
			} else if (num === activeParagraph + 1) {
				paragraphTag = "<p id='ActiveCardParagraph'>";
			} else {
				paragraphTag = "<p>";
			}

			text = text + paragraphTag + this.props.card.data.text[num].paragraph +
				'</p>';
		}

		const
			parsed = h.parse(text);

		this.setState({
			text: parsed
		});

		setTimeout(() => {
			const
				activeParagraphElement =
					document.getElementById('ActiveCardParagraph'),

				// This was a nightmare to locate
				scrollableElement =
					document.querySelector('.CardStack .react-swipeable-view-container div:nth-of-type(2)');

			// No need to scroll if the URL does not contain a paragraph query parameter
			if (activeParagraphElement && scrollableElement) {
				const scroller = zenscroll.createScroller(scrollableElement, 1000, 0);
				scroller.center(activeParagraphElement);
			}
		}, 1000);
	}

	componentDidMount() {
		if (!this.props.loading.card) {
			this.constructText();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.loading.card && !nextProps.loading.card) {
			this.constructText();
		}

		// We want the user to see the scrolling happen
		if (this.props.cardStack.level !== 1 && nextProps.cardStack.level === 1) {

		}
	}

	render() {
		return (<div id="CardParagraphs"
			ref={ node => this.paragraphs = node }>

			{this.state.text}

			</div>);
	}

}

export default withRouter(CardTextComponent);
