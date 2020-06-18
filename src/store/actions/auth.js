import axios from 'axios'
import axiosBase from '../../axios/axios'
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes'

export default function auth(email, password, isLogin) {
	return async dispatch => {
		const authData = {
			email,
			password,
			returnSecureToken: true
		}
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhXnChN06UbNjWgiv1pymVb-uJvjadlvg'
		if (isLogin) {
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhXnChN06UbNjWgiv1pymVb-uJvjadlvg'
		}
		const response = await axios.post(url, authData)
		const data = response.data
		if (!isLogin) {
			const user = {
				userId: data.localId,
				email: email
			}
			await axiosBase.post('/users.json', user)
		}

		const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

		localStorage.setItem('token', data.idToken)
		localStorage.setItem('userId', data.localId)
		localStorage.setItem('expirationDate', expirationDate)

		dispatch(authSuccess(data.idToken, data.localId))
		dispatch(autoLogout(data.expiresIn))
	}
}
export function authSuccess(token, userId) {
	return {
		type: AUTH_SUCCESS,
		token,
		userId
	}
}
export function autoLogin() {
	return dispatch => {
		const token = localStorage.getItem('token')
		const userId = localStorage.getItem('userId')
		if (!token) {
			dispatch(logout())
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'))
			if (expirationDate <= new Date()) {
				dispatch(logout())
			} else {
				dispatch(authSuccess(token, userId))
				dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
			}
		}
	}
}
export function autoLogout(time) {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, time * 1000)
	}
}
export function logout() {
	localStorage.removeItem('token')
	localStorage.removeItem('userId')
	localStorage.removeItem('expirationDate')
	return {
		type: AUTH_LOGOUT
	}
}