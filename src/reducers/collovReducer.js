// that's right I'm officially referring to this api as collov
import act from '../actions/collovActions';

const initialState = {
	fetchingData: false,
	selectedItem: null, /* a color or color palette object provided by the api
	perhaps only having an 'id' property initially, the rest to be loaded upon selection */
	itemList: [ /* a list of items (possibly only referenced by an ID) that can be selected */],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case act.FETCH_RANDOM:
			return { ...state, fetchingData: true };

			case act.FETCH_RANDOM_SUCCESS:
			return { ...state, fetchingData: false, selectedItem: action.payload };

		case act.FETCH_RANDOM_FAIL:
			return { ...state, fetchingData: false };

		default:
			return state;
	}
}

export default reducer;