// Slugs Dependencies
// import DeviceStorage from 'react-device-storage';

// Error/Logger Handling
// mobiscroll.Image + mobiscroll.Form + 
import mobiscroll from './mobiscroll.custom-3.2.5.min';
import './mobiscroll.custom-3.2.5.min.css';

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

// When there is an expired token, the very first error message is:
// Authorization Error: __WEBPACK_IMPORTED_MODULE_4__sigV4Client__.a.newClient(...)
// .signRequest is not a function.  Subsequent messages will then warn that
// the token is expired.
export function isExpiredToken(exceptionMessage) {
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