import {
	ADD_DISH_TO_CART, DELETE_DISH_FROM_CART, CLEAR_CART
} from "../actions/actionTypes"

const initialState = {
	dishes: []
}

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_DISH_TO_CART:
			return {
				...state,
				dishes: [...state.dishes, action.dish]
			}
		case DELETE_DISH_FROM_CART:
			state.dishes.splice(action.index, 1)
			return {
				...state
			}
		case CLEAR_CART:
			return {
				dishes: []
			}
		default:
			return state
	}
}