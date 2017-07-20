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
			this.props.history.push(
				searchStateToUrl(this.props, searchState),
				searchState
			);
		}, updateAfter);

		this.setState({ searchState });
	};

	render() {
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

						{ this.props.query && <Stats /> }
						{ this.props.query && <Hits hitComponent={SearchResult} /> }

					</Grid>

					{ this.props.query && <Pagination showLast /> }

				</InstantSearch>

			</div>
		);
	}
}

export default withRouter(HomeComponent);
