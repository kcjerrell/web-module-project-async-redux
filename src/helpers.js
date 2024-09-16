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

const getUnAbbrev = color => {
	const col = color[0] === '#' ? color.slice(1) : color;

	if (col.length === 3) {
		const [r, g, b] = col;
		return ['#', r, r, g, g, b, b].join()
	}

	else if (col.length === 6) {
		return `#${col}`;
	}

	else {
		throw new Error('where did this color come from?');
	}
}

export const getOnColor = color => {
	try {
		const on = hex_inverse_bw(getUnAbbrev(color));
	} catch (error) {

		debugger;
	}
	return
}
