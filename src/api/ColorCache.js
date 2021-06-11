const STORAGE_KEY = 'colorCache';

// I'm not sure the colr.org api actually has any useful color information worth caching, or even fetching
// at all. Also, it doesn't have a rate limit (that I'm aware of) so there's not much of an advantage to
// caching api requests here anyway. YOU DON'T HAVE TO BE POLITE TO APIs.
class ColorCache {
	_cache;

	constructor() {
		const stored = window.localStorage.getItem(STORAGE_KEY);

		if (!stored)
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify({}));

		this._cache = JSON.parse(stored ?? {});
	}

	hasColor(color) {
		return this._cache.hasOwnProperty(color);
	}

	getColor(color) {
		return this._cache[color];
	}

	addColor(color, data) {
		this._cache[color] = data;

		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this._cache));
	}
}

const cache = new ColorCache();

export default cache;
