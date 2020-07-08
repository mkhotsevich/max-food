import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR } from "../actions/actionTypes"

const initialState = {
	token: null,
	userId: null,
	error: null
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case AUTH_SUCCESS:
			return {
				...state,
				token: action.token,
				userId: action.userId
			}
		case AUTH_LOGOUT:
			return {
				...state,
				token: null,
				userId: null
			}
		case AUTH_ERROR:
			return {
				...state,
				error: action.error
			}
		default:
			return state
	}
}