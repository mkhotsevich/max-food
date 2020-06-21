import { ADD_DISH_TO_CART, DELETE_DISH_FROM_CART } from './actionTypes'
import axios from '../../axios/axios'

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
export function createOrder(order) {
	return async dispatch => {
		try {
			await axios.post('/orders.json', order)
		} catch (e) {

		}
	}
}