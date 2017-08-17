import React, { Component } from 'react';
import './CardText.css';
import { withRouter } from 'react-router-dom';
// import { Grid, Row, Col } from 'react-bootstrap';
import qs from 'qs';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

import zenscroll from 'zenscroll';

class CardTextComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ''
		}

		this.props = props;
	}

	constructText() {
		console.log(this.props.card);

		const
			h = new HtmlToReactParser(),
			queryString = qs.parse(this.props.location.search.slice(1)),
			activeParagraph = queryString['paragraph'] ?
				parseInt(queryString['paragraph'], 10) :
				-1;

		let paragraphTag, text = '';

		for (let num = 0; num < this.props.card.data.text.length; num++) {
			if (num === 0) {
				paragraphTag = "<p className='FirstParagraph'>";
			} else if (num === activeParagraph + 1) {
				paragraphTag = "<p id='ActiveParagraph'>";
			} else {
				paragraphTag = "<p>";
			}

			text = text + paragraphTag + this.props.card.data.text[num].paragraph +
				'</p><br/>';
		}

		const
			parsed = h.parse(text);

		this.setState({
			text: parsed
		});

		setTimeout(() => {
			const
				activeParagraphElement =
					document.getElementById('ActiveParagraph'),

				// This was a nightmare to locate
				scrollableElement =
					document.querySelector('.CardStack .react-swipeable-view-container div:nth-of-type(2)');

			const scroller = zenscroll.createScroller(scrollableElement, 1000, 0);
			scroller.center(activeParagraphElement);
		}, 1000);
	}

	componentDidMount() {
		if (!this.props.card.cardLoading) {
			this.constructText();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.card.cardLoading && !nextProps.card.cardLoading) {
			this.constructText();
		}

		// We want the user to see the scrolling happen
		if (this.props.cardStack.level !== 1 && nextProps.cardStack.level === 1) {

		}
	}

	render() {
		return (<div id="Paragraphs"
			ref={ node => this.paragraphs = node }>{ this.state.text }</div>);
	}

}

export default withRouter(CardTextComponent);
