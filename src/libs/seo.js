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
		el.setAttribute('type', 'application/ld+json');
		el.text = jsonld;
		var doc = document.getElementsByTagName('head')[0];
		doc.appendChild(el);
	}
}

export function setOGTitle(title) {
	let el = document.querySelector('meta[property="og:title"]');

	if (el) {
		el.setAttribute('content', title);
	} else {
		el = document.createElement('meta');
		el.setAttribute('content', title);
		el.setAttribute('property', 'og:title');

		document.getElementsByTagName('head')[0].appendChild(el);	
	}
}

export function setOGType(type) {
	let el = document.querySelector('meta[property="og:type"]');

	if (el) {
		el.setAttribute('content', type);
	} else {
		el = document.createElement('meta');
		el.setAttribute('content', type);
		el.setAttribute('property', 'og:type');

		document.getElementsByTagName('head')[0].appendChild(el);	
	}
}

export function setOGUrl(url) {
	let el = document.querySelector('meta[property="og:url"]');

	if (el) {
		el.setAttribute('content', url);
	} else {
		el = document.createElement('meta');
		el.setAttribute('content', url);
		el.setAttribute('property', 'og:url');

		document.getElementsByTagName('head')[0].appendChild(el);	
	}
}

export function setOGImage(url) {
	let el = document.querySelector('meta[property="og:image"]');

	if (el) {
		el.setAttribute('content', url);
	} else {
		el = document.createElement('meta');
		el.setAttribute('content', url);
		el.setAttribute('property', 'og:image');

		document.getElementsByTagName('head')[0].appendChild(el);	
	}
}

export function setOGDescription(text) {
	let el = document.querySelector('meta[property="og:description"]');

	if (el) {
		el.setAttribute('content', text);
	} else {
		el = document.createElement('meta');
		el.setAttribute('content', text);
		el.setAttribute('property', 'og:description');

		document.getElementsByTagName('head')[0].appendChild(el);	
	}
}

export function setFBAppId(id) {
	let el = document.querySelector('meta[property="fb:app_id"]');

	if (el) {
		el.setAttribute('content', id);
	} else {
		el = document.createElement('meta');
		el.setAttribute('content', id);
		el.setAttribute('property', 'fb:app_id');

		document.getElementsByTagName('head')[0].appendChild(el);	
	}
}

