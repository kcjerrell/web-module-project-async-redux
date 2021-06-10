import axios from "axios";

class ApiCache {
	// cache = {};
	// hits = 0;
	// misses = 0;

	constructor(options) {
		const { name, url, ignore, queryAll } = options;
		this._name = name;

		// we're gonna make sure the base url ends with '/'
		this._url = url.slice(-1) === '/' ? url : url + '/';
		this._ignore = ignore ?? [];
		this._queryAll = queryAll ?? {};
		this._cacheName = `${this._name}Cache`;

		let storage = JSON.parse(localStorage.getItem(this._cacheName));

		if (!storage) {
			storage = {};
			localStorage.setItem(this._cacheName, JSON.stringify(storage));
		}

		this._cache = storage;
	}

	has(url) {
		return Object.hasOwnProperty.call(this._cache, url);
	}

	get(endpoint, params = {}) {
		const fullUrl = this.getFullUrl(endpoint, params);

		if (this.has(fullUrl))
			return Promise.resolve(this._cache[fullUrl]);

		else
			return axios.get(fullUrl)
				.then(response => {
					this.add(fullUrl, response);
					return response;
				})
				.catch(error => {
					console.log(error);
				});
	}

	add(data, endpoint, param = {}) {
		const fullUrl = this._url + endpoint;

		if (!this._ignore.includes(endpoint)) {
			this._cache[fullUrl] = data;
			localStorage.setItem(this._cacheName, JSON.stringify(this._cache));
		}
	}

	getFullUrl(endpoint, params = {}) {
		// since this._url starts with '/', make sure endpoint does NOT
		// why doesn't trimLeft let you specify any character? grr
		let epA = 0;
		while (endpoint[epA] === '/')
			epA += 1;
		const safeEndpoint = endpoint.slice(epA);

		// we need to sort the params, otherwise indexing them by url won't work if they're out of order
		// also it's up to the user to make sure only safe characters are in here
		const allParams = { ...this._queryAll, ...params };
		let query = '?';
		const keys = Object.keys(allParams).sort();
		for (const key of keys) {
			query += key;
			if (allParams[key] !== '')
				query += `=${allParams[key]}&`;
		}

		return this._url + safeEndpoint + query;
	}
}

const apis = {};

const create = options => {
	if (!options)
		throw new Error("missing api info");
	if (!options.name)
		throw new Error("must give the api a name!");
	if (!options.url)
		throw new Error("must provide the api's url");

	const api = new ApiCache(options);
	apis[options.name] = api;
};

const apiCache = {
	create: create,
	apis: apis
}

export default apiCache;