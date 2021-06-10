// API JSON Representation
// {
// 	"timestamp": 1111913466,
// 	"colors": [
// 			"debe8d",
// 			"e5bc85"
// 	],
// 	"id": "1902",
// 	"tags": [
// 			{
// 					"id": "5724",
// 					"name": "ripe"
// 			},
// 			{
// 					"id": "3359",
// 					"name": "wheat"
// 			}
// 	],
// }

import Color from "./Color";
import Tag from "./Tag";

// In WPF, the paradigm is MVVM: Model, View, ViewModel.
// I'm not sure how those concepts, or similarly named concepts like MVC or MVP, translate to React
// But the idea of using a 'model' to represent your data seems like it would be advantageous in this app,
// instead of just throwing JSON objects around as the API gives them
// And since I want to have access to different functionality with my "scheme", "color", and "tag" objects,
// using classes to represent these items instead of just the raw JSON is going to be a lot more useful,
// cleaner, and 'safer'


export default class Scheme {
	constructor(jsonData) {
		/** @type {number} identifies the scheme in the colr.org api */
		this.id = jsonData.id;

		/** @type {Color[]} a list of the scheme's colors */
		this.colors = jsonData.colors.map(color => new Color(color));

		/** @type {Tag[]} a list of tags describing the scheme*/
		this.tags = jsonData.tags.map(tag => new Tag(tag));

		/** @type {string} a 'name' for the scheme composed of it's tags */
		this.name = concatTagNames(this.tags);
	}

}

function concatTagNames(tags) {
	return tags.map(t => t.name).join(' ');
}