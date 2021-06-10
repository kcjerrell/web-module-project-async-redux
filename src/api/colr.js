import axios from "axios"

export const getRandomSchemes = (count = 1) => {
	return axios.get(`https://www.colr.org/json/schemes/random/${count}`);
}
