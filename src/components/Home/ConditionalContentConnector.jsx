import { createConnector } from 'react-instantsearch/connectors';

const content = createConnector({
	displayName: 'ConditionalResults',
	getProvidedProps(props, searchState, searchResults) {
		const noResults = searchResults.results ? searchResults.results.nbHits === 0 : false;
		return {query: searchState.query, noResults};
	}
});

export default content;
