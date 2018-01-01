const algoliaSitemap = require('algolia-sitemap');
const config = require('./config');

const algoliaConfig = {
	appId: 'HDX7ZDMWE9',
	apiKey: 'f9898dbf6ec456d206e59bcbc604419d', // Must have a browse permission
	indexName: 'controversy-cards'
};

const facets = config.categories.filter(category => category.text !== 'All');

function hitToParams(hit) {
	const domain = 'https://www.controversiesofscience.com/';

	switch (hit.recordType) {
		// https://www.controversiesofscience.com/empty-vacuum-mistake/worldview/card
		case 'cardName':
		case 'cardSummary':

			return {loc: domain + hit.shortSlug + '/worldview/card'};

		// https://www.controversiesofscience.com/arp/worldview/text?paragraph=7
		case 'cardParagraph':

			return {loc: domain + hit.shortSlug + '/worldview/text?paragraph=' +
				hit.id.split('-').slice(-1)};

		// https://www.controversiesofscience.com/arp/conceptual/feed/arp-explains-quasar-conventional
		case 'postName':

			return {loc: domain + hit.cardSlug + '/' + hit.discourseLevel +
				'/feed/' + hit.feedSlug};

		// https://www.controversiesofscience.com/arp/worldview/feed/importance-of-deep-photographs/text?paragraph=15
		case 'postParagraph':

			return {loc: domain + hit.cardSlug + '/' + hit.discourseLevel +
				'/feed/' + hit.feedSlug + '/text?paragraph=' +
				hit.id.split('-').slice(-1)};

		// https://www.controversiesofscience.com/?quote=a0401bc
		case 'quote':

			return {loc: domain + '?quote=' + hit.quoteSeriesHash};
	}
}

function getUrlFromCategoryLabel(label) {
	return label
		.replace(': ', '.')
		.replace(' / ', '~')
		.replace(' ', '-');
}

algoliaSitemap({
	algoliaConfig,
	sitemapLoc: 'https://www.controversiesofscience.com/sitemaps',
	outputFolder: 'sitemaps',

	// params: {
	// 	facets: facets.map(category =>
	// 		getUrlFromCategoryLabel(category.text))
	// },
	
	hitToParams

}).then(() => {
	console.log('params.facets:\n');

	console.log(facets.map(category =>
			getUrlFromCategoryLabel(category.text)));

	console.log('\nDone generating sitemaps'); // eslint-disable-line no-console

}).catch(console.error); // eslint-disable-line no-console
