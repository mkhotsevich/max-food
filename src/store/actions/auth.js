import axios from 'axios'
import axiosBase from '../../axios/axios'
import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR } from './actionTypes'

export default function auth(email, password, isLogin, userType) {
	return async dispatch => {
		try {
			const authData = {
				email,
				password,
				returnSecureToken: true
			}

			const url = isLogin ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhXnChN06UbNjWgiv1pymVb-uJvjadlvg' : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhXnChN06UbNjWgiv1pymVb-uJvjadlvg'

			const { data } = await axios.post(url, authData)
			const { localId, expiresIn, idToken } = data
			if (!isLogin) {
				const user = {
					userId: localId,
					email,
					userType
				}
				await axiosBase.post('/users.json', user)
			}

			const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)

			localStorage.setItem('token', idToken)
			localStorage.setItem('userId', localId)
			localStorage.setItem('expirationDate', expirationDate)

			dispatch(authSuccess(idToken, localId))
			dispatch(autoLogout(expiresIn))
		} catch (e) {
			dispatch(authError(e))
		}
	}
}

export function authSuccess(token, userId) {
	return {
		type: AUTH_SUCCESS,
		token,
		userId
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		error
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