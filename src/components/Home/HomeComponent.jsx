// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import './Home.css';
import elephant from '../../images/elephant.png';
import { Grid } from 'react-bootstrap';

// Algolia Search / React Router Integration Dependencies
import { InstantSearch, Hits, SearchBox, Stats, Pagination } from 'react-instantsearch/dom';
import SearchResult from '../SearchResult/SearchResult';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

// Permits HTML markup encoding in feed text
// import { Parser as HtmlToReactParser } from 'html-to-react';

// React Router / Algolia Search integration
const
	updateAfter = 700,
	createURL = state => `?${qs.stringify(state)}`,
	searchStateToUrl = (props, searchState) =>
		searchState ? `${props.location.pathname}${createURL(searchState)}` : '';

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

	render() {
		// Do not do this: It's way too slow ...
		// const isSearch = this.props.router.location && this.props.router.location.search ? 
		// 	this.props.router.location.state.query !== '' :
		// 	false;

		return (
			<div className="Home">

				<img
					alt="blind men and the elephant logo"
					src={elephant}
					className="Logo" />

				<InstantSearch
					appId="HDX7ZDMWE9"
					apiKey="f9898dbf6ec456d206e59bcbc604419d"
					indexName="controversy_cards"
					searchState={this.state.searchState}
					onSearchStateChange={this.onSearchStateChange.bind(this)}
					createURL={createURL}>

					<Grid>

						<SearchBox
							className="SearchBox"
							translations={{placeholder: 'Enter a Controversy'}} />

						{ this.state.searchState.query && <Stats /> }
						{ this.state.searchState.query && <Hits hitComponent={SearchResult} /> }

						<SearchResult />

					</Grid>

					{ this.state.searchState.query && <Pagination showLast /> }

				</InstantSearch>

			</div>
		);
	}
}

export default withRouter(HomeComponent);
