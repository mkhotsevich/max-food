import {
	ADD_DISH_TO_CART
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
		default:
			return state
	}

}