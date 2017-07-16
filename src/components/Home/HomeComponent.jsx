// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import './Home.css';
import elephant from '../../images/elephant.png';
import { Grid } from 'react-bootstrap';

// Algolia Search Dependencies
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch/dom';
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

	// <p className="baseballCardStyle">Testing 1 2 3 ...</p> 
	render() {
		return (
			<div className="Home">
				<Grid>

					<img
						alt="blind men and the elephant logo"
						src={elephant}
						className="Logo" />

					<InstantSearch
						appId="HDX7ZDMWE9"
						apiKey="f9898dbf6ec456d206e59bcbc604419d"
						indexName="controversy_cards">

						<SearchBox
							className="SearchBox"
							translations={{placeholder: 'Enter a Controversy'}} />

						<Hits
							hitComponent={SearchResult} />

						<SearchResult />

					</InstantSearch>

				</Grid>
			</div>
		);
	}
}

export default withRouter(HomeComponent);
