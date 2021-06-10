import act from '../actions/colrActions'

const initialState = {
	selectedScheme: null,
	schemeList: [],
	isFetching: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case act.FETCH_SCHEME_START:
			return {
				...state,
				isFetching: true
			};
		case act.FETCH_SCHEME_SUCCESS:
			return {
				...state,
				isFetching: false,
				selectedScheme: action.payload
			}
		case act.FETCH_SCHEME_FAIL:
			return {
				...state,
				isFetching: false
			}
		default:
			return state;
	}
};

export default reducer;