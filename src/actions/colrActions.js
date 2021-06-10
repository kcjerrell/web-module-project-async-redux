import { getRandomSchemes } from "../api/colr";

export const FETCH_PALETTE_START = "FETCH_PALETTE_START";
export const FETCH_PALETTE_SUCCESS = "FETCH_PALETTE_SUCCESS";
export const FETCH_PALETTE_FAIL = "FETCH_PALETTE_FAIL";

export const fetchPaletteStart = () => {
	return { type: FETCH_PALETTE_START };
}

export const fetchPaletteSuccess = (data) => {
	return { type: FETCH_PALETTE_SUCCESS, payload: data };
}

export const fetchPaletteFail = (data) => {
	return { type: FETCH_PALETTE_FAIL, payload: data };
}

export const fetchPalette = () => {
	return async dispatch => {
		dispatch(fetchPaletteStart());

		try {
			const res = await getRandomSchemes(1);
			const scheme = res.data.schemes[0];
			dispatch(fetchPaletteSuccess(scheme));
		}

		catch (error) {
			console.log(error);
			dispatch(fetchPaletteFail(error));
		}
	};
};


const colr = {
	FETCH_PALETTE_START, fetchPaletteStart,
	FETCH_PALETTE_SUCCESS, fetchPaletteSuccess,
	FETCH_PALETTE_FAIL, fetchPaletteFail,
	fetchPalette,
};

export default colr;