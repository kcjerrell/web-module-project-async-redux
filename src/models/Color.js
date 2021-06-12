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

// While this class has a (match word?) in the colr api, it is constructed from a color string, rather than
// the api's json object.

// (trying to decide if the data provided by the api for colors is even worth fetching)

import {darken,  hslToRgb, rgbToHsl, hslToHex } from 'colorsys';

export default class Color {

  constructor(hex) {
    this.hex = formatHex(hex);

    const match = this.hex.match(/#(?<r>[0-9A-F]{2})(?<g>[0-9A-F]{2})(?<b>[0-9A-F]{2})/);

    if (!match || !match.groups)
      debugger;

    const { r, g, b } = match.groups;

    this.r = parseInt(r, 16);
    this.g = parseInt(g, 16);
    this.b = parseInt(b, 16);
  }

  get luma() {
    if (!this._luma)
      this._luma = this.r * 0.2126 + this.g * 0.7152 + this.b * 0.0722;

    return this._luma;
  }

  get onColor() {
    return (
      this._onColor ?? (this._onColor = this.luma < 140 ? "#FFFFFF" : "#000000")
    );
  }

  get highShade() {
    if (!this._high)
      this.calcShades();

    return this._high;
  }

  get lowShade() {
    if (!this._low)
      this.calcShades();

    return this._low;
  }

  calcShades() {
    const hsl = rgbToHsl(this.r, this.g, this.b);
    const lHigh = Math.max((hsl.l + 50) / 1,100);
    const lLow = (hsl.l + 0) / 2;

    // this._high = hslToHex(hsl.h, hsl.s, lHigh);
    this._high = darken(this.hex, .20);
    this._low = darken(this.hex, -.20);
    // this._low = hslToHex(hsl.h, hsl.s, lLow);
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
  //
  // #123abc    - 24bit RGB  (2 hex digits per component) (normal)
  // #13f       - 12bit RGB  (1 hex digit per component)
  // #a9        -  8bit Mono (2 hex digits)
  // #0         -  4bit Mono (1 hex digit)

  // Not sure if I will encounter or handle RGBA colors...
  // #9a9a2280  - 32bit RGBA (2 hex digits per component, 2 for alpha/transparency)
  // #abba      - 16bit RGBA (1 hex digit per componenet, 1 for alpha/transparency)

  // BE ON THE LOOKOUT FOR THESE ABERRANT FORMS
  // #99FF9     - 20bit ?????
  // #7777777   - 28bit ???????

  // It happened. Just received '52080'. we're just gonna assume leading zeroes were trimmed

  const digits = hex.match(/^#?([0-9a-fA-F]+)$/)?.[1];

  if (!digits) { debugger; throw new Error("Invalid color hex string!"); }

  switch (digits.length) {
    case 6:
      return `#${digits}`.toUpperCase();

    case 5:
      return ['#', '0', digits].join('').toUpperCase();

    case 3:
      const [r, g, b] = digits;
      return ["#", r, r, g, g, b, b].join('').toUpperCase();

    case 2:
      return ['#', digits, digits, digits].join('').toUpperCase();

    case 1:
      return ['#', digits, digits, digits, digits, digits, digits].join('').toUpperCase();

    default:
      debugger;
      throw new Error("Invalid color hex string!");
  }
}
