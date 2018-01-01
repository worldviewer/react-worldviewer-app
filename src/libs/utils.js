// New User Instructions
import DeviceStorage from 'react-device-storage';

// Error/Logger Handling
// mobiscroll.Image + mobiscroll.Form + 
import mobiscroll from './mobiscroll.custom-4.0.0-beta2.min';
import './mobiscroll.custom-4.0.0-beta2.min.css';

// https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
export function isEmptyObject(obj) {
	return Object.keys(obj).length === 0 &&
		obj.constructor === Object;
}

// https://stackoverflow.com/questions/32702431/display-images-fetched-from-s3
export function encode(data) {
	let str = '';
	for (let i = 0; i < data.length; i++) {
		str = str + String.fromCharCode(data[i]);
	}

	// const str = data.reduce((a,b) => a + String.fromCharCode(b), '');
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
}

export function getPartsFromFacetString(facetString = '') {
	let facetCategory = '',
		facetSubCategory = '';

	if (facetString.match(': ')) {
		[facetCategory, facetSubCategory] = facetString.split(': ');
	} else {
		facetCategory = facetString === 'All' ?
			'' :
			facetString;
	}

	return [facetCategory, facetSubCategory];
}

export function createFacetStringFromParts(facetCategory, facetSubCategory) {
	if (facetCategory !== '' && facetSubCategory !== '') {
		return facetCategory + ': ' + facetSubCategory;
	} else if (facetCategory !== '' && facetSubCategory === '') {
		return facetCategory;
	} else {
		return '';
	}
}

export function getFacetStringFromURL(rawFacetString) {
	let decodedFacetString = '',
		facetCategory = '',
		facetSubCategory = '';

	if (rawFacetString) {
		decodedFacetString = rawFacetString
			.replace('.', ': ')
			.replace('~', ' / ')
			.replace('-', ' ');

		[facetCategory, facetSubCategory] =
			getPartsFromFacetString(decodedFacetString);
	}

	return [decodedFacetString, facetCategory, facetSubCategory];
}

// When there is an expired token, the very first error message is:
// Authorization Error: __WEBPACK_IMPORTED_MODULE_4__sigV4Client__.a.newClient(...)
// .signRequest is not a function.  Subsequent messages will then warn that
// the token is expired.
export function isExpiredToken(exceptionMessage) {
	console.log(exceptionMessage);

	if (!exceptionMessage) {
		return false;
	}

	return exceptionMessage.match('signRequest is not a function') ||
		exceptionMessage.match('Token expired');
}

// Aggregate here all infrastructure errors.  These are errors which
// are not the fault of the user in any way, and there is nothing
// that the user can do about them other than to try again later.
export function isNetworkError(exceptionMessage) {
	return exceptionMessage.match('Error Creating Listing: Failed to fetch') ||
		exceptionMessage.match('Error Updating Listing: Failed to fetch');
}

export const consoleTitleStyles = [
	'background: black',
	'color: white',
	'padding: 2px'
].join(';');

export const consoleErrorTitleStyles = [
	'background: red',
	'color: black',
	'padding: 2px'
].join(';');

export const consoleRouteStyles = [
	'background: red',
	'color: white',
	'line-height: 60px',
	'text-align: center',
	'font-weight: bold',
	'padding: 10px',
	'font-size: 25px'
].join(';');

export const consoleQueryStyles = [
	'background: green',
	'color: white',
	'line-height: 60px',
	'text-align: center',
	'font-weight: bold',
	'padding: 10px',
	'font-size: 25px'
].join(';');

// When we log something, we should save it to both the console and
// log4javascript, which we use to upload to our server
export function log(message) {
	console.log(message);
}

// We use this to mark a new section in the console, for ease of reading
export function logErrorTitle(message) {
	console.log('%c' + message, consoleErrorTitleStyles);
}

// We use this to mark a new section in the console, for ease of reading
export function logTitle(message) {
	console.log('%c' + message, consoleTitleStyles);
}

// For logging route changes
export function logRoute(message) {
	console.log('%c' + message, consoleRouteStyles);
}

// For logging route changes
export function logQuery(message) {
	console.log('%c' + message, consoleQueryStyles);
}

export function logObject(obj) {
	console.dir(obj);
}

// We should check here for certain common errors w/ regular expressions because it's
// not always possible to know exactly which try/catch will register.

// cta (Call to Action) is e.g. "Login", and the loginCallback in that case would be
// () => this.props.history.push('/login').

// reload is used to automate the reload of non-authorized pages via
// reloadCallback when it is true.

export function logError(e, message, userToken, reloadPage, reloadCallback,
	cta, loginCallback) {

	const snackbarDuration = 20000;

	// Step 1: Display a user-friendly error message on the screen +
	// attempt to deal with the situation
	if (isExpiredToken(message)) {
		if (!reloadPage) {
			mobiscroll.snackbar({
				message: 'Authorization Error: Your session has expired. You will need to log back in if you wish to view this page / perform this action.',
				duration: snackbarDuration
			});
		} else {
			reloadCallback();
		}

	} else if (isNetworkError(message)) {
		mobiscroll.snackbar({
			message: 'Network Error: There appears to be a problem with either our servers or your Internet connection.  You might want to first try a better connection.',
			duration: snackbarDuration
		});

	} else if (cta) {
		mobiscroll.snackbar({
			message,
			duration: snackbarDuration,
			button: {
				text: cta,
				action: loginCallback
			}
		});

	} else {
		mobiscroll.snackbar({
			message,
			duration: snackbarDuration
		});
	}
}

export async function setDiskInstructions(instructions) {
	try {
		const storage = new DeviceStorage().localStorage();
		storage.save('instructions', JSON.stringify(instructions));
	} catch(e) {
		// no op if we can't do this
	}
}

export function fetchDiskInstructions() {
	const storage = new DeviceStorage().localStorage();

	// defaults
	let instructionsFromDisk = null,
		defaults = {
			all: true,
			firstHomepageLanding: true,
			firstQuoteResult: true,
			firstControversyCardResult: true,
			firstControversyCard: true,
			firstFeed: true,
			firstQuoteClick: true
		};

	try {
		instructionsFromDisk = storage.read('instructions');
	} catch(e) {
		// no op if it's not there
	}

	if (!instructionsFromDisk) {
		storage.save('instructions', JSON.stringify(defaults));
	}

	return instructionsFromDisk ?
		JSON.parse(instructionsFromDisk) :
		defaults;
}

export function isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);

    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    
    return isVisible;
}

// minZoomLevel approaches 1.4 when screen width is 0
// minZoomLevel should be 0.95 when screen width is 480px
// minZoomLevel should be 0.7 when screen width is 800px
// minZoomLevel should be 0.58 when screen width is 1000px
// minZoomLevel should be 0.48 when screen width is 1200px
// minZoomLevel should be 0.40 when screen width is 1400px
// minZoomLevel should be 0.34 when screen width is 1600px
// minZoomLevel should be 0.26 when screen width is 2000px
// minZoomLevel should be 0.14 when screen width is 3000px

// 3rd-order polynomial cubic regression at https://www.mycurvefit.com/
// y = 1.40601 - 0.000115417x + 3.755247 * 10-7 * x^2
//     - 4.377216 * 10-11 * x^3

// This may not be the best approach, because there is not always a strong
// correlation between screen width and necessary height; it probably makes
// more sense to just set the height, and let the width be calculated.
export function calculateMinZoomLevel() {
	const x = window.innerWidth;

	if (x <= 480) {
		return 1;
	} else {
		// return 1.406101 - (0.001154107 * x) + (3.755247 * (10 ** -7) * x * x) -
		// 	(4.377216 * (10 ** -11) * x * x * x);

		return 1.30329 - (0.000973696 * x) + (2.780705 * (10 ** -7) * x * x) -
			(2.752571 * (10 ** -11) * x * x * x);
	}
}
