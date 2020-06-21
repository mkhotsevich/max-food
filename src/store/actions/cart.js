import { ADD_DISH_TO_CART} from './actionTypes'

export function addToCart(dish) {
	return {
		type: ADD_DISH_TO_CART,
		dish
	}
}