import {
	FETCH_USER_START,
	FETCH_USER_SUCCESS,
	FETCH_USER_ERROR,
	FETCH_USERS_START,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_ERROR
} from '../actions/actionTypes'

const initialState = {
	users: [],
	user: null,
	error: null,
	loading: false
}
export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS_START:
			return {
				...state,
				loading: true
			}
		case FETCH_USERS_SUCCESS:
			return {
				...state,
				users: action.users,
				loading: false
			}
		case FETCH_USERS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			}
		case FETCH_USER_SUCCESS:
			return {
				...state,
				loading: true
			}
		case FETCH_USER_START:
			return {
				...state,
				loading: false,
				user: action.user
			}
		case FETCH_USER_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			}
		default:
			return state
	}
}