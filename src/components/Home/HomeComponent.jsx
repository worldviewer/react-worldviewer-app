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
import InfiniteScroll from 'react-infinite-scroll-component';

// mobiscroll.Image + mobiscroll.Form
import mobiscroll from '../../libs/mobiscroll.custom-4.0.0-beta.min';
import '../../libs/mobiscroll.custom-4.0.0-beta.min.css';

// Algolia Search / React Router Integration Dependencies
import { InstantSearch, SearchBox, Stats, Configure, Index, Hits } from 'react-instantsearch/dom';
import SearchResult from '../SearchResult/SearchResult';
import CategorySearchResult from '../CategorySearchResult/CategorySearchResult';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { createConnector } from "react-instantsearch";
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import { getPartsFromFacetString, createFacetStringFromParts, getFacetStringFromURL } from '../../libs/utils';

// Config
import config from '../../config';

// Error/Logger Handling
import { log, logTitle, logQuery } from '../../libs/utils';

// Clipboard Dependencies
import Clipboard from 'clipboard';
import debounce from 'debounce';

// Keyboard Dependencies
import Mousetrap from 'mousetrap';
import throttle from 'lodash.throttle';

// Permits HTML markup encoding in feed text
// import { Parser as HtmlToReactParser } from 'html-to-react';

// React Router / Algolia Search integration
const
	updateAfter = 700,

	createURL = (state, facets) => {
		const encodedFacets = facets
			.replace(/:\s/, '.')
			.replace(/\s/, '-')
			.replace(/\//, '~');

		logTitle('Updating URL with state:');
		log(state);
		log('');

		if (state.quote) {
			return `?${qs.stringify({query: state.query, quote: state.quote})}`;
		} else if (facets && facets !== 'All') {
			return `?${qs.stringify({query: state.query, page: state.page,
				facets: encodedFacets})}`;
		} else {
			return `?${qs.stringify({query: state.query, page: state.page})}`;
		}
	},

	searchStateToUrl = (props, searchState) =>
		searchState ? `${props.location.pathname}${createURL(searchState,
			props.search.facets)}` : '';

const imageStyles = {
	display: 'block',
	margin: '0 auto',
	maxWidth: '480px',
	top: '50px',
	width: '100%'
};

// This prevents a reflow on page render, whereby image loads after the search box,
// https://github.com/roderickhsiao/react-aspect-ratio
const RatioImage = (props) => (
	<AspectRatio ratio="480/302" style={imageStyles}>
		<img
			alt="blind men and the elephant logo"
			src={elephant}
			className="Logo"
			onClick={props.clickHandler} />

	</AspectRatio>
);

class HomeComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchState: qs.parse(props.location.search.slice(1)),
			sequence: null
		};

		this.props = props;

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.debouncedUpdateClickToCopy = debounce(this.updateClickToCopy, 2000);
	}

	// This is how we make sure that the back button alters the page content
	async onBackOrForwardButtonEvent(event) {
		const
			newSearchState = qs.parse(this.props.location.search.slice(1));

		let [newFacets, facetCategory, facetSubCategory] =
			getFacetStringFromURL(newSearchState.facets);

		await this.setState({
			searchState: {
				...newSearchState,
				facets: newFacets
			}
		});

		await this.props.setSearchFacet(facetCategory, facetSubCategory,
			newFacets);

		logTitle('Setting search and facets based upon URL ...');
		log('searchState:');
		log(this.state.searchState);
		log('');
	}

	refreshForm() {
		if (this.refs.form !== undefined) {
			this.refs.form.instance.refresh();
		}
	}

	getFacetIndexFromCharCode(charSequence) {
		const index = config.categories.findIndex(category =>
			category.keys === charSequence);

    	if (index !== -1) {
	    	logTitle('Changing facet value based on keystroke:');
	    	log('character(s): ' + charSequence);
	    	log('index: ' + index);
	    	log('value: ' + config.categories[index].text);
	    	log('');
    	}

    	return index;
	}

	// Let's make it so that clicking the elephant triggers the facet selection.
	// The original input label is hidden.
	async selectFacet() {
		const domNode = ReactDOM.findDOMNode(this.inputElement);
		domNode.click();
	}

	// We need to call this when we land on the app with a quote URL, but then
	// want to do something else
	clearQuote() {
		if (this.state.searchState.quote) {
			this.setState(prevState => ({
				searchState: {
					...prevState.searchState,
					quote: '',
					query: ''
				}
			}));

			this.props.setSearchQuery('');
		}
	}

	setFacetValue(selection) {
		if (selection.valueText) {
			let facetCategory = '',
				facetSubCategory = '';

			[facetCategory, facetSubCategory] =
				getPartsFromFacetString(selection.valueText);

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				selection.valueText);

			this.clearQuote();

			logTitle('Setting New Facet Values:');
			log('facetCategory: ' + facetCategory);
			log('facetSubCategory: ' + facetSubCategory);
			log('');
		}
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

			this.props.setSearchQuery(searchState.query);
		}, updateAfter);

		this.setState({ searchState });
		this.props.setSearchState(...searchState);
	}

	getCurrentFacetIndex(value) {
		return config.categories.findIndex(category =>
			category.text === value);
	}

	// We need to handle both single character events as well as multi-character
	// sequences
	handleKeyDown(event) {
		const
			character = String.fromCharCode(event.keyCode);

		const detectSequence = throttle(() => {
			this.setState({ sequence: null });
		}, 500);

		logTitle('Keypress detected:');
		log(event.keyCode);
		log('');

		// esc: 27 - defocus the search box
		if (document.activeElement === this.searchBoxDOMNode &&
			event.keyCode === 27) {

			this.searchBoxDOMNode.blur();

			setTimeout(() => {
				mobiscroll.toast({
					message: 'ESC - defocus search box',
					duration: 500
				});
			}, 500);
		}

		// spacebar: 32 - focus the search box
		if (document.activeElement === this.searchBoxDOMNode &&
			event.keyCode === 32) {

			mobiscroll.toast({
				message: 'SPACE - focus search box',
				duration: 500
			});

			this.searchBoxDOMNode.focus();
		}

		// up: 38, right: 39 - increment the facet category
		if (document.activeElement !== this.searchBoxDOMNode &&
			(event.keyCode === 38 || event.keyCode === 39)) {

			event.preventDefault();

			const
				facets = this.props.search.facets ? this.props.search.facets : 'All',
				currentFacetIndex = this.getCurrentFacetIndex(facets),
				moddedIncrement = currentFacetIndex === config.categories.length - 1 ?
					0 : currentFacetIndex + 1,
				newFacetValue = config.categories[moddedIncrement].text,
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString(newFacetValue);

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				newFacetValue);

			mobiscroll.toast({
				message: 'RIGHT/UP - move category up',
				duration: 1000
			});
		}

		// down: 40, left: 37 - decrement the facet category
		if (document.activeElement !== this.searchBoxDOMNode &&
			(event.keyCode === 37 || event.keyCode === 40)) {

			event.preventDefault();

			const
				facets = this.props.search.facets ? this.props.search.facets : 'All',
				currentFacetIndex = this.getCurrentFacetIndex(facets),
				moddedDecrement = currentFacetIndex === 0 ?
					config.categories.length - 1 : currentFacetIndex - 1,
				newFacetValue = config.categories[moddedDecrement].text,
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString(newFacetValue);

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				newFacetValue);

			mobiscroll.toast({
				message: 'LEFT/DOWN - move category down',
				duration: 1000
			});
		}

		// Only capture a-z when the search box is not being used
		if (document.activeElement !== this.searchBoxDOMNode &&
			event.keyCode >= 65 && event.keyCode <= 90) {

			this.clearQuote();

			setTimeout(() => {
				if (!this.state.sequence) {
					const
						facetIndex = this.getFacetIndexFromCharCode(character);

					if (facetIndex !== -1) {
						const
							newFacetValue = config.categories[facetIndex].text,
							[facetCategory, facetSubCategory] =
								getPartsFromFacetString(newFacetValue);

						this.props.setSearchFacet(facetCategory, facetSubCategory,
							newFacetValue);

						mobiscroll.toast({
							message: 'A-Z - jump to quote category letter',
							duration: 1000
						});
					}
				}
			}, 500);					

			detectSequence();
		}
	}

	setupKeySequenceHandlers() {
		Mousetrap.bind('a l l', () => {
			this.setState({ sequence: 'all' });
			this.clearQuote();

			mobiscroll.toast({
				message: 'ALL - search all',
				duration: 1000
			});

			logTitle('Character sequence detected for All');
			log('');

			const
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString('');

			this.props.setSearchFacet(facetCategory, facetSubCategory, '');
		});

		Mousetrap.bind('c o n', () => {
			this.setState({ sequence: 'con' });
			this.clearQuote();

			mobiscroll.toast({
				message: 'CON - search controversy cards',
				duration: 1000
			});

			logTitle('Character sequence detected for Controversy Cards');
			log('');

			const
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString('Controversy Cards');

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				'Controversy Cards');
		});

		Mousetrap.bind('q u o', () => {
			this.setState({ sequence: 'quo' });
			this.clearQuote();

			mobiscroll.toast({
				message: 'QUO - search quotes',
				duration: 1000
			});

			logTitle('Character sequence detected for Quotes');
			log('');

			const
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString('Quotes');

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				'Quotes');
		});

		Mousetrap.bind('f e e', () => {
			this.setState({ sequence: 'fee' });
			this.clearQuote();

			mobiscroll.toast({
				message: 'FEE - search feed posts',
				duration: 1000
			});

			logTitle('Character sequence detected for Feed Posts');
			log('');

			const
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString('Feed Posts');

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				'Feed Posts');
		});

		Mousetrap.bind('c o m', () => {
			this.setState({ sequence: 'com' });
			this.clearQuote();

			mobiscroll.toast({
				message: 'COM - search user comments',
				duration: 1000
			});

			logTitle('Character sequence detected for Comments');
			log('');

			const
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString('Comments');

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				'Comments');
		});

		Mousetrap.bind('c r i', () => {
			this.setState({ sequence: 'cri' });
			this.clearQuote();

			mobiscroll.toast({
				message: 'CRI - search critique cards/feeds',
				duration: 1000
			});

			logTitle('Character sequence detected for Cards/Feeds: critique');
			log('');

			const
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString('Cards/Feeds: critique');

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				'Cards/Feeds: critique');
		});

		Mousetrap.bind('h i s', () => {
			this.setState({ sequence: 'his' });
			this.clearQuote();

			mobiscroll.toast({
				message: 'HIS - search historical controversies (cards/feeds)',
				duration: 1000
			});

			logTitle('Character sequence detected for Cards/Feeds: historical');
			log('');

			const
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString('Cards/Feeds: historical');

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				'Cards/Feeds: historical');
		});

		Mousetrap.bind('o n g', () => {
			this.setState({ sequence: 'ong' });
			this.clearQuote();

			mobiscroll.toast({
				message: 'ONG - search ongoing controversies (cards/feeds)',
				duration: 1000
			});

			logTitle('Character sequence detected for Cards/Feeds: ongoing');
			log('');

			const
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString('Cards/Feeds: ongoing');

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				'Cards/Feeds: ongoing');
		});

		Mousetrap.bind('p e r', () => {
			this.setState({ sequence: 'per' });
			this.clearQuote();

			mobiscroll.toast({
				message: 'PER - search people cards/feeds',
				duration: 1000
			});

			logTitle('Character sequence detected for Cards/Feeds: person');
			log('');

			const
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString('Cards/Feeds: person');

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				'Cards/Feeds: person');
		});

		Mousetrap.bind('r e f', () => {
			this.setState({ sequence: 'ref' });
			this.clearQuote();

			mobiscroll.toast({
				message: 'REF - search reform cards/feeds',
				duration: 1000
			});

			logTitle('Character sequence detected for Cards/Feeds: reform');
			log('');

			const
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString('Cards/Feeds: reform');

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				'Cards/Feeds: reform');
		});

		Mousetrap.bind('t h i', () => {
			this.setState({ sequence: 'thi' });
			this.clearQuote();

			mobiscroll.toast({
				message: 'THI - search thinking cards/feeds',
				duration: 1000
			});

			logTitle('Character sequence detected for Cards/Feeds: thinking');
			log('');

			const
				[facetCategory, facetSubCategory] =
					getPartsFromFacetString('Cards/Feeds: thinking');

			this.props.setSearchFacet(facetCategory, facetSubCategory,
				'Cards/Feeds: thinking');
		});
	}

	async componentDidMount() {
		// To prevent flash of unstyled content
		document.getElementById('fouc').style.display = 'block';

		// This is necessary because the autoFocus={true} prop which is supposedly on
		// the SearchBox component apparently does nothing
		this.searchBoxDOMNode = ReactDOM.findDOMNode(this.textInput).querySelector('input');
		this.searchBoxDOMNode.focus();

		logTitle('Setting search and facets based upon URL ...');
		log('searchState:');
		log(qs.parse(this.props.location.search.slice(1)));
		log('');

		if (this.state.searchState.quote) {
			const newSearchState = {
				...qs.parse(this.props.location.search.slice(1)),
				query: this.state.searchState.quote
			}

			this.props.setSearchState(newSearchState);
			this.props.setSearchQuery(this.state.searchState.quote);

		} else {
			this.props.setSearchState(qs.parse(this.props.location.search.slice(1)));
			// When we load the page with a search term already in the query parameters
			this.props.setSearchQuery(this.state.searchState.query);
		}

		const [decodedFacet, facetCategory, facetSubCategory] =
			getFacetStringFromURL(this.state.searchState.facets);

		this.props.setSearchFacet(facetCategory, facetSubCategory,
			decodedFacet);

		document.addEventListener("keydown", this.handleKeyDown);
		this.setupKeySequenceHandlers();

		window.onpopstate = this.onBackOrForwardButtonEvent.bind(this);
	}

	// This is meant to resolve an issue that occurs when the search has changed in some sort
	// of manner.  The search results component does not always understand that it
	// needs to update, even though the Stats component does update -- and it appears to happen
	// exclusively when the page has scrolled past the first.
	async componentWillReceiveProps(nextProps) {
		if (!this.props.navbar.facetTrigger && nextProps.navbar.facetTrigger) {
			this.selectFacet();
			this.props.unselectFacet();
		}

		if ((nextProps.search.facetCategory !== this.props.search.facetCategory) ||
			(nextProps.search.facetSubCategory !== this.props.search.facetSubCategory) ||
			(nextProps.search.query !== this.props.search.query)) {

			let facets = [];

			if (this.state.searchState.indices &&
				this.state.searchState.indices['controversy-cards'] &&
				this.state.searchState.indices['controversy-cards'].configure &&
				this.state.searchState.indices['controversy-cards'].configure.facetFilters) {

				facets = createFacetStringFromParts(nextProps.search.facetCategory,
					nextProps.search.facetSubCategory);

				await this.setState(prevState => ({
					searchState: {
						...prevState.searchState,
						facets,
						query: nextProps.search.query || '',
						indices: {
							...prevState.searchState.indices,
							'controversy-cards': {
								...prevState.searchState.indices['controversy-cards'],
								page: 1
							}
						}
					}
				}));

				await nextProps.setSearchState({
					...nextProps.searchState,
					facets,
					query: nextProps.search.query || '',
					page: 1
				});

			} else {
				await this.setState(prevState => ({
					searchState: {
						...prevState.searchState,
						page: 1
					}
				}));

				await nextProps.setSearchState({
					...this.props.searchState,
					page: 1
				});
			}

			logTitle('Forcing search result update back to page 1 ...');
			log(this.state.searchState);
			log('');

			this.forceUpdate();
		}

		if (nextProps.location.search !== this.props.location.search) {
			logQuery(this.props.location.search);
			logQuery('--> ' + nextProps.location.search);
		}
	}

	// This is how we will force the page to appear in the URL
	async componentDidUpdate(prevProps, prevState) {
		this.debouncedUpdateClickToCopy();

		if (this.state.searchState && prevState.searchState) {
			const
				cur = this.state.searchState,
				prev = prevState.searchState;

			if (cur.indices && prev.indices) {
				const
					curIndices = cur.indices,
					prevIndices = prev.indices;

				if (curIndices['controversy-cards'] &&
					prevIndices['controversy-cards']) {

					const
						curCards = curIndices['controversy-cards'],
						prevCards = prevIndices['controversy-cards'];

					if (curCards.page !== prevCards.page) {
						await this.setState(prevState => ({
							searchState: {
								...prevState.searchState,
								page: curCards.page
							}
						}));

						logTitle('Pagination event:');
						log(prevCards.page + ' --> ' + curCards.page);
						log(this.state.searchState);
						log('');

						this.props.setSearchState(this.state.searchState);
					}
				}
			}
		}
	}

	async updateClickToCopy() {
    	this.quoteHits = await document.querySelectorAll('.QuoteHit');
    	this.clipboard = new Clipboard(this.quoteHits);

    	logTitle('Setting up click-to-copy:');
    	log('.QuoteHit:');
    	log(this.quoteHits);
    	log('');
	}

	render() {
		// Do not do this: It's way too slow ...
		// const isSearch = this.props.router.location && this.props.router.location.search ? 
		// 	this.props.router.location.state.query !== '' :
		// 	false;

		let categoryText;

		if (this.state.searchState.quote) {
			categoryText = 'this particular quote series';
		} else {
			categoryText = this.props.search.facetCategory +
				(this.props.search.facetSubCategory ?
					': ' + this.props.search.facetSubCategory :
					'');			
		}

		let facetArray = [];

		// I use the recordType field to select just card and feed titles when there is
		// no search query.  This permits browsing of controversy cards and feed post
		// titles.
		if (this.state.searchState.quote) {
			facetArray = [`quoteSeriesHash:${this.state.searchState.quote}`];

		} else if (this.props.search.facetCategory === 'Controversy Cards' &&
			!this.props.search.query) {
			facetArray = [`facetCategory:Controversy Cards`,
				`facetSubCategory:${this.props.search.facetSubCategory}`,
				'recordType:cardName'];

		} else if (this.props.search.facetCategory === 'Feed Posts' &&
			!this.props.search.query) {
			facetArray = [`facetCategory:Feed Posts`,
				`facetSubCategory:${this.props.search.facetSubCategory}`,
				'recordType:postName'];

		} else if (this.props.search.facetCategory === 'Cards/Feeds' &&
			!this.props.search.query) {
			facetArray = [[`facetCategory:Controversy Cards`, `facetCategory:Feeds`],
				`facetSubCategory:${this.props.search.facetSubCategory}`,
				['recordType:cardName', 'recordType:postName']];

		} else if (this.props.search.facetCategory === 'Cards/Feeds') {
			facetArray = [[`facetCategory:Controversy Cards`, `facetCategory:Feeds`],
				`facetSubCategory:${this.props.search.facetSubCategory}`];

		} else if (this.props.search.facetSubCategory) {
			if (this.props.search.facetSubCategory.match(' / ')) {
				const subCategories = this.props.search.facetSubCategory.split(' / ');

				facetArray = [`facetCategory:${this.props.search.facetCategory}`];
				let facetORArray = [];

				subCategories.forEach(sub => {
					facetORArray.push(`facetSubCategory:${sub}`);
				});

				facetArray.push(facetORArray);

			} else {
				facetArray = [`facetCategory:${this.props.search.facetCategory}`,
					`facetSubCategory:${this.props.search.facetSubCategory}`];
			}
		} else if (this.props.search.facetCategory) {
			facetArray = [`facetCategory:${this.props.search.facetCategory}`];			
		}

    	// logTitle('InstantSearch searchState:');
    	// log(this.state.searchState);
    	// log('');

    	let s, hitsPerPage = 0;

    	if (!this.state.searchState.quote) {
    		s = this.props.search.query;
    		hitsPerPage =
    			(s === 'cards' || s === 'feeds' || s === 'card' || s === 'feed') ?
    			7 : 3;
    	}

		return (
			<div className="Home" id="fouc">

				<FadeIn>
					<RatioImage
						clickHandler={this.selectFacet.bind(this)} />

					<div className="FacetSelect">
						<mobiscroll.Image
							ref={input => this.inputElement = input}
							theme="ios-dark"
							display="center"
							enhance={true}
							onInit={this.refreshForm.bind(this)}
							onSet={this.setFacetValue.bind(this)}>

							{ config.categories.map((category, i) =>
								<li data-val={category.text} key={i}>
									{/* <img src={category.icon} /> */}
									<p>{category.text}</p>
								</li>) }

						</mobiscroll.Image>
					</div>

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

							<p className='CategoryLabel'>Searching {categoryText || 'All'}</p>
						</Grid>

						<br />

						<Index indexName="controversy-categories">
							<Configure hitsPerPage={hitsPerPage} />
							<Hits hitComponent={CategorySearchResult} />
						</Index>

						<Index indexName="controversy-cards">
							<Configure facetFilters={facetArray} />
							<ConditionalHits
								facetCategory={this.props.search.facetCategory}
								facetSubCategory={this.props.search.facetSubCategory} />
						</Index>

					</InstantSearch>
				</FadeIn>

			</div>
		);
	}
}

// https://github.com/algolia/react-instantsearch/blob/master/docgen/src/examples/e-commerce-infinite/App.js
function CustomHits({ hits, refine, hasMore }) {
	// logTitle('hits in CustomHits:');
	// log(hits);
	// log('');

	return (
		<main id="hits">
			<InfiniteScroll next={refine} hasMore={hasMore}>
				{hits.map((hit, i) => <SearchResult hit={hit} key={i} />)}
			</InfiniteScroll>
		</main>
	);
}

// Only displays search results when there is a query
// https://community.algolia.com/react-instantsearch/guide/Custom_connectors.html
const ConditionalHits = createConnector({
	displayName: "ConditionalQuery",
	getProvidedProps(props, searchState, searchResults, searchForFacetValuesResults) {
		let {query, hits} = searchResults.results ? searchResults.results : {};

		// We use this to detect if we are displaying a quote series
		const quote = searchState && searchState.quote;

		// This is necessary because we have multiple indices -- one for
		// categories and another for cards
		if (searchResults.results && searchResults.results['controversy-cards']) {
			// logTitle('searchResults:');
			// log(searchResults.results['controversy-cards']);
			// log('');

			const
				controResults = searchResults.results['controversy-cards'];

			query = controResults.query;
			hits = controResults.hits;

		} else {
			// logTitle('searchResults:');
			// log(searchResults.results);
			// log('');
		}

		// FOR DEBUGGING:

		// logTitle('searchForFacetValuesResults:');
		// log(searchForFacetValuesResults);
		// log('');

		// logTitle('searchState:');
		// log(searchState);
		// log('');

		// logTitle('query, hits, props:');
		// log(query);
		// log(hits);
		// log(props);
		// log('');

		return { query, hits, props, quote };
	}

})(({ query, hits, props, quote }) => {
	const hs =
		// do not display results if no hits, query or facets
		((hits && query && props.facetCategory === '' && props.facetSubCategory === '') ||

		// display (alphabetized) results if one of the facets is specified
		(hits && (props.facetCategory !== '' || props.facetSubCategory !== '')) ||

		// display if a short quote hash has been provided 
		quote) ?

		(<div id="hits">
			<Grid>

				<Stats />
				<ConnectedHits />

			</Grid>

		</div>)
		: null;

	return (
		<div id="hits">
			{hs}
		</div>);
});

const ConnectedHits = connectInfiniteHits(CustomHits);

export default withRouter(HomeComponent);
