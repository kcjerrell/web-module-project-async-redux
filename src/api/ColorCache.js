const STORAGE_KEY = 'colorCache';

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
