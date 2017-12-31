export function setGoogleBotTitle(title) {
	document.title = title;
}

export function setGoogleBotDescription(descr) {
	let el = document.querySelector('meta[name=description]');

	if (el) {
		el.setAttribute('content', descr);
	} else {
		el = document.createElement('meta');
		el.setAttribute('content', descr);

		document.getElementsByTagName('head')[0].appendChild(el);
	}
}

export function setGoogleBotCanonical(url) {
	let el = document.querySelector('link[rel=canonical]');

	if (el) {
		el.setAttribute('href', url);
	} else {
		el = document.createElement('link');
		el.setAttribute('href', url);

		document.getElementsByTagName('head')[0].appendChild(el);
	}
}

// index can be index or noindex
// follow can be follow or nofollow
export function setGoogleBotRobots(index, follow) {
	let el = document.querySelector('meta[name=robots]');

	if(el) {
		el.setAttribute('content', index + ', ' + follow);
	} else {
		el = document.createElement('meta');
		el.setAttribute('content', index + ', ' + follow);

		document.getElementsByTagName('head')[0].appendChild(el);
	}
}

export function setGoogleBotSchema(schema) {
	var jsonld = JSON.stringify(schema);
	let el = document.querySelector('script[type="application/ld+json"]');

	if (el) {
		el.text = jsonld;
	} else {
		el = document.createElement('script');
		el.setAttribute('type', 'type="application/ld+json"');
		el.text = jsonld;
		var doc = document.getElementsByTagName('head')[0];
		doc.appendChild(el);
	}
}
