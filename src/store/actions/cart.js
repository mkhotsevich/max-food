import { ADD_DISH_TO_CART, DELETE_DISH_FROM_CART } from './actionTypes'

export function addToCart(dish) {
	return {
		type: ADD_DISH_TO_CART,
		dish
	}
}
export function deleteDishFromCart(index) {
	return {
		type: DELETE_DISH_FROM_CART,
		index
	}
}