import ImageCache from './ImageCache';

class ImageHelper {
	constructor() {
		this.imageCache = new ImageCache();
	}

    loadImage(url, options) {
        const image = this.imageCache.get(url, options);

        return new Promise((resolve, reject) => {
            const handleSuccess = () => {
                resolve(image);
            };
            const handleError = () => {
                reject(image);
            };

            if (image.complete) {
                if(image.naturalWidth && image.naturalHeight) {
                    // successful load
                    handleSuccess();
                } else {
                    handleError();
                }

            } else {
                image.addEventListener('load', handleSuccess, false);
                image.addEventListener('error', handleError, false);
            }
        });
    }

    loadImages(urls, options) {
        const promises = urls.map(url => this.loadImage(url, options));
        return Promise.all(promises);
    }

    // preload without caring about the result
    stuffImages(urls, options) {
        this.imageCache.stuff(urls, options);
    }
}

export default ImageHelper;
