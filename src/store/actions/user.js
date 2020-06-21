import axios from '../../axios/axios'
import {
	FETCH_USER_START,
	FETCH_USER_SUCCESS,
	FETCH_USER_ERROR,
	FETCH_USERS_START,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_ERROR,
	IS_OWNER
} from './actionTypes'
import { fetchRestaurants } from './restaurant'

//USER
export function fetchUserById(id) {
	return async dispatch => {
		dispatch(fetchUserStart())
		try {
			const response = await axios.get(`/users/${id}.json`)
			const user = response.data
			dispatch(fetchUserSuccess(user))
		} catch (error) {
			dispatch(fetchUserError(error))
		}
	}
}
export function fetchUserStart() {
	return {
		type: FETCH_USER_START
	}
}
export function fetchUserSuccess(user) {
	return {
		type: FETCH_USER_SUCCESS,
		user
	}
}
export function fetchUserError(error) {
	return {
		type: FETCH_USER_ERROR,
		error
	}
}

//USERS
export function fetchUsers() {
	return async dispatch => {
		dispatch(fetchUsersStart())
		try {
			const response = await axios.get(`/users.json`)
			const users = []
			Object.keys(response.data).forEach((key) => {
				const user = response.data[key]
				users.push({
					id: key,
					userId: user.userId,
					email: user.email,
					surname: user.surname,
					name: user.name,
					patronymic: user.patronymic,
					date: user.date
				})
			})
			dispatch(fetchUsersSuccess(users))
		} catch (error) {
			dispatch(fetchUsersError(error))
		}
	}
}
export function fetchUsersStart() {
	return {
		type: FETCH_USERS_START,
		loading: true
	}
}
export function fetchUsersSuccess(users) {
	return {
		type: FETCH_USERS_SUCCESS,
		loading: false,
		users
	}
}
export function fetchUsersError(error) {
	return {
		type: FETCH_USERS_ERROR,
		error
	}
}

export function checkOwner() {
	return async (dispatch, getState) => {
		await dispatch(fetchRestaurants())
		await dispatch(fetchUsers())
		const rests = getState().restaurants.restaurants
		const users = getState().user.users
		const userId = localStorage.getItem('userId')
		Object.values(rests).forEach(rest => {
			Object.values(users).forEach(user => {
				if (rest.owner === user.email && user.userId === userId) {
					dispatch(searchOwnerSucces(true, rest))
				}
			})
		})
	}
}
export function searchOwnerSucces(isOwner, rest) {
	return {
		type: IS_OWNER,
		owner: isOwner,
		rest
	}
}