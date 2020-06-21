import {
	FETCH_RESTAURANTS_START,
	FETCH_RESTAURANTS_SUCCESS,
	FETCH_RESTAURANTS_ERROR,
	FETCH_REST_SUCCESS
} from "../actions/actionTypes"

const initialState = {
	restaurants: [],
	restaurant: {},
	loading: false,
	error: null,
}

export default function restaurantReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_RESTAURANTS_START:
			return {
				...state,
				loading: true
			}
		case FETCH_RESTAURANTS_SUCCESS:
			return {
				...state,
				loading: false,
				restaurants: action.restaurants
			}
		case FETCH_RESTAURANTS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			}
		case FETCH_REST_SUCCESS:
			return {
				...state,
				loading: false,
				restaurant: action.rest
			}
		default:
			return state
	}
	
}