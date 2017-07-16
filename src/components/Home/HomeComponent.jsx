// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import './Home.css';
import elephant from '../../images/elephant.png';
import { Grid } from 'react-bootstrap';

// Algolia Search Dependencies
import { InstantSearch, Hits, SearchBox, Stats, Pagination } from 'react-instantsearch/dom';
import SearchResult from '../SearchResult/SearchResult';

// React Router Dependencies
import { withRouter } from 'react-router-dom';

// Permits HTML markup encoding in feed text
// import { Parser as HtmlToReactParser } from 'html-to-react';

class HomeComponent extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

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
					indexName="controversy_cards">

					<Grid>

						<SearchBox
							className="SearchBox"
							translations={{placeholder: 'Enter a Controversy'}} />

						<Stats />

						<Hits
							hitComponent={SearchResult} />

						<SearchResult />

					</Grid>

					<Pagination showLast />

				</InstantSearch>

			</div>
		);
	}
}

export default withRouter(HomeComponent);
