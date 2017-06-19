class ImageCache {
	constructor() {
		this.hash = {};
		this.cache = [];
	}

	add(url, options = {}) {
	    if (!this.hash[url]) {
	        this.hash[url] = new Image();

	        if (options.crossOrigin) {
	            this.hash[url].crossOrigin = options.crossOrigin;
	        }

	        this.hash[url].src = url;

	        this.cache.push(this.hash[url]);
	    }
	    return this.hash[url];
	}

	get(url, options) {
	    return this.add(url, options);
	}

	stuff(urls, options) {
	    if (urls.length > 0) {
	        urls.map(url => this.add(url, options));
	    }
	}
}

export default ImageCache;
