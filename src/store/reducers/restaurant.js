import { FETCH_RESTAURANTS_START, FETCH_RESTAURANTS_SUCCESS, FETCH_RESTAURANTS_ERROR } from "../actions/actionTypes"

const initialState = {
	restaurants: [],
	loading: false,
	error: null
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
		default:
			return state
	}
	
}