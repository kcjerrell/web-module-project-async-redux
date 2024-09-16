const ADD_COLOR = "ADD_COLOR";
const REMOVE_COLOR = "REMOVE_COLOR";

const addColor = color => {
	return { type: ADD_COLOR, payload: color };
};

const removeColor = color => {
	return { type: ADD_COLOR, payload: color };
};

const designerActions = {
	ADD_COLOR,
	REMOVE_COLOR,
	addColor,
	removeColor
};

export default designerActions;