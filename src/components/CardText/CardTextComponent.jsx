import React, { Component } from 'react';
import './CardText.css';
import { withRouter } from 'react-router-dom';
// import { Grid, Row, Col } from 'react-bootstrap';
import qs from 'qs';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

class CardTextComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ''
		}

		this.props = props;
	}

	constructText() {
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
			} else if (num === activeParagraph+1) {
				paragraphTag = "<p className='ActiveParagraph'>";
			} else {
				paragraphTag = "<p>";
			}

			text = text + paragraphTag + this.props.card.data.text[num].paragraph + '</p><br/>';
		}

		this.setState({
			text: h.parse(text)
		});
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
	}

	render() {
		return (<div>{ this.state.text }</div>);
	}

}

export default withRouter(CardTextComponent);
