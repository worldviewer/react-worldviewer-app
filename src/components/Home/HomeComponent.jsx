// React Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// UI Dependencies
import './Home.css';
import elephant from '../../images/elephant.png';
import { Grid } from 'react-bootstrap';
import AspectRatio from 'react-aspect-ratio';
import 'react-aspect-ratio/aspect-ratio.css';
import FadeIn from 'react-fade-in';

// Algolia Search / React Router Integration Dependencies
import { InstantSearch, Hits, SearchBox, Stats, Pagination } from 'react-instantsearch/dom';
import SearchResult from '../SearchResult/SearchResult';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { createConnector } from "react-instantsearch";

// AWS Dependencies
import { invokeApig } from '../../libs/awsLib';

// Permits HTML markup encoding in feed text
// import { Parser as HtmlToReactParser } from 'html-to-react';

// React Router / Algolia Search integration
const
	updateAfter = 700,
	createURL = state => `?${qs.stringify(state)}`,
	searchStateToUrl = (props, searchState) =>
		searchState ? `${props.location.pathname}${createURL(searchState)}` : '';

const imageStyles = {
	display: 'block',
	margin: '0 auto',
	maxWidth: '480px',
	width: '100%'
};

// This prevents a reflow on page render, whereby image loads after the search box,
// https://github.com/roderickhsiao/react-aspect-ratio
const RatioImage = () => (
	<AspectRatio ratio="480/302" style={imageStyles}>
		<img
			alt="blind men and the elephant logo"
			src={elephant}
			className="Logo" />

	</AspectRatio>
);

class HomeComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchState: qs.parse(props.location.search.slice(1))
		};

		this.props = props;
	}

	// This and the other InstantSearch / React Router integration code comes from
	// https://github.com/algolia/react-instantsearch/blob/master/packages
	// /react-instantsearch/examples/react-router/src/App.js 
	onSearchStateChange = searchState => {
		clearTimeout(this.debouncedSetState);
		this.debouncedSetState = setTimeout(() => {

			// This was not in the supplied code, but it is necessary in order to
			// clear out the search query parameter when there is no active search
			if (!searchState.query) {
				searchState = {};
			}

			this.props.history.push(
				searchStateToUrl(this.props, searchState),
				searchState
			);
		}, updateAfter);

		this.setState({ searchState });
	};

	async componentDidMount() {
		// To prevent flash of unstyled content
		document.getElementById('fouc').style.display = 'block';

		// This is necessary because the autoFocus={true} prop which is supposedly on
		// the SearchBox component apparently does nothing
		const searchBoxDOMNode = ReactDOM.findDOMNode(this.textInput).querySelector('input');
		searchBoxDOMNode.focus();

		// TEST
		const arp = await invokeApig( {path: '/controversies/halton-arp-the-modern-galileo'}, this.props.user.token);

		console.log('HALTON ARP CARD:');
		console.log(arp);
	}

	render() {
		// Do not do this: It's way too slow ...
		// const isSearch = this.props.router.location && this.props.router.location.search ? 
		// 	this.props.router.location.state.query !== '' :
		// 	false;

		return (
			<div className="Home" id="fouc">

				<FadeIn>
					<RatioImage />

					<InstantSearch
						appId="HDX7ZDMWE9"
						apiKey="f9898dbf6ec456d206e59bcbc604419d"
						indexName="controversy-cards"
						searchState={this.state.searchState}
						onSearchStateChange={this.onSearchStateChange.bind(this)}
						createURL={createURL}>

						<Grid>
							<SearchBox
								ref={ input => { this.textInput = input } }
								className="SearchBox"
								focusShortcuts={[' ']}
								translations={{placeholder: 'Enter a Controversy'}} />
						</Grid>

						<ConditionalHits />

					</InstantSearch>
				</FadeIn>

			</div>
		);
	}
}

// Only displays search results when there is a query
const ConditionalHits = createConnector({
	displayName: "ConditionalQuery",
	getProvidedProps(props, searchState, searchResults) {
		const { query, hits } = searchResults.results ? searchResults.results : {};
		return { query, hits };
	}
})(({ query, hits }) => {

	const hs =
		hits && query
		? (<div id="hits">
			<Grid>

				<Stats />
				<Hits hitComponent={SearchResult} />

			</Grid>

			<Pagination showLast />
		</div>)
		: null;

	return (
		<div id="hits">
			{hs}
		</div>);
});

export default withRouter(HomeComponent);
