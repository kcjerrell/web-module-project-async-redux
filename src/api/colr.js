import axios from "axios"

// const sample = {
// 	"timestamp": 1111913468,
// 	"colors": ["805953", "8c5e55"],
// 	"id": "2107",
// 	"tags": [{
// 		"id": "2843",
// 		"name": "natures"
// 	}, {
// 		"id": "3215", "name": "essence"
// 	}]
// }

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
	return axios.get(`https://www.colr.org/json/schemes/random/${count}?scheme_size=>${minSize}`).then(res => res.data.schemes);
}
