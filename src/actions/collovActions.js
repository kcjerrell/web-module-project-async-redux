// import apiAccess from '../apiAccess';

import axios from "axios";

const FETCH_RANDOM = "FETCH_RANDOM";
const FETCH_RANDOM_SUCCESS = "FETCH_RANDOM_SUCCESS";
const FETCH_RANDOM_FAIL = "FETCH_RANDOM_FAIL";

const getRandomPalette = () => {
	return dispatch => {
		dispatch(fetchRandom());
		// const api = apiAccess.apis.collov;
		// const res = await api.get('palettes/random');
		axios.get('http://www.colourlovers.com/api/palettes/random?format=json')
			.then(res => console.log(res))
			.catch(err => console.log(err));
	}
}

const fetchRandom = () => {
	return { type: FETCH_RANDOM };
};

const fetchRandomSuccess = () => {
	return { type: FETCH_RANDOM_SUCCESS };
};

const fetchRandomFail = () => {
	return { type: FETCH_RANDOM_FAIL };
};

const collovActions = {
	FETCH_RANDOM, fetchRandom,
	FETCH_RANDOM_SUCCESS, fetchRandomSuccess,
	FETCH_RANDOM_FAIL, fetchRandomFail,
	getRandomPalette,
}

export default collovActions;