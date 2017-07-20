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

const
	updateAfter = 700,
	createURL = state => state ? `?${qs.stringify(state)}` : '',
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

	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.router.location
	// 		&& nextProps.router.location.state
	// 		&& this.props.router.location
	// 		&& this.props.router.location.state) {

	// 		if (nextProps.router.location.state.query === '' &&
	// 			this.props.router.location.state.query !== '') {

	// 			this.props.history.push(
	// 				searchStateToUrl(nextProps, ''),
	// 				''
	// 			);
	// 			this.setState({ searchState: '' });

	// 		}
	// 	}
	// }

	render() {
		// Be very careful with this: Do not assume that this.props.router.location.state is there!
		const isSearch = this.props.router.location && this.props.router.location.search ? 
			this.props.router.location.state.query !== '' :
			false;

		console.log('isSearch: ' + isSearch);

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

						{ isSearch && <Stats /> }
						{ isSearch && <Hits hitComponent={SearchResult} /> }

						{ isSearch && <SearchResult /> }

					</Grid>

					{ isSearch && <Pagination showLast /> }

				</InstantSearch>

			</div>
		);
	}
}

export default withRouter(HomeComponent);
