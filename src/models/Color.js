// API JSON Repressentation
// {
// 	"timestamp": 1187573498,
// 	"hex": "444746",
// 	"id": 28804,
// 	"tags": [
// 			{
// 					"timestamp": 1108110866,
// 					"id": 3916,
// 					"name": "arabian"
// 			},
// 			{
// 					"timestamp": 1108110855,
// 					"id": 2934,
// 					"name": "night"
// 			}
// 	],
// 	"onColor": "#ffffff"
// }

export default class Color {
	constructor(jsonData) {
		this.hex = formatHex(jsonData);

		const { r, g, b } = this.hex.match(/#(?<r>[0-9A-F]{2})(?<g>[0-9A-F]{2})(?<b>[0-9A-F]{2})/).groups;

		this.r = parseInt(r, 16);
		this.g = parseInt(g, 16);
		this.b = parseInt(b, 16);
	}

	get luma() {
		return this._luma	?? (this._luma = (this.r * 0.2126 + this.g * 0.7152 + this.b * 0.0722));
	}

	get lumaB() {
		if (!this._luma)
			this._luma = this.r * 0.2126 + this.g * 0.7152 + this.b * 0.0722;

		return this._luma;
	}

	get onColor() {
		return this._onColor
			?? (this._onColor = this.luma < 140 ? '#FFFFFF' : '#000000');
	}
}

/**
 * Returns a color hex code in the format of #FFFFFF
 * # symbol, followed by 6 hexadecimcal digits
 * @param {string} hex - the original hex string representation of a color, with or without #, 3 or 6 digits
 * @param {boolean} alpha - not implemented
 * @returns {string} a formatted hex color string
 */
function formatHex(hex, alpha = false) {
	//const col = color[0] === '#' ? color.slice(1) : color;

	// I'm not gonna stress getting the regex perfect right now.
	// I just need to cover these cases: (the api returns these sometimes)
	// #123abc
	// #13f
	// 123abc
	// 1bc
	const digits = hex.match(/^#?([0-9a-fA-F]{3,6})$/)?.[1]
	if (digits.length === 3) {
		const [r, g, b] = digits;
		return ['#', r, r, g, g, b, b].join().toUpperCase();
	}

	else if (digits.length === 6) {
		return `#${digits}`.toUpperCase();
	}

	else {
		throw new Error('where did this color come from? this is not a color! probably. also need better error messages');
	}
}