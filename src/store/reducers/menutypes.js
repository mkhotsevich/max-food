import {
	FETCH_MENUTYPES_START,
	FETCH_MENUTYPES_SUCCESS,
	FETCH_MENUTYPES_ERROR,
	CREATE_MENUTYPE_START,
	CREATE_MENUTYPE_SUCCESS,
	CREATE_MENUTYPE_ERROR,
	DELETE_MENUTYPE_START,
	DELETE_MENUTYPE_SUCCESS,
	DELETE_MENUTYPE_ERROR
} from '../actions/actionTypes'

const initialState = {
	menutypes: [],
	menutype: {},
	loading: true,
	error: null
}
export default function menutypesReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_MENUTYPES_START:
			return {
				...state,
				loading: true
			}
		case FETCH_MENUTYPES_SUCCESS:
			return {
				...state,
				loading: false,
				menutypes: action.menutypes
			}
		case FETCH_MENUTYPES_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			}
		case CREATE_MENUTYPE_START:
			return {
				...state,
				loading: true
			}
		case CREATE_MENUTYPE_SUCCESS:
			return {
				...state,
				loading: false,
				menutype: action.menutype
			}
		case CREATE_MENUTYPE_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			}
		case DELETE_MENUTYPE_START:
			return {
				...state,
				loading: true
			}
		case DELETE_MENUTYPE_SUCCESS:
			return {
				...state,
				loading: false,
				menutype: action.menutype
			}
		case DELETE_MENUTYPE_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			}
		default:
			return state
	}
}