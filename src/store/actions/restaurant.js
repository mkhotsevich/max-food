import axios from '../../axios/axios'
import { FETCH_RESTAURANTS_START, FETCH_RESTAURANTS_SUCCESS, FETCH_RESTAURANTS_ERROR } from './actionTypes'

export function fetchRestaurants() {
	return async dispatch => {
		dispatch(fetchRestaurantsStart())
		try {
			const response = await axios.get('/restaurants.json')
			const restaurants = []
			Object.keys(response.data).forEach((key) => {
				const restaurant = response.data[key]
				restaurants.push({
					id: key,
					name: restaurant.name,
					description: restaurant.description,
					restaurateurId: restaurant.restaurateurId
				})
			})
			dispatch(fetchRestaurantsSuccess(restaurants))
		} catch (error) {
			dispatch(fetchRestaurantsError(error))
		}
	}
}
export function fetchRestaurantsStart() {
	return {
		type: FETCH_RESTAURANTS_START
	}
}
export function fetchRestaurantsSuccess(restaurants) {
	return {
		type: FETCH_RESTAURANTS_SUCCESS,
		restaurants
	}
	
}
export function fetchRestaurantsError(error) {
	return {
		type: FETCH_RESTAURANTS_ERROR,
		error
	}
}