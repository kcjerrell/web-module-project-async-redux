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
		const onColor = hex_inverse_bw(color);
		this._cache[color] = { ...data, onColor };

		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this._cache));
	}
}

const cache = new ColorCache();

export default cache;

const hex_to_rgb = hex => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
};

const hex_inverse_bw = hex => {
	const rgb = hex_to_rgb(hex);
	const luminance = (0.2126 * rgb["r"] + 0.7152 * rgb["g"] + 0.0722 * rgb["b"]);
	return (luminance < 140) ? "#ffffff" : "#000000";
}