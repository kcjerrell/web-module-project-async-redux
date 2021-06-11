import axios from "axios"
import Scheme from "../models/Scheme";
import cache from './ColorCache';

const apiUrl = 'https://www.colr.org/json/';

const buildUrl = (...parts) => {
	const endPoint = parts.join('/');
	const url = `${apiUrl}${endPoint}`;

	// This is probably stupid
	Object.getPrototypeOf(url).query = params => addQuery(url, params);
	return url;
}

const addQuery = (url, params) => {
	const kvs = Object.keys(params).map(k => `${k}=${params[k]}`);
	const query = kvs.join('&');

	return [url, query].join('?');
}

/**
 * A descriptive tag applied to a scheme or color
 * @typedef {Object} Tag
 * @property {number} id
 * @property {string} name
 */

/**
 * A collection of colors
 * @typedef {Object} Scheme
 * @property {string[]} colors
 * @property {number} id
 * @property {Tag[]} tags
 */

/**
 *
 * @param {number} count - how many random schemes to fetch
 * @returns {Scheme[]}
 */
export const getRandomSchemes = (count = 1, minSize = 4) => {
	const url = buildUrl('schemes', 'random', count).query({ scheme_size: `>${minSize}` });
	return axios.get(url).then(res => {
		return res.data.schemes.filter(scheme => scheme.colors.length >= minSize).map(scheme => new Scheme(scheme));
	});
}

export const getColorInfo = (color) => {
	if (cache.hasColor(color))
		return Promise.resolve(cache.getColor(color));

	const url = buildUrl('color', color);
	return axios.get(url).then(res => {
		const colorInfo = res.data.colors[0];
		cache.addColor(color, colorInfo);

		return colorInfo;
	});
}