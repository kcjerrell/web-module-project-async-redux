import act from '../actions/designerActions'

const initialState = {
	colors: ['#000000', '#FFFFFF'],									// A list of colors that comprise the theme
	name: "Black and White",												// the user provided name for the theme
	description: "2 shades of definitely not gray"	// the user provided description of the theme
}

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case act.ADD_COLOR:
			console.log('pretend we add a color!');
			return state;

		case act.REMOVE_COLOR:
			console.log('retend we removed a color!');
			return state;

		default:
			return state;
	}
}

export default reducer;