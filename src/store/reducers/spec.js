import {FETCH_SPECS_ERROR, FETCH_SPECS_START, FETCH_SPECS_SUCCESS} from '../actions/actionTypes'

const initialState = {
	specs: [],
	loading: true,
	error: null
}
export default function specReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_SPECS_START:
			return {
				...state,
				loading: true
			}
		case FETCH_SPECS_SUCCESS:
			return {
				...state,
				loading: false,
				specs: action.specs
			}
		case FETCH_SPECS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			}
		default:
			return state
	}
}